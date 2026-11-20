import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabasePublishableKey = process.env.SUPABASE_PUBLISHABLE_KEY!;

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error("Konfigurasi Supabase belum lengkap.");
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey);
