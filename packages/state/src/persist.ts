import { configureSynced } from '@legendapp/state/sync'
import { configureSyncedSupabase } from '@legendapp/state/sync-plugins/supabase'
import type { ObservablePersistPlugin } from '@legendapp/state/sync'
import type { ClassConstructor } from '@legendapp/state'
import { v4 as uuidv4 } from 'uuid'

export function configurePersistence(plugin: ClassConstructor<ObservablePersistPlugin>) {
  configureSynced({
    persist: { plugin },
  })

  configureSyncedSupabase({
    generateId: () => uuidv4(),
  })
}
