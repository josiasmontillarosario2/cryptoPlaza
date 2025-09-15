'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/stores/CartStore';
import { useTranslations } from 'next-intl';

export default function CartPage() {
  const t = useTranslations('CartPage');
  const tc = useTranslations('Shop.categories');
  const { items, updateQuantity, getTotalItems, getTotalPrice } = useCart();

  const subtotal = getTotalPrice();
  const shipping = subtotal > 100 ? 0 : 15; // Free shipping over $100
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;
  const itemCount = getTotalItems();

  if (items.length === 0) {
    return (
      <div className="py-16">
        <Container>
          <div className="text-center max-w-md mx-auto">
            <ShoppingBag className="h-24 w-24 text-gray-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-white mb-4">{t('empty.title')}</h1>
            <p className="text-gray-400 mb-8">{t('empty.description')}</p>
            <Link href="/shop">
              <Button className="bg-cyan-600 hover:bg-cyan-500 text-black font-semibold">
                {t('empty.continueShopping')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-8">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{t('title')}</h1>
          <p className="text-gray-400">{t('itemCount', { count: itemCount })}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.product.id} className="border-gray-800 bg-gray-900/50">
                <CardContent className="p-6">
                  <div className="flex space-x-4">
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded border border-gray-700">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-semibold text-white">{item.product.name}</h3>
                          <Badge variant="secondary" className="mt-1 bg-gray-800 text-cyan-400 border-cyan-500/50">
                            {tc(item.product.category)}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-cyan-400">${item.product.price}</p>
                          <p className="text-sm text-gray-400">{t('each')}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-gray-700"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-gray-700"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <span className="font-semibold text-white">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-400/10"
                            onClick={() => updateQuantity(item.product.id, 0)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="border-gray-800 bg-gray-900/50">
              <CardHeader>
                <CardTitle className="text-white">{t('orderSummary.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">{t('orderSummary.subtotal', { count: itemCount })}</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">{t('orderSummary.shipping')}</span>
                  <span className="text-white">
                    {shipping === 0 ? t('orderSummary.shippingFree') : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">{t('orderSummary.tax')}</span>
                  <span className="text-white">${tax.toFixed(2)}</span>
                </div>
                
                <Separator className="bg-gray-800" />
                
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-white">{t('orderSummary.total')}</span>
                  <span className="text-cyan-400">${total.toFixed(2)}</span>
                </div>
                
                <p className="text-xs text-gray-500">
                  {t('orderSummary.cryptoEstimate', { amount: (total / 115102).toFixed(6) })}
                </p>
              </CardContent>
            </Card>

            {shipping > 0 && (
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
                <p className="text-cyan-400 text-sm">
                  {t('freeShippingPrompt', { amount: (100 - subtotal).toFixed(2) })}
                </p>
              </div>
            )}

            <Link href="/protected/checkout" className="block">
              <Button className="w-full bg-cyan-600 hover:bg-cyan-500 text-black font-semibold py-6">
                {t('proceedToCheckout')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            
            <Link href="/shop" className="block">
              <Button variant="outline" className="w-full border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10">
                {t('continueShopping')}
              </Button>
            </Link>

            {/* Crypto Info */}
            <Card className="border-gray-800 bg-gray-900/50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-white mb-2">{t('cryptoPayment.title')}</h4>
                <p className="text-sm text-gray-400 mb-3">{t('cryptoPayment.description')}</p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-orange-400 font-bold text-xs">{t('cryptoPayment.currencies.BTC')}</div>
                  </div>
                  <div>
                    <div className="text-blue-400 font-bold text-xs">{t('cryptoPayment.currencies.ETH')}</div>
                  </div>
                  <div>
                    <div className="text-green-400 font-bold text-xs">{t('cryptoPayment.currencies.USDC')}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}