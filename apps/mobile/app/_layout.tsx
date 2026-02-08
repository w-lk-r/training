import { useEffect } from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import * as Linking from 'expo-linking'
import { MMKV } from 'react-native-mmkv'
import { useValue } from '@legendapp/state/react'
import { ObservablePersistMMKV } from '@legendapp/state/persist-plugins/mmkv'
import { auth$, initAuth, handleAuthCallback, configureAuth, configurePersistence } from '@training/state'

const storage = new MMKV({ id: 'supabase-auth' })
configureAuth({
  getItem: (key) => storage.getString(key) ?? null,
  setItem: (key, value) => storage.set(key, value),
  removeItem: (key) => storage.delete(key),
})
configurePersistence(ObservablePersistMMKV)

export default function RootLayout() {
  const isLoading = useValue(auth$.isLoading)
  const isAuthenticated = useValue(auth$.isAuthenticated)

  useEffect(() => {
    initAuth()

    async function handleDeepLink(event: { url: string }) {
      if (event.url.includes('auth/callback')) {
        try {
          await handleAuthCallback(event.url)
        } catch (err) {
          console.error('Auth callback error:', err)
        }
      }
    }

    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url })
    })

    const subscription = Linking.addEventListener('url', handleDeepLink)
    return () => subscription.remove()
  }, [])

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" />
        <StatusBar style="auto" />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={!isAuthenticated}>
          <Stack.Screen name="sign-in" />
        </Stack.Protected>

        <Stack.Protected guard={isAuthenticated}>
          <Stack.Screen name="index" />
        </Stack.Protected>
      </Stack>
      <StatusBar style="auto" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
