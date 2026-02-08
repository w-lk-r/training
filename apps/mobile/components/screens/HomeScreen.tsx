import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useValue } from '@legendapp/state/react'
import { auth$, signOut } from '@training/state'

export default function HomeScreen() {
  const user = useValue(auth$.user)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Training App</Text>
      <Text style={styles.subtitle}>Signed in as: {user?.email}</Text>
      <TouchableOpacity style={styles.signOutButton} onPress={() => signOut()}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  signOutButton: {
    backgroundColor: '#dc2626',
    padding: 12,
    borderRadius: 8,
  },
  signOutText: {
    color: '#fff',
    fontWeight: '600',
  },
})
