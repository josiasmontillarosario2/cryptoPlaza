'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/stores/CartStore';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export function CartSheet() {
  const t = useTranslations('CartSheet');
  const { items, removeFromCart, updateQuantity, getTotalItems, getTotalPrice,closeCart } = useCart();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-6">
        <ShoppingBag className="h-16 w-16 text-gray-600 mb-4" />
        <SheetHeader className="mb-6">
          <SheetTitle className="text-white">{t('empty.title')}</SheetTitle>
          <SheetDescription className="text-gray-400">{t('empty.description')}</SheetDescription>
        </SheetHeader>
        <Link href="/shop">
          <Button className="bg-cyan-600 hover:bg-cyan-500 text-black">{t('empty.browseProducts')}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <SheetHeader className="pb-6">
        <SheetTitle className="text-white flex items-center justify-between">
          {t('title')}
          <Badge className="bg-cyan-500 text-black">{t('itemCount', { count: getTotalItems() })}</Badge>
        </SheetTitle>
        <SheetDescription className="text-gray-400">{t('description')}</SheetDescription>
      </SheetHeader>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto pr-2">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="flex space-x-3">
              <div className="relative h-16 w-16 overflow-hidden rounded border border-gray-800">
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              
              <div className="flex-1 space-y-2">
                <h4 className="font-medium text-white text-sm">{item.product.name}</h4>
                <p className="text-cyan-400 font-semibold">${item.product.price.toFixed(2)}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 border-gray-700"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3 text-black" />
                    </Button>
                    <span className="text-white w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 border-gray-700"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3 text-black" />
                    </Button>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-400/10"
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 pt-4 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-white">Total:</span>
          <span className="text-2xl font-bold text-cyan-400">${getTotalPrice().toFixed(2)}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
         
            <Button onClick={()=> {
              router.push('/cart')
              closeCart()
            }} variant="outline" className="w-full border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10">
              {t('viewCart')}
            </Button>
          
        
            <Button onClick={()=> {
              router.push('/protected/checkout')
              closeCart()
            }} className="w-full bg-cyan-600 hover:bg-cyan-500 text-black font-semibold">
              {t('checkout')}
            </Button>
         
        </div>
        
        <p className="text-xs text-gray-500 text-center">{t('cryptoPayment')}</p>
      </div>
    </div>
  );
}