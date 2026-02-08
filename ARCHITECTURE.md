# Architecture

## Overview

A monorepo training app with web and mobile clients sharing state management and database packages, backed by Supabase.

```
training/
├── apps/
│   ├── web/              Next.js 16, App Router, Tailwind CSS 4
│   └── mobile/           Expo SDK 54, Expo Router, React Native 0.81
├── packages/
│   ├── db/               Supabase client, types, seeds
│   └── state/            Legend State v3 observables, sync, persistence
```

Both apps share React 19.1.0 and TypeScript 5.

---

## Packages

### `@training/db`

Supabase client factory and type definitions.

- **`client.ts`** — Exports a default `supabase` client (uses localStorage on web) and a `createSupabaseClient(storage)` factory for custom storage backends (MMKV on mobile). Reads env vars with both `NEXT_PUBLIC_` and `EXPO_PUBLIC_` prefixes.
- **`types.ts`** — App-level types (`Exercise`, `ExerciseCategory`, `MuscleGroup`, `Equipment`) and the Supabase `Database` schema type.
- **`StorageAdapter`** — Interface (`getItem`, `setItem`, `removeItem`) that allows swapping persistence backends per platform.

### `@training/state`

Reactive state layer using Legend State v3 beta. All UI subscribes to observables — the state package handles syncing with Supabase and local persistence.

**`auth$.ts`**
- `auth$` observable: `{ user, isLoading, isAuthenticated }`
- `configureAuth(storage)` — Sets platform-specific storage for Supabase auth sessions (call before `initAuth`)
- `initAuth()` — Loads existing session, listens for auth state changes
- Actions: `signIn`, `signUp`, `signOut`, `handleAuthCallback`

**`exercises$.ts`**
- `exercises$` observable: `Record<string, Exercise>`, synced via `syncedSupabase`
- Auto-fetches from Supabase on first access (lazy), persists locally
- `exercisesSyncState$` — Loading/error tracking via `syncState()`
- Query helpers: `getExercisesList`, `getExercise`, `searchExercises`, `filterByCategory`, `filterByMuscle`

**`persist.ts`**
- `configurePersistence(plugin)` — Sets the Legend State persist plugin globally. Each app calls this once at startup with its platform-specific plugin.

---

## Apps

### Web (`apps/web`)

Next.js 16 with App Router.

```
app/
├── layout.tsx        Server component, wraps children in <Providers>
├── providers.tsx     Client component, calls configurePersistence(localStorage)
├── page.tsx          Home page with auth state
└── auth/page.tsx     Sign in / sign up form
```

- Persistence: `ObservablePersistLocalStorage`
- Styling: Tailwind CSS v4

### Mobile (`apps/mobile`)

Expo with Expo Router for file-based routing.

```
app/
├── _layout.tsx       Root layout: auth config, MMKV, persistence, Stack.Protected guards
├── index.tsx         Home route (guarded: authenticated)
└── sign-in.tsx       Auth route (guarded: unauthenticated)
components/screens/
├── AuthScreen.tsx    Sign in / sign up form
└── HomeScreen.tsx    Home screen with sign out
```

- Routing: Expo Router with `Stack.Protected` guards — routes are declaratively shown/hidden based on `auth$.isAuthenticated`
- Persistence: `ObservablePersistMMKV` via `react-native-mmkv`
- Deep linking: `training://` scheme handles auth email callbacks

---

## Data Flow

### Auth

```
App startup
  → configureAuth(storage)        Platform-specific storage adapter
  → configurePersistence(plugin)   Platform-specific persist plugin
  → initAuth()                     Restores session from Supabase
  → auth$ updates                  UI reacts via useValue()
```

Supabase manages session tokens. The `StorageAdapter` determines where tokens are stored (localStorage on web, MMKV on mobile). Legend State's `auth$` observable is a reactive wrapper — not persisted by Legend State, but by Supabase's own session management.

### Exercises

```
Component calls exercises$.get()
  → syncedSupabase activates (lazy)
  → Loads from local persist cache (instant)
  → Fetches from Supabase in background
  → Observable updates → UI re-renders
```

Uses Legend State v3's `syncedSupabase` plugin: auto-sync with Supabase, local persistence for offline access. Read-only (`actions: ['read']`).

---

## Cross-Platform Strategy

| Concern | Web | Mobile |
|---|---|---|
| Auth storage | localStorage (Supabase default) | MMKV via `configureAuth()` |
| State persistence | `ObservablePersistLocalStorage` | `ObservablePersistMMKV` |
| Routing | Next.js App Router | Expo Router + `Stack.Protected` |
| Env vars | `NEXT_PUBLIC_*` | `EXPO_PUBLIC_*` |

The state and db packages are platform-agnostic. Platform differences are configured at the app level before any state is accessed.
