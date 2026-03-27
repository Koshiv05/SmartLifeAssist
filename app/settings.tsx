import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Profile</Text>
        <Text>koshiv sharma</Text>
        <Text>koshiv.sharma@email.com</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Options</Text>
        <Text>Dark Mode</Text>
        <Text style={styles.subText}>Dark mode disabled</Text>
        <Text style={{ marginTop: 14 }}>Large Text</Text>
        <Text style={styles.subText}>Large text disabled</Text>
      </View>

      <Pressable style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Save</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#bbb',
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  subText: {
    color: '#666',
    marginTop: 4,
  },
  button: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#fff',
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});