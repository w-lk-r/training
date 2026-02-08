# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev:web          # Start Next.js dev server (localhost:3000)
npm run dev:mobile       # Start Expo dev server

# Build
npm run build:web        # Build Next.js for production

# Quality
npm run lint             # Lint all workspaces
npm run typecheck        # Type check all packages
```

## Architecture

This is a monorepo using npm workspaces with two applications sharing React 19.1.0:

- **apps/web** - Next.js 16 with App Router, Tailwind CSS 4, TypeScript
- **apps/mobile** - Expo SDK 54 with React Native 0.81, New Architecture enabled
- **packages/state** - Shared state management (`@training/state`) using Legend State v3
- **packages/db** - Shared database client (`@training/db`) with Supabase and type definitions

### Web App (Next.js)
- Uses App Router (`app/` directory)
- Tailwind CSS v4 with PostCSS
- ESLint with Next.js core-web-vitals and TypeScript configs
- Geist font family via `next/font`
- Configures persistence with `ObservablePersistLocalStorage`

### Mobile App (Expo)
- Expo managed workflow with **Expo Router** for file-based routing
- Routes live in `apps/mobile/app/` — screen components in `apps/mobile/components/screens/`
- Uses `Stack.Protected` guards for auth-based routing in `_layout.tsx`
- New Architecture enabled (`newArchEnabled: true`)
- Supports iOS, Android, and web targets
- Configures persistence with `ObservablePersistMMKV` (via `react-native-mmkv`)

### State Management (Legend State v3 beta)

Uses `@legendapp/state@beta` (v3) for reactive state with built-in Supabase sync and local persistence.

**React Components - Subscribing to observables:**
```tsx
// CORRECT: useValue subscribes to existing observables
import { useValue } from '@legendapp/state/react'
const value = useValue(myState$.someValue)

// WRONG: useObservable creates NEW local observables, not subscriptions
const value = useObservable(myState$.someValue) // Don't do this!
```

**Accessing values:**
- `observable.get()` - Gets value AND tracks for re-renders (use in components)
- `observable.peek()` - Gets value WITHOUT tracking (use when you don't want re-renders)

**Modifying values:**
```tsx
// CORRECT: Use set(), assign(), or delete()
myState$.user.set(newUser)
myState$.settings.assign({ theme: 'dark', lang: 'en' })
myState$.items[0].delete()

// WRONG: Direct mutation breaks reactivity
myState$.user = newUser  // Won't work
```

**Key rules:**
- Never reassign observables directly — use `set()`
- Never mutate raw data — always go through observable methods
- Don't clone objects before setting — Legend State handles deep equality

### Persistence & Sync

Uses `syncedSupabase` from Legend State v3 to auto-sync observables with Supabase and persist locally.

```tsx
// Define a synced observable (lazy — activates on first .get())
import { syncedSupabase } from '@legendapp/state/sync-plugins/supabase'

const data$ = observable(syncedSupabase({
  supabase,
  collection: 'table_name',
  persist: { name: 'local-key' },
}))
```

Each app must call `configurePersistence(plugin)` at startup to set the platform-specific persist plugin before any synced observable is accessed.

Sync state (loading, errors) is available via `syncState(observable$)` from `@legendapp/state`.
