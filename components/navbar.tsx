import { createClient } from "@/lib/supabase/server";
import { Container } from "@/components/ui/container";
import { Wallet } from "lucide-react";
import Link from "next/link";

import React, { Suspense } from "react";
import ClientHeaderActions from "./clients/ClientHeaderActions";
import ClientMobileNav from "./clients/ClientMobileNav";
import { CartItem } from "@/stores/CartStore";
import { getTranslations } from 'next-intl/server'; // Import for server-side translations


async function Navbar() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;
  const isAuthenticated = !!user;

  let initialCartItems: CartItem[] = [];
  if (isAuthenticated) {
    const { data, error } = await supabase
      .from("cart_items")
      .select(
        `
        *,
        product:products(*)  
      `
      )
      .eq("user_id", user?.sub);

    if (error) {
      console.error('Error fetching cart items:', error);
    } else if (data) {
      initialCartItems = data.map((item: any) => ({
        product: item.product,
        quantity: item.quantity,
      }));
    }
  }
const t = await getTranslations('Header');

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-cyan-500/20 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <Container>
          <div className="flex h-14 md:h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Wallet className="h-6 md:h-8 w-6 md:w-8 text-cyan-400" />
              <span className="text-lg md:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                CryptoPlaza
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/shop" className="text-gray-300 hover:text-cyan-400">
                {t('shop')}
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-cyan-400">
                {t('about')}
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-cyan-400">
                {t('contact')}
              </Link>
            </nav>

            {/* Client side actions */}
            <Suspense >
              <ClientHeaderActions user={user} isAuthenticated={isAuthenticated} initialCartItems={initialCartItems} />
            </Suspense>
          </div>
        </Container>
      </header>

      <ClientMobileNav  isAuthenticated={isAuthenticated} />
    </>
  );
}

export default Navbar;