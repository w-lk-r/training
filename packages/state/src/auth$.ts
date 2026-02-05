import { observable } from '@legendapp/state'
import { supabase as defaultSupabase, createSupabaseClient, StorageAdapter } from '@training/db'
import type { User, SupabaseClient } from '@supabase/supabase-js'

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

export const auth$ = observable<AuthState>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
})

// Active Supabase client (can be configured with custom storage)
let supabase: SupabaseClient = defaultSupabase

// Configure auth with custom storage (call before initAuth on mobile)
export function configureAuth(storage: StorageAdapter) {
  supabase = createSupabaseClient(storage)
}

// Get the active Supabase client
export function getSupabase() {
  return supabase
}

// Initialize auth state
export async function initAuth() {
  auth$.isLoading.set(true)

  // Get initial session
  const { data: { session } } = await supabase.auth.getSession()
  if (session?.user) {
    auth$.user.set(session.user)
    auth$.isAuthenticated.set(true)
  }

  auth$.isLoading.set(false)

  // Listen for auth changes
  supabase.auth.onAuthStateChange((_event, session) => {
    auth$.user.set(session?.user ?? null)
    auth$.isAuthenticated.set(!!session?.user)
  })
}

// Auth actions
export async function signUp(email: string, password: string, redirectTo?: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: redirectTo ? { emailRedirectTo: redirectTo } : undefined,
  })
  if (error) throw error
  return data
}

// Handle deep link callback (for mobile email confirmation)
export async function handleAuthCallback(url: string) {
  // Extract tokens from URL hash or query params
  const hashParams = new URLSearchParams(url.split('#')[1] || '')
  const accessToken = hashParams.get('access_token')
  const refreshToken = hashParams.get('refresh_token')

  if (accessToken && refreshToken) {
    const { error } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    })
    if (error) throw error
  }
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}
