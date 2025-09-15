'use client';

import { create } from 'zustand';
import { Product } from '@/lib/data';
import { createClient } from '@/lib/supabase/client';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addToCart: (product: Product) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  initializeCart: (items: CartItem[]) => void;
  syncCartToDB: () => Promise<void>;
}

export const useCart = create<CartStore>()((set, get) => ({
  items: [],
  isOpen: false,
  addToCart: async (product) => {
    const items = get().items;
    const existingItem = items.find(item => item.product.id === product.id);
    if (existingItem) {
      set({
        items: items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({
        items: [...items, { product, quantity: 1 }],
      });
    }
    await get().syncCartToDB();
  },
  removeFromCart: async (productId) => {
    set({
      items: get().items.filter(item => item.product.id !== productId),
    });
    await get().syncCartToDB();
  },
  updateQuantity: async (productId, quantity) => {
    if (quantity <= 0) {
      set({
        items: get().items.filter(item => item.product.id !== productId),
      });
    } else {
      set({
        items: get().items.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        ),
      });
    }
    await get().syncCartToDB();
  },
  clearCart: () => {
    set({ items: [] });
  },
  toggleCart: () => {
    set({ isOpen: !get().isOpen });
  },
  openCart: () => {
    set({ isOpen: true });
  },
  closeCart: () => {
    set({ isOpen: false });
  },
  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
  getTotalPrice: () => {
    return get().items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  },
  initializeCart: (items) => set({ items }),
  syncCartToDB: async () => {
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error('Error getting user or not authenticated:', userError);
      return;
    }

    // Borra old items
    const { error: deleteError } = await supabase.from('cart_items').delete().eq('user_id', user.id);
    if (deleteError) {
      console.error('Error deleting cart items:', deleteError);
      return;
    }

    // Inserta new
    const inserts = get().items.map(item => ({
      user_id: user.id,
      product_id: item.product.id,
      quantity: item.quantity,
    }));
    if (inserts.length > 0) {
      const { error: insertError } = await supabase.from('cart_items').insert(inserts);
      if (insertError) {
        console.error('Error inserting cart items:', insertError);
      }
    }
  },
}));