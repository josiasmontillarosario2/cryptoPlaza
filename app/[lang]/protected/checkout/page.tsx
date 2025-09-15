'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, CreditCard, Shield, Truck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useCart } from '@/stores/CartStore';
import { useTranslations } from 'next-intl';

export default function CheckoutPage() {
  const t = useTranslations('CheckoutPage');
  const { items, clearCart } = useCart();
  const router = useRouter();
  
  // Validate items: Filter valid items
  const validItems = items.filter(item => 
    item.product && 
    typeof item.product.price === 'number' && 
    item.product.price > 0
  );
  
  const totalPrice = validItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  
  const [currency] = useState('USD'); // Fixed to USD (MATIC payment)
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    newsletter: false
  });

  // Redirect to cart if no valid items
  useEffect(() => {
    if (validItems.length === 0 && items.length > 0) {
      toast.error(t('invalidItemsError'));
      router.push('/cart');
    } else if (validItems.length === 0) {
      router.push('/cart');
    }
  }, [validItems.length, items.length, router, t]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Prepare shipping_address as JSON
      const shipping_address = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        street: formData.address,
        city: formData.city,
        country: formData.country,
        zip_code: formData.zipCode,
        email: formData.email,
      };

      const res = await fetch('/api/create-charge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shipping_address, currency }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || t('error.default'));
      }

      if (data.hosted_url) {
        clearCart();
        toast.success(t('success.redirect'));
        window.location.href = data.hosted_url;
      } else {
        throw new Error(t('error.noPaymentUrl'));
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || t('error.default'));
      setIsProcessing(false);
    }
  };

  if (validItems.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">{t('empty.title')}</h1>
          <Link href="/shop">
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-semibold">
              {t('empty.continueShopping')}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const displayTotal = `$${totalPrice.toFixed(2)}`; // Only USD (MATIC payment)

  const isFormValid = formData.email && formData.firstName && formData.lastName && formData.address && formData.city && formData.country && formData.zipCode;

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/cart" 
            className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('backToCart')}
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white">{t('title')}</h1>
          <p className="text-gray-400 mt-2">{t('description')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-cyan-400 flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  {t('billing.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-white">{t('billing.email')}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder={t('billing.emailPlaceholder')}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-white">{t('billing.firstName')}</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-white">{t('billing.lastName')}</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-white">{t('billing.address')}</Label>
                    <Input
                      id="address"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder={t('billing.addressPlaceholder')}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city" className="text-white">{t('billing.city')}</Label>
                      <Input
                        id="city"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode" className="text-white">{t('billing.zipCode')}</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        required
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="country" className="text-white">{t('billing.country')}</Label>
                    <Select value={formData.country} onValueChange={(value) => setFormData(prev => ({...prev, country: value}))}>
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                        <SelectValue placeholder={t('billing.countryPlaceholder')} />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600 text-white">
                        <SelectItem value="us">{t('billing.countries.us')}</SelectItem>
                        <SelectItem value="ca">{t('billing.countries.ca')}</SelectItem>
                        <SelectItem value="uk">{t('billing.countries.uk')}</SelectItem>
                        <SelectItem value="de">{t('billing.countries.de')}</SelectItem>
                        <SelectItem value="fr">{t('billing.countries.fr')}</SelectItem>
                        <SelectItem value="jp">{t('billing.countries.jp')}</SelectItem>
                        <SelectItem value="au">{t('billing.countries.au')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="newsletter"
                      className='text-white border-white'
                      checked={formData.newsletter}
                      onCheckedChange={(checked) => setFormData(prev => ({...prev, newsletter: checked === true}))}
                    />
                    <Label htmlFor="newsletter" className="text-gray-300 text-sm">
                      {t('billing.newsletter')}
                    </Label>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-cyan-400 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  {t('payment.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                  <h3 className="font-medium text-white mb-2">{t('payment.title')}</h3>
                  <p className="text-gray-400 text-sm mb-4">{t('payment.description')}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Shield className="h-4 w-4" />
                    <span>{t('payment.secureLabel')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="bg-gray-900 border-gray-700 sticky top-8">
              <CardHeader>
                <CardTitle className="text-cyan-400">{t('orderSummary.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3">
                  {validItems.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-white truncate">{item.product.name}</h4>
                        <p className="text-xs text-gray-400">{t('orderSummary.quantity', { quantity: item.quantity })}</p>
                      </div>
                      <span className="text-sm text-cyan-400 font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-700 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">{t('orderSummary.subtotal')}</span>
                    <span className="text-white">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">{t('orderSummary.shipping')}</span>
                    <span className="text-green-400">{t('orderSummary.shippingFree')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">{t('orderSummary.tax')}</span>
                    <span className="text-white">$0.00</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold border-t border-gray-700 pt-2">
                    <span className="text-white">{t('orderSummary.total')}</span>
                    <span className="text-cyan-400">{displayTotal}</span>
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={isProcessing || !isFormValid || validItems.length === 0}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-semibold"
                  size="lg"
                >
                  {isProcessing ? t('processing') : t('payButton', { amount: displayTotal })}
                </Button>

                <div className="flex items-center justify-center gap-4 text-xs text-gray-400 pt-2">
                  <div className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    {t('secure')}
                  </div>
                  <div className="flex items-center gap-1">
                    <Truck className="h-3 w-3" />
                    {t('freeShipping')}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}