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
