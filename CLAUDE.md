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
- **packages/** - Shared packages (currently empty, ready for use)

### Web App (Next.js)
- Uses App Router (`app/` directory)
- Tailwind CSS v4 with PostCSS
- ESLint with Next.js core-web-vitals and TypeScript configs
- Geist font family via `next/font`

### Mobile App (Expo)
- Expo managed workflow
- New Architecture enabled (`newArchEnabled: true`)
- Supports iOS, Android, and web targets

### State Management (Legend State v3)

Uses `@legendapp/state` for reactive state. See: https://www.legendapp.com/open-source/state/v3/usage/observable/

**React Components - Subscribing to observables:**
```tsx
// CORRECT: useSelector subscribes to existing observables
import { useSelector } from '@legendapp/state/react'
const value = useSelector(myState$.someValue)

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

**Note:** Using v2.x. Supabase sync plugin (`syncedSupabase`) requires v3+ (currently beta).
