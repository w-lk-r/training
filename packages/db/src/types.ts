export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// Will be replaced with generated types from Supabase CLI
export interface Database {
  public: {
    Tables: {
      // Placeholder - run `npx supabase gen types typescript` to generate
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}

// App-level types (stable, not auto-generated)
export interface User {
  id: string
  email: string
  createdAt: string
}
