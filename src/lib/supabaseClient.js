import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn("⚠️ Attention: Les variables d'environnement VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY sont manquantes. Veuillez les configurer dans Vercel.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
