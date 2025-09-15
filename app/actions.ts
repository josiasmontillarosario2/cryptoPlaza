"use server";

import { createClient } from "@/lib/supabase/server"; // Tu client server-side (con cookies)
import { redirect } from "next/navigation";
import { headers } from "next/headers";



export async function login(prevState: any, formData: FormData) {
  const supabase = await createClient(); // Asumiendo que es async, como en tu Navbar
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
  // No redirigimos aquí; lo manejamos en el cliente para UX con transiciones
}


export async function signup(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const repeatPassword = formData.get("repeat-password") as string;

  if (password !== repeatPassword) {
    return { error: "Passwords do not match" };
  }
  const headersList = await headers();
  const origin = headersList.get("origin");

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/protected`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
  // No redirigimos aquí; lo manejamos en el cliente
}

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
  redirect("/auth/login");
}



