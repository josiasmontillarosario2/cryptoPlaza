import { createClient } from '@/lib/supabase/server'

// Define TypeScript interfaces for type safety
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: 'clothes' | 'accessories' | 'tech';
  featured: boolean;
  stock: number;
  created_at: string;
  updated_at: string;
}

interface Order {
  id: string;
  user_id: string;
  items: { product_id: string; quantity: number }[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  created_at: string;
  shipping_address: { [key: string]: any };
}

interface Profile {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  role: string;
  created_at: string | null;
  updated_at: string | null;
}

// Initialize Supabase client (pass client for server or client-side usage)
const getSupabaseClient = async () => {
  return await createClient();
};

// Fetch a single product by ID
export async function getProductById(productId: string): Promise<Product | null> {
  const supabase = await getSupabaseClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }
  return data;
}

// Fetch the current authenticated user's profile
export async function getCurrentUser(): Promise<Profile | null> {
  const supabase = await getSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.error('No authenticated user found');
    return null;
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
  return data;
}

// Search products by name or description
export async function searchProducts(query: string): Promise<Product[]> {
  const supabase = await getSupabaseClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`);

  if (error) {
    console.error('Error searching products:', error);
    return [];
  }
  return data || [];
}

// Fetch all orders for a specific user
export async function getUserOrders(userId: string): Promise<Order[]> {
  const supabase = await getSupabaseClient();
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user orders:', error);
    return [];
  }
  return data || [];
}

// Fetch a single order by ID
export async function getOrderById(orderId: string): Promise<Order | null> {
  const supabase = await getSupabaseClient();
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single();

  if (error) {
    console.error('Error fetching order:', error);
    return null;
  }
  return data;
}

// Fetch all featured products
export async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = await getSupabaseClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true);

  if (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
  return data || [];
}

// Fetch products by category
export async function getProductsByCategory(category: 'clothes' | 'accessories' | 'tech'): Promise<Product[]> {
  const supabase = await getSupabaseClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category);

  if (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
  return data || [];
}

// Fetch all products
export async function getAllProducts(): Promise<Product[]> {
  const supabase = await getSupabaseClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all products:', error);
    return [];
  }
  return data || [];
}



