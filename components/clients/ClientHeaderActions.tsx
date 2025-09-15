"use client";

import React, { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { ShoppingCart, User } from "lucide-react";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { logout } from "@/app/actions";
import Image from "next/image";
import { CartItem, useCart } from "@/stores/CartStore";
import { CartSheet } from "../CartSheet";
import { useTranslations } from "next-intl"; // Add this import

type Props = {
  isAuthenticated: boolean;
  user: any | null;
  initialCartItems: CartItem[];
};

export default function ClientHeaderActions({
  isAuthenticated,
  user,
  initialCartItems,
}: Props) {
  const t = useTranslations("Header"); // Load translations
  const { initializeCart, isOpen, openCart, closeCart, getTotalItems } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isAuthenticated) {
      initializeCart(initialCartItems);
    }
  }, [initialCartItems, isAuthenticated, initializeCart]);

  return (
    <div className="flex items-center space-x-4">
      {/* Cart */}
      <Sheet
        open={isOpen}
        onOpenChange={(open) => (open ? openCart() : closeCart())}
      >
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative text-gray-300 hover:text-cyan-400"
          >
            <ShoppingCart className="h-5 w-5" />
            {mounted && (
              <Badge className="absolute -top-1 -right-1 h-4 md:h-5 w-4 md:w-5 rounded-full bg-cyan-500 text-black text-xs flex items-center justify-center p-0">
                {getTotalItems()}
              </Badge>
            )}
          </Button>
        </SheetTrigger>

        <SheetContent className="w-full sm:max-w-lg bg-black border-l border-cyan-500/10 px-5">
          <SheetTitle>{t("cartTitle")}</SheetTitle>
          <CartSheet />
        </SheetContent>
      </Sheet>
      {isAuthenticated ? (
        <div className="hidden md:flex items-center space-x-2">
          {user?.user_metadata?.avatar_url ? (
            <Image
              src={user.user_metadata.avatar_url}
              alt="User avatar"
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-300 hover:text-cyan-400"
            >
              <User className="h-5 w-5" />
            </Button>
          )}
          <form action={logout}>
            <Button
              type="submit"
              variant="ghost"
              className="text-gray-300 hover:text-cyan-400"
            >
              Cerrar Sesión
            </Button>
          </form>
        </div>
      ) : (
        <Link
          href="/auth/login"
          className="hidden md:block text-lg text-gray-300 hover:text-cyan-400 transition-colors"
        >
          Iniciar Sesión
        </Link>
      )}
    </div>
  );
}
