import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Truck, CreditCard } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getTranslations } from 'next-intl/server'; // Import for server-side translations

export async function Hero() {
  const t = await getTranslations('Home.hero'); // Load Hero translations

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center space-y-8">
          <Badge 
            variant="outline" 
            className="border-cyan-500/50 text-cyan-400 bg-cyan-500/10 text-sm px-4 py-2"
          >
            {t('badge')}
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="block text-white">{t('title1')}</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              {t('title2')}
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/shop">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-semibold px-8 py-3 text-lg"
              >
                {t('buyWithCrypto')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <Link href="/about">
              <Button 
                variant="outline" 
                size="lg"
                className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 px-8 py-3 text-lg"
              >
                {t('learnMore')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}