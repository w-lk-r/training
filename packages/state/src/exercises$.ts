import { observable } from '@legendapp/state'
import { supabase } from '@training/db'
import type { Exercise, MuscleGroup } from '@training/db'

interface ExercisesState {
  items: Record<string, Exercise>
  isLoading: boolean
  error: string | null
  lastFetched: number | null
}

export const exercises$ = observable<ExercisesState>({
  items: {},
  isLoading: false,
  error: null,
  lastFetched: null,
})

// Fetch all exercises from Supabase
export async function fetchExercises() {
  exercises$.isLoading.set(true)
  exercises$.error.set(null)

  try {
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .order('name')

    if (error) throw error

    // Convert array to record keyed by id
    const items: Record<string, Exercise> = {}
    if (data) {
      for (const row of data) {
        // Cast from database row type to app type
        items[row.id] = {
          ...row,
          category: row.category as Exercise['category'],
          equipment: row.equipment as Exercise['equipment'],
          muscles: row.muscles as Exercise['muscles'],
        }
      }
    }

    exercises$.items.set(items)
    exercises$.lastFetched.set(Date.now())
  } catch (err) {
    exercises$.error.set(err instanceof Error ? err.message : 'Failed to fetch exercises')
  } finally {
    exercises$.isLoading.set(false)
  }
}

// Get exercises as array (for lists)
export function getExercisesList(): Exercise[] {
  return Object.values(exercises$.items.get())
}

// Get exercise by ID
export function getExercise(id: string): Exercise | undefined {
  return exercises$.items[id].get()
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
