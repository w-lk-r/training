// Auto-generated from Supabase schema — re-run: npm run db:types
export type { Database, Json } from './database.types'

// App-level types (stable, manually maintained)
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
