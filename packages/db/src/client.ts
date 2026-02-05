import { createClient, SupabaseClientOptions } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Storage adapter interface for custom auth persistence
export interface StorageAdapter {
  getItem: (key: string) => string | null | Promise<string | null>
  setItem: (key: string, value: string) => void | Promise<void>
  removeItem: (key: string) => void | Promise<void>
}

// Default client (uses localStorage on web)
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Factory for creating client with custom storage (for React Native with MMKV)
export function createSupabaseClient(storage?: StorageAdapter) {
  const options: SupabaseClientOptions<'public'> = storage
    ? { auth: { storage, autoRefreshToken: true, persistSession: true } }
    : {}

  return createClient<Database>(supabaseUrl, supabaseAnonKey, options)
}
