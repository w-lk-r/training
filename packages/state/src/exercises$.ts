import { observable, syncState } from '@legendapp/state'
import { syncedSupabase } from '@legendapp/state/sync-plugins/supabase'
import { supabase } from '@training/db'
import type { Exercise, MuscleGroup } from '@training/db'

export const exercises$ = observable<Record<string, Exercise>>(
  syncedSupabase({
    supabase,
    collection: 'exercises',
    actions: ['read'],
    as: 'object',
    persist: {
      name: 'exercises',
    },
  })
)

// Sync state for loading/error tracking
export const exercisesSyncState$ = syncState(exercises$)

// Get exercises as array (for lists)
export function getExercisesList(): Exercise[] {
  return Object.values(exercises$.get())
}

// Get exercise by ID
export function getExercise(id: string): Exercise | undefined {
  return exercises$[id].get()
}

// Search exercises by name
export function searchExercises(query: string): Exercise[] {
  const q = query.toLowerCase()
  return getExercisesList().filter(e =>
    e.name.toLowerCase().includes(q)
  )
}

// Filter exercises by category
export function filterByCategory(category: Exercise['category']): Exercise[] {
  return getExercisesList().filter(e => e.category === category)
}

// Filter exercises by muscle group
export function filterByMuscle(muscle: MuscleGroup): Exercise[] {
  return getExercisesList().filter(e => e.muscles.includes(muscle))
}
