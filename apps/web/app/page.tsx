'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useValue } from '@legendapp/state/react'
import { auth$, initAuth, signOut } from '@training/state'

export default function Home() {
  const user = useValue(auth$.user)
  const isLoading = useValue(auth$.isLoading)
  const isAuthenticated = useValue(auth$.isAuthenticated)

  useEffect(() => {
    initAuth()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <main className="text-center">
        <h1 className="text-3xl font-bold mb-6">Training App</h1>

        {isAuthenticated ? (
          <div className="space-y-4">
            <p>Signed in as: {user?.email}</p>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-500">Not signed in</p>
            <Link
              href="/auth"
              className="inline-block px-4 py-2 bg-foreground text-background rounded-md hover:opacity-90"
            >
              Sign In
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
