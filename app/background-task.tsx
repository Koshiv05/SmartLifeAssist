import { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';

import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  registerBackgroundTask,
  checkTaskStatus,
} from '../services/backgroundTaskService';

export default function BackgroundTaskScreen() {
  const [taskStatus, setTaskStatus] = useState(
    'Task not registered'
  );

  useEffect(() => {
    async function loadTaskStatus() {
      const registered = await checkTaskStatus();

      if (registered) {
        setTaskStatus('Background task is active');
      }
    }

    loadTaskStatus();
  }, []);

  async function handleRegisterTask() {
    const result = await registerBackgroundTask();

    if (result.success) {
      setTaskStatus('Background task is active');

      Alert.alert('Task Manager Active', result.message);
    } else {
      Alert.alert('Task Manager Error', result.message);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.topBarTitle}>
            Work Manager
          </Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.description}>
            This feature demonstrates background task
            management using Expo Task Manager and
            Background Fetch APIs.
          </Text>

          <View style={styles.statusCard}>
            <Text style={styles.statusTitle}>
              Registration Status
            </Text>

            <Text style={styles.statusText}>
              {taskStatus}
            </Text>
          </View>

          <Pressable
            style={styles.button}
            onPress={handleRegisterTask}
          >
            <Text style={styles.buttonText}>
              REGISTER BACKGROUND TASK
            </Text>
          </Pressable>
        </View>

        <View style={styles.bottomArea}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>
              BACK
            </Text>
          </Pressable>
        </View>
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
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },

  description: {
    fontSize: 16,
    lineHeight: 26,
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },

  statusCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 6,
    marginBottom: 24,
    elevation: 2,
  },

  statusTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222',
    marginBottom: 8,
  },

  statusText: {
    fontSize: 15,
    color: '#4CAF50',
    fontWeight: '600',
  },

  button: {
    backgroundColor: GREEN,
    paddingVertical: 18,
    borderRadius: 6,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
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