import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function AddTaskScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Task</Text>

      <Text style={styles.label}>Task Title</Text>
      <TextInput style={styles.input} placeholder="Enter task title" />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter description"
        multiline
      />

      <Text style={styles.label}>Due Time</Text>
      <TextInput style={styles.input} placeholder="--:--" />

      <View style={styles.buttonRow}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Cancel</Text>
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
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#bbb',
    padding: 12,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 30,
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