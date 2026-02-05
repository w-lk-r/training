import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
}
// Default client (uses localStorage on web)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
// Factory for creating client with custom storage (for React Native with MMKV)
export function createSupabaseClient(storage) {
    const options = storage
        ? { auth: { storage, autoRefreshToken: true, persistSession: true } }
        : {};
    return createClient(supabaseUrl, supabaseAnonKey, options);
}
