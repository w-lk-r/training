import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, } from 'react-native';
import * as Linking from 'expo-linking';
import { MMKV } from 'react-native-mmkv';
import { useSelector } from '@legendapp/state/react';
import { auth$, initAuth, signIn, signUp, signOut, handleAuthCallback, configureAuth } from '@training/state';
const REDIRECT_URL = Linking.createURL('auth/callback');
// Configure MMKV storage for Supabase auth persistence
const storage = new MMKV({ id: 'supabase-auth' });
configureAuth({
    getItem: (key) => storage.getString(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
    removeItem: (key) => storage.delete(key),
});
function AuthScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    async function handleSubmit() {
        setError(null);
        setLoading(true);
        try {
            if (isSignUp) {
                await signUp(email, password, REDIRECT_URL);
                setError('Check your email to confirm your account');
            }
            else {
                await signIn(email, password);
            }
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        }
        finally {
            setLoading(false);
        }
    }
    return (<View style={styles.authContainer}>
      <Text style={styles.title}>{isSignUp ? 'Create Account' : 'Sign In'}</Text>

      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none"/>

      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry/>

      {error && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        {loading ? (<ActivityIndicator color="#fff"/>) : (<Text style={styles.buttonText}>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Text>)}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
        <Text style={styles.link}>
          {isSignUp
            ? 'Already have an account? Sign in'
            : "Don't have an account? Sign up"}
        </Text>
      </TouchableOpacity>
    </View>);
}
function HomeScreen() {
    const user = useSelector(auth$.user);
    return (<View style={styles.container}>
      <Text style={styles.title}>Training App</Text>
      <Text style={styles.subtitle}>Signed in as: {user?.email}</Text>
      <TouchableOpacity style={styles.signOutButton} onPress={() => signOut()}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>);
}
export default function App() {
    const isLoading = useSelector(auth$.isLoading);
    const isAuthenticated = useSelector(auth$.isAuthenticated);
    useEffect(() => {
        initAuth();
        // Handle deep link when app opens from email confirmation
        async function handleDeepLink(event) {
            if (event.url.includes('auth/callback')) {
                try {
                    await handleAuthCallback(event.url);
                }
                catch (err) {
                    console.error('Auth callback error:', err);
                }
            }
        }
        // Check if app was opened with a deep link
        Linking.getInitialURL().then((url) => {
            if (url)
                handleDeepLink({ url });
        });
        // Listen for deep links while app is open
        const subscription = Linking.addEventListener('url', handleDeepLink);
        return () => subscription.remove();
    }, []);
    if (isLoading) {
        return (<View style={styles.container}>
        <ActivityIndicator size="large"/>
        <StatusBar style="auto"/>
      </View>);
    }
    return (<View style={styles.container}>
      {isAuthenticated ? <HomeScreen /> : <AuthScreen />}
      <StatusBar style="auto"/>
    </View>);
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    authContainer: {
        width: '100%',
        paddingHorizontal: 32,
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
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#000',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    link: {
        color: '#666',
        textAlign: 'center',
    },
    error: {
        color: 'red',
        marginBottom: 16,
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
});
