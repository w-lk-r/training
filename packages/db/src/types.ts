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

export type ExerciseCategory =
  | 'squat'
  | 'hinge'
  | 'push'
  | 'pull'
  | 'carry'
  | 'olympic'
  | 'accessory'
  | 'core'
  | 'cardio'

export type Equipment =
  | 'barbell'
  | 'dumbbell'
  | 'kettlebell'
  | 'cable'
  | 'machine'
  | 'bodyweight'
  | 'rack'
  | 'bench'
  | 'platform'
  | 'bands'
  | 'box'

export type MuscleGroup =
  | 'quads'
  | 'hamstrings'
  | 'glutes'
  | 'calves'
  | 'chest'
  | 'back'
  | 'lats'
  | 'shoulders'
  | 'biceps'
  | 'triceps'
  | 'forearms'
  | 'core'
  | 'traps'
  | 'hip_flexors'
  | 'adductors'
  | 'full_body'

export interface Exercise {
  id: string
  name: string
  category: ExerciseCategory
  equipment: Equipment[]
  muscles: MuscleGroup[]
  instructions: string | null
  created_at: string
  updated_at: string
}
