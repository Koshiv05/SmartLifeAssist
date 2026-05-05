import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Logged in successfully');
      router.replace('/');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.text}>LOGIN</Text>
      </Pressable>

      <Pressable onPress={() => router.push('/signup' as any)}>
        <Text style={styles.link}>Create Account</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    marginBottom: 12,
    padding: 12,
    borderRadius: 4
  },
  button: {
    backgroundColor: '#9C27B0',
    padding: 14,
    alignItems: 'center'
  },
  text: { color: '#fff', fontWeight: '700' },
  link: { marginTop: 12, textAlign: 'center', color: '#1976D2' }
});