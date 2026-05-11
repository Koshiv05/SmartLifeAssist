import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';

import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { deleteTaskFromFirestore } from '../services/firestoreTasks';
import { useAppContext } from '../contexts/AppContext';

export default function TaskDetailsScreen() {
  const { refreshTasks } = useAppContext();

  const {
    id,
    title,
    description,
    dueDate,
    dueTime,
  } = useLocalSearchParams<{
    id: string;
    title: string;
    description: string;
    dueDate: string;
    dueTime: string;
  }>();

  async function handleDeleteTask() {
    try {
      if (!id) {
        Alert.alert('Error', 'Task ID missing.');
        return;
      }

      await deleteTaskFromFirestore(id);

      await refreshTasks();

      Alert.alert('Task Deleted', 'Task removed successfully.');

      router.replace('/' as any);
    } catch (error) {
      Alert.alert('Delete Error', 'Could not delete task.');
    }
  }

  function confirmDelete() {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: handleDeleteTask,
        },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.topBarTitle}>Task Details</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.label}>Task Title</Text>
            <Text style={styles.value}>{title}</Text>

            <Text style={styles.label}>Description</Text>
            <Text style={styles.value}>{description}</Text>

            <Text style={styles.label}>Due Date</Text>
            <Text style={styles.value}>{dueDate}</Text>

            <Text style={styles.label}>Due Time</Text>
            <Text style={styles.value}>{dueTime}</Text>
          </View>

          <Pressable
            style={styles.deleteButton}
            onPress={confirmDelete}
          >
            <Text style={styles.deleteButtonText}>DELETE TASK</Text>
          </Pressable>
        </View>

        <View style={styles.bottomArea}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>BACK</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const PURPLE = '#9C27B0';
const LIGHT_BG = '#F2F2F2';
const RED = '#E53935';

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
    width: '100%',
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
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 18,
    elevation: 2,
  },
  label: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
    marginTop: 12,
  },
  value: {
    fontSize: 17,
    color: '#222',
  },
  deleteButton: {
    marginTop: 20,
    backgroundColor: RED,
    paddingVertical: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  bottomArea: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: '#d9d9d9',
  },
  backButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#999',
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 4,
  },
  backButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222',
  },
});