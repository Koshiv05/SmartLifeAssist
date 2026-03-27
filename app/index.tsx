import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function MainScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SmartLife Assist</Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Next Task</Text>
        <Text style={styles.cardTitle}>Complete project report</Text>
        <Text style={styles.cardSub}>Due: 5:00 PM</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>AI Suggestion</Text>
        <Text style={styles.cardText}>
          Based on your schedule, consider starting the project report now to avoid
          last-minute rush.
        </Text>
      </View>

      <View style={styles.buttonRow}>
        <Pressable style={styles.button} onPress={() => router.push('/add-task')}>
          <Text style={styles.buttonText}>Add Task</Text>
        </Pressable>

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Emergency</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => router.push('/settings')}>
          <Text style={styles.buttonText}>Settings</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 16,
  },
  cardLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '600',
  },
  cardSub: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  cardText: {
    fontSize: 15,
    lineHeight: 22,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 30,
  },
  button: {
    flex: 1,
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