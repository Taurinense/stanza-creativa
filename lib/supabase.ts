import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  // Non blocchiamo il build, ma avvisiamo chiaramente in console lato client.
  console.warn(
    '[Supabase] Variabili NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY mancanti. Configura .env.local.'
  );
}

export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '');

export type Idea = {
  id: string;
  title: string;
  description: string;
  author: string;
  image_url: string | null;
  created_at: string;
  votes_count: number;
};
