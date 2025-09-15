'use client';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');
  return <div>Pago exitoso para order {orderId}. ¡Gracias!</div>;
}