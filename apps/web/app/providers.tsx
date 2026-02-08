'use client'

import { ObservablePersistLocalStorage } from '@legendapp/state/persist-plugins/local-storage'
import { configurePersistence } from '@training/state'

configurePersistence(ObservablePersistLocalStorage)

export default function Providers({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
