import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get('x-nowpayments-sig');

  // Verificar firma: HMAC SHA512 del rawBody completo con IPN secret
  const expectedSignature = crypto
    .createHmac('sha512', process.env.NOWPAYMENTS_IPN_SECRET!)
    .update(rawBody)
    .digest('hex');

  if (signature !== expectedSignature) {
    console.error('Firma inválida en webhook');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const event = JSON.parse(rawBody);

  // Manejar status 'finished' (pago confirmado)
  if (event.payment_status === 'finished') {
    const orderId = event.order_id;  // Del metadata/order_id

    const supabase = await createClient();
    const { error } = await supabase.from('orders').update({ status: 'paid' }).eq('id', orderId);

    if (error) {
      console.error('Error actualizando order:', error);
    } else {
      console.log('Pago confirmado ✅', event);
    }
  }

  return NextResponse.json({ received: true });
}