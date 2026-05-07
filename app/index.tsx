import { View, Text, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCallback, useState } from 'react';
import { loadTasks } from '../services/storage';
import { Task } from '../types/task';
import { loadTasksFromFirestore } from '../services/firestoreTasks';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../services/firebase';

export default function MainScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
          router.replace('/login' as any);
        } else {
          setUserEmail(user.email);
        }
      });

      return unsubscribe;
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      async function fetchTasks() {
        try {
          const firestoreTasks = await loadTasksFromFirestore();

          if (firestoreTasks.length > 0) {
            setTasks(firestoreTasks);
          } else {
            const localTasks = await loadTasks();
            setTasks(localTasks);
          }
        } catch (error) {
          const localTasks = await loadTasks();
          setTasks(localTasks);
        }
      }

      fetchTasks();
    }, [])
  );

  const latestTask = tasks.length > 0 ? tasks[tasks.length - 1] : null;

  function openTaskDetails(task: Task) {
    router.push({
      pathname: '/task-details' as any,
      params: {
        id: task.id,
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        dueTime: task.dueTime,
      },
    });
  }

  async function handleLogout() {
    try {
      await signOut(auth);
      router.replace('/login' as any);
    } catch (error) {
      Alert.alert('Error', 'Could not log out.');
    }
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.topBarTitle}>SmartLife Assist</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.screenLabel}>Main Activity</Text>
          <View style={styles.userBar}>
            <Text style={styles.userText}>
              Logged in as: {userEmail || 'Checking...'}
            </Text>

            <Pressable style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutText}>LOGOUT</Text>
            </Pressable>
          </View>

          <View style={styles.taskCard}>
            {latestTask ? (
              <View style={styles.taskRow}>
                <View style={styles.checkCircle}>
                  <Text style={styles.checkMark}>✓</Text>
                </View>

                <View style={styles.taskTextContainer}>
                  <Text style={styles.taskLabel}>Latest Task</Text>
                  <Text style={styles.taskTime}>{latestTask.dueTime}</Text>
                  <Text style={styles.taskTitle}>{latestTask.title}</Text>
                  <Text style={styles.taskDate}>{latestTask.dueDate}</Text>
                </View>
              </View>
            ) : (
              <View>
                <Text style={styles.taskLabel}>Latest Task</Text>
                <Text style={styles.emptyState}>No tasks added yet.</Text>
              </View>
            )}
          </View>

          <View style={styles.middleButtons}>
            <Pressable style={styles.reminderButton} onPress={() => router.push('/reminder' as any)}>
              <Text style={styles.middleButtonTextWhite}>SET REMINDER</Text>
            </Pressable>

            <Pressable style={styles.aiButton} onPress={() => router.push('/ai-suggestions' as any)}>
              <Text style={styles.middleButtonTextWhite}>AI SUGGESTIONS</Text>
            </Pressable>

            <Pressable
              style={styles.detailsButton}
              onPress={() => latestTask && openTaskDetails(latestTask)}
            >
              <Text style={styles.middleButtonTextDark}>VIEW TASK DETAILS</Text>
            </Pressable>
          </View>

          <View style={styles.suggestionCard}>
            <Text style={styles.suggestionTitle}>AI Suggestion</Text>
            <Text style={styles.suggestionText}>
              Based on your schedule, consider starting the project report now to avoid
              last-minute rush.
            </Text>
          </View>

          <Text style={styles.listHeading}>Saved Tasks</Text>

          {tasks.length === 0 ? (
            <View style={styles.listCard}>
              <Text style={styles.emptyState}>No saved tasks available.</Text>
            </View>
          ) : (
            tasks.map((task) => (
              <Pressable key={task.id} style={styles.listCard} onPress={() => openTaskDetails(task)}>
                <Text style={styles.listTaskTitle}>{task.title}</Text>
                <Text style={styles.listTaskSub}>
                  {task.dueDate} • {task.dueTime}
                </Text>
              </Pressable>
            ))
          )}
        </ScrollView>

        <View style={styles.bottomNav}>
          <Pressable style={styles.bottomButtonGreen} onPress={() => router.push('/add-task')}>
            <Text style={styles.bottomButtonTextWhite}>ADD TASK</Text>
          </Pressable>

          <Pressable style={styles.bottomButtonRed} onPress={() => router.push('/emergency' as any)}>
            <Text style={styles.bottomButtonTextWhite}>EMERGENCY</Text>
          </Pressable>

          <Pressable style={styles.bottomButtonOutline} onPress={() => router.push('/settings')}>
            <Text style={styles.bottomButtonTextBlue}>SETTINGS</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const PURPLE = '#9C27B0';
const RED = '#FF4438';
const YELLOW = '#FFC107';
const GREEN = '#4CAF50';
const LIGHT_BG = '#F2F2F2';
const CARD_BG = '#F4EAF5';
const BLUE = '#1976D2';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: LIGHT_BG,
  },
  container: {
    flex: 1,
    backgroundColor: LIGHT_BG,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  topBar: {
    width: '100%',
    backgroundColor: PURPLE,
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  topBarTitle: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  screenLabel: {
    textAlign: 'center',
    color: '#666',
    fontSize: 13,
    marginTop: 12,
    marginBottom: 10,
  },
  taskCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    padding: 18,
    borderRadius: 4,
    elevation: 2,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  checkMark: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
  },
  taskTextContainer: {
    flex: 1,
  },
  taskLabel: {
    fontSize: 14,
    color: '#777',
    marginBottom: 4,
  },
  taskTime: {
    fontSize: 30,
    fontWeight: '700',
    color: '#111',
  },
  taskTitle: {
    fontSize: 16,
    color: '#222',
    marginTop: 4,
  },
  taskDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  emptyState: {
    fontSize: 16,
    color: '#444',
    marginTop: 6,
  },
  middleButtons: {
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 4,
    overflow: 'hidden',
  },
  reminderButton: {
    backgroundColor: RED,
    paddingVertical: 18,
    alignItems: 'center',
  },
  aiButton: {
    backgroundColor: PURPLE,
    paddingVertical: 18,
    alignItems: 'center',
  },
  detailsButton: {
    backgroundColor: YELLOW,
    paddingVertical: 18,
    alignItems: 'center',
  },
  middleButtonTextWhite: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  middleButtonTextDark: {
    color: '#222',
    fontWeight: '700',
    fontSize: 15,
  },
  suggestionCard: {
    backgroundColor: CARD_BG,
    marginHorizontal: 16,
    marginTop: 18,
    padding: 16,
    borderRadius: 4,
    elevation: 2,
  },
  suggestionTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  suggestionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#222',
  },
  listHeading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    marginTop: 18,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  listCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 14,
    borderRadius: 4,
    elevation: 1,
  },
  listTaskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  listTaskSub: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  bottomNav: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: '#d9d9d9',
    backgroundColor: LIGHT_BG,
  },
  bottomButtonGreen: {
    flex: 1,
    backgroundColor: GREEN,
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 4,
  },
  bottomButtonRed: {
    flex: 1,
    backgroundColor: '#E53935',
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 4,
  },
  bottomButtonOutline: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#90CAF9',
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 4,
  },
  bottomButtonTextWhite: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  bottomButtonTextBlue: {
    color: BLUE,
    fontSize: 14,
    fontWeight: '700',
  },


userBar: {
  backgroundColor: '#fff',
  marginHorizontal: 16,
  marginBottom: 12,
  padding: 12,
  borderRadius: 4,
  elevation: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
userText: {
  fontSize: 13,
  color: '#444',
  flex: 1,
},
logoutButton: {
  backgroundColor: '#E53935',
  paddingVertical: 8,
  paddingHorizontal: 12,
  borderRadius: 4,
},
logoutText: {
  color: '#fff',
  fontSize: 12,
  fontWeight: '700',
},

});