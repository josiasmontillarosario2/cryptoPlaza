import { NextRequest, NextResponse } from 'next/server';
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  // Obtener cart items de Supabase
  const { data: cartItems, error: cartError } = await supabase
    .from('cart_items')
    .select('id, product_id, quantity, products(name, price, images)')
    .eq('user_id', user.id);

  if (cartError || !cartItems || cartItems.length === 0) {
    return NextResponse.json({ error: 'Carrito vacío' }, { status: 400 });
  }

  console.log('CartItems raw:', JSON.stringify(cartItems, null, 2));

  // Filtrar ítems válidos
  const validCartItems = cartItems.filter((item: any) => 
    item.products && 
    typeof item.products === 'object' && 
    item.products !== null &&
    typeof item.products.price === 'number' && 
    item.products.price > 0
  );

  if (validCartItems.length === 0) {
    await supabase.from('cart_items').delete().eq('user_id', user.id);
    return NextResponse.json({ error: 'Carrito vacío o todos los ítems son inválidos.' }, { status: 400 });
  }

  // Limpia ítems inválidos si hay
  if (validCartItems.length < cartItems.length) {
    const invalidItemIds = cartItems
      .filter(item => !validCartItems.some(valid => valid.id === item.id))
      .map(item => item.id);
    if (invalidItemIds.length > 0) {
      await supabase.from('cart_items').delete().in('id', invalidItemIds);
    }
  }

  // Calcular total
  const total = validCartItems.reduce((sum, item: any) => sum + (item.products.price * item.quantity), 0);

  if (total === 0) {
    return NextResponse.json({ error: 'Total cero' }, { status: 400 });
  }

  // Validación de mínimo $2
  if (total < 2) {
    return NextResponse.json({ error: 'El mínimo de compra es $2 USD. Agrega más productos para proceder.' }, { status: 400 });
  }

  // Obtener body (ignoramos currency, fijamos a USD/MATIC)
  const { shipping_address } = await request.json();
  if (!shipping_address) {
    return NextResponse.json({ error: 'Dirección de envío requerida' }, { status: 400 });
  }

  // Crear order en Supabase
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: user.id,
      total,
      status: 'pending',
      shipping_address,
    })
    .select()
    .single();

  if (orderError || !order) {
    return NextResponse.json({ error: 'Error creando order' }, { status: 500 });
  }

  // Insertar order_items
  const orderItems = validCartItems.map((item: any) => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    price: item.products.price,
  }));
  const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
  if (itemsError) {
    await supabase.from('orders').delete().eq('id', order.id);
    return NextResponse.json({ error: 'Error en ítems' }, { status: 500 });
  }

  // Limpiar carrito
  await supabase.from('cart_items').delete().eq('user_id', user.id);

  // Crear invoice en NOWPayments (hosted page) – Fijado a USD y MATIC
  const origin = request.headers.get('origin');
  const priceCurrency = 'usd';
  const payCurrency = 'matic';  // Solo MATIC on Polygon

  try {
    // Paso 1: Crear invoice
    const invoiceRes = await fetch('https://api.nowpayments.io/v1/invoice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.NOWPAYMENTS_API_KEY!,
      },
      body: JSON.stringify({
        price_amount: total.toFixed(2),
        price_currency: priceCurrency,
        order_id: order.id,
        order_description: `Order #${order.id.slice(0, 8)} - Tu Tienda Crypto`,
        ipn_callback_url: `${origin}/api/webhook`,
        success_url: `${origin}/success?order_id=${order.id}`,
        cancel_url: `${origin}/cart`,
      }),
    });

    if (!invoiceRes.ok) {
      throw new Error(`Error en invoice: ${invoiceRes.status} - ${await invoiceRes.text()}`);
    }

    const invoiceData = await invoiceRes.json();
    const invoiceId = invoiceData.id;
    const hostedUrl = invoiceData.invoice_url;  // URL hosted para redirect

    // Paso 2: Crear payment preseleccionado para Polygon (preselect currency en hosted)
    const paymentRes = await fetch('https://api.nowpayments.io/v1/invoice-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.NOWPAYMENTS_API_KEY!,
      },
      body: JSON.stringify({
        iid: invoiceId,
        pay_currency: payCurrency,
      }),
    });

    if (!paymentRes.ok) {
      throw new Error(`Error en payment: ${paymentRes.status} - ${await paymentRes.text()}`);
    }

    const paymentData = await paymentRes.json();
    const paymentId = paymentData.payment_id;

    // Guardar IDs en order (agrega columna nowpayments_payment_id en Supabase si no existe)
    await supabase.from('orders').update({ nowpayments_payment_id: paymentId }).eq('id', order.id);

    return NextResponse.json({ hosted_url: hostedUrl });
  } catch (error) {
    console.error('Error creando pago en NOWPayments:', error);
    // Rollback order si falla
    await supabase.from('orders').delete().eq('id', order.id);
    return NextResponse.json({ error: 'Error en pago' }, { status: 500 });
  }
}