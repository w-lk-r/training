import { observable } from '@legendapp/state'
import { supabase } from '@training/db'
import type { User } from '@supabase/supabase-js'

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
export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) throw error
  return data
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
