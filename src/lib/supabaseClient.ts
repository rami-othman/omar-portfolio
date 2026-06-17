import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() ?? "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() ?? "";

function hasUsableEnvValue(value: string) {
  return Boolean(value) && !value.startsWith("your_");
}

export const isSupabaseConfigured =
  hasUsableEnvValue(supabaseUrl) && hasUsableEnvValue(supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
