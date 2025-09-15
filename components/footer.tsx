'use client'; // Agrega esto si no está (para habilitar hooks client-side)

import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Separator } from '@/components/ui/separator';
import { Wallet, Github, Twitter, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl'; // Importa esto

export function Footer() {
  const t = useTranslations('Footer'); // Carga traducciones del namespace 'Footer'

  return (
    <footer className="bg-black border-t border-cyan-500/20 mt-16">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center space-x-2">
                <Wallet className="h-6 w-6 text-cyan-400" />
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  CryptoStore
                </span>
              </Link>
              <p className="text-gray-400 text-sm">
                {t('brandDescription')}
              </p>
            </div>

            {/* Shop */}
            <div>
              <h3 className="font-semibold text-white mb-4">{t('shop')}</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/shop?category=clothes" className="text-gray-400 hover:text-cyan-400 transition-colors">{t('clothes')}</Link></li>
                <li><Link href="/shop?category=accessories" className="text-gray-400 hover:text-cyan-400 transition-colors">{t('accessories')}</Link></li>
                <li><Link href="/shop?category=tech" className="text-gray-400 hover:text-cyan-400 transition-colors">{t('technology')}</Link></li>
                <li><Link href="/cart" className="text-gray-400 hover:text-cyan-400 transition-colors">{t('shoppingCart')}</Link></li>
              </ul>
            </div>

            {/* Account */}
            <div>
              <h3 className="font-semibold text-white mb-4">{t('account')}</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/auth" className="text-gray-400 hover:text-cyan-400 transition-colors">{t('login')}</Link></li>
                <li><Link href="/account" className="text-gray-400 hover:text-cyan-400 transition-colors">{t('myAccount')}</Link></li>
                <li><Link href="/account#orders" className="text-gray-400 hover:text-cyan-400 transition-colors">{t('orderHistory')}</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-cyan-400 transition-colors">{t('support')}</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold text-white mb-4">{t('legal')}</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="text-gray-400 hover:text-cyan-400 transition-colors">{t('privacyPolicy')}</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-cyan-400 transition-colors">{t('termsOfService')}</Link></li>
                <li><Link href="/refunds" className="text-gray-400 hover:text-cyan-400 transition-colors">{t('refundPolicy')}</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-cyan-400 transition-colors">{t('aboutUs')}</Link></li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-8 bg-cyan-500/20" />
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              {t('copyright')}
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}