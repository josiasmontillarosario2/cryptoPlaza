import { Hero } from '@/components/hero';
import { getFeaturedProducts } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CreditCard, Shield, Truck, Zap } from 'lucide-react';
import { getTranslations } from 'next-intl/server'; // Import for server-side translations



export default async function Home() {

  const featuredProducts = await getFeaturedProducts();
  const t = await getTranslations('Home'); // Load Home translations

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <Hero  />

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('features.title')}
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {t('features.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: CreditCard,
                title: t('features.cryptoPayments.title'),
                description: t('features.cryptoPayments.description'),
              },
              {
                icon: Shield,
                title: t('features.secureTransactions.title'),
                description: t('features.secureTransactions.description'),
              },
              {
                icon: Truck,
                title: t('features.fastShipping.title'),
                description: t('features.fastShipping.description'),
              },
              {
                icon: Zap,
                title: t('features.instantProcessing.title'),
                description: t('features.instantProcessing.description'),
              },
            ].map((feature, index) => (
              <div 
                key={index} 
                className="text-center p-6 rounded-2xl bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="relative inline-flex items-center justify-center w-16 h-16 mb-4">
                  <feature.icon className="h-8 w-8 text-cyan-400" />
                  <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-lg"></div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('featuredProducts.title')}
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {t('featuredProducts.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/shop">
              <Button 
                size="lg"
                variant="outline"
                className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 px-8 py-3"
              >
                {t('featuredProducts.viewAllProducts')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-cyan-950 via-blue-950 to-purple-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-semibold px-8 py-3"
              >
                {t('cta.createAccount')}
              </Button>
            </Link>
            <Link href="/shop">
              <Button 
                variant="outline"
                size="lg"
                className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 px-8 py-3"
              >
                {t('cta.startShopping')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}