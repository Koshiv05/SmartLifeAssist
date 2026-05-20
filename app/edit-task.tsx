import { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';

import {
  useLocalSearchParams,
  router,
} from 'expo-router';

import { SafeAreaView } from 'react-native-safe-area-context';

import { updateTaskInFirestore } from '../services/firestoreTasks';
import { useAppContext } from '../contexts/AppContext';

export default function EditTaskScreen() {
  const { refreshTasks } = useAppContext();

  // Receive existing task details from route parameters
  const params = useLocalSearchParams<{
    id: string;
    title: string;
    description: string;
    dueDate: string;
    dueTime: string;
  }>();

  const [title, setTitle] = useState(params.title || '');
  const [description, setDescription] = useState(params.description || '');
  const [dueDate, setDueDate] = useState(params.dueDate || '');
  const [dueTime, setDueTime] = useState(params.dueTime || '');

  // Update task details in Firestore and refresh task list
  async function handleUpdateTask() {
    try {
      if (!title.trim()) {
        Alert.alert('Validation Error', 'Task title is required.');
        return;
      }

      await updateTaskInFirestore({
        id: params.id,
        title,
        description,
        dueDate,
        dueTime,
        reminderType: '',
      });

      // Refresh task list after updating
      await refreshTasks();

      Alert.alert('Success', 'Task updated successfully.');

      router.replace('/' as any);
    } catch (error) {
      Alert.alert('Update Error', 'Could not update task.');
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.topBarTitle}>Edit Task</Text>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.card}>
            <Text style={styles.label}>Task Title</Text>

            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter task title"
            />

            <Text style={styles.label}>Description</Text>

            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              multiline
              placeholder="Enter task description"
            />

            <Text style={styles.label}>Due Date</Text>

            <TextInput
              style={styles.input}
              value={dueDate}
              onChangeText={setDueDate}
              placeholder="DD/MM/YYYY"
            />

            <Text style={styles.label}>Due Time</Text>

            <TextInput
              style={styles.input}
              value={dueTime}
              onChangeText={setDueTime}
              placeholder="HH:MM"
            />
          </View>

          <Pressable
            style={styles.saveButton}
            onPress={handleUpdateTask}
          >
            <Text style={styles.saveButtonText}>UPDATE TASK</Text>
          </Pressable>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const PURPLE = '#9C27B0';
const GREEN = '#4CAF50';
const LIGHT_BG = '#F2F2F2';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: LIGHT_BG,
  },
  container: {
    flex: 1,
    backgroundColor: LIGHT_BG,
  },
  topBar: {
    backgroundColor: PURPLE,
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  topBarTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 18,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 16,
    color: '#222',
  },
  textArea: {
    minHeight: 110,
    textAlignVertical: 'top',
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: GREEN,
    paddingVertical: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});