'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Store, Search, Heart, User } from 'lucide-react';
import { useTranslations } from "next-intl"; // Add this import


export default function ClientMobileNav({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  const t = useTranslations("Header.MobileNav"); // Load translations
  const pathname = usePathname();
  const accountHref = isAuthenticated ? '/protected/account' : '/auth/login';

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-black/95 backdrop-blur border-t border-cyan-500/20">
        <div className="grid grid-cols-5 h-16">
          <Link 
            href="/" 
            className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
              pathname === '/' ? 'text-cyan-400' : 'text-gray-400 hover:text-cyan-400'
            }`}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs font-medium">{t('home')}</span>
          </Link>
          
          <Link 
            href="/shop" 
            className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
              pathname === '/shop' ? 'text-cyan-400' : 'text-gray-400 hover:text-cyan-400'
            }`}
          >
            <Store className="h-5 w-5" />
            <span className="text-xs font-medium">{t('shop')}</span>
          </Link>
          
          <Link 
            href="/search" 
            className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
              pathname === '/search' ? 'text-cyan-400' : 'text-gray-400 hover:text-cyan-400'
            }`}
          >
            <Search className="h-5 w-5" />
            <span className="text-xs font-medium">{t('search')}</span>
          </Link>
          
          <Link 
            href="/wishlist" 
            className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
              pathname === '/wishlist' ? 'text-cyan-400' : 'text-gray-400 hover:text-cyan-400'
            }`}
          >
            <Heart className="h-5 w-5" />
            <span className="text-xs font-medium">{t('wishlist')}</span>
          </Link>
          
          <Link 
            href={accountHref} 
            className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
              pathname === accountHref ? 'text-cyan-400' : 'text-gray-400 hover:text-cyan-400'
            }`}
          >
            <User className="h-5 w-5" />
            <span className="text-xs font-medium">{t('account')}</span>
          </Link>
        </div>
      </nav>

      {/* Mobile Bottom Padding */}
      <div className="h-16 md:hidden" />
    </>
  );
}