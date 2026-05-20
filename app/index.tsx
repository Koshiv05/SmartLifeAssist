import { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';

import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Task } from '../types/task';

import { useAppContext } from '../contexts/AppContext';

import { loadUserSession } from '../services/storage';
import { generateTaskSuggestion } from '../services/aiService';

export default function MainScreen() {
  const { user, tasks, darkMode, largeText } = useAppContext();

  const [checkingSession, setCheckingSession] = useState(true);
  const [homeAiSuggestion, setHomeAiSuggestion] = useState(
    'Add a task to receive an AI suggestion.'
  );

  // Check if user session already exists when app loads
  useEffect(() => {
    async function checkSession() {
      const savedSession = await loadUserSession();

      if (!savedSession) {
        router.replace('/login' as any);
        return;
      }

      setCheckingSession(false);
    }

    checkSession();
  }, []);

  // Load AI suggestion based on latest task
  const sortedTasks = [...tasks].sort((a: any, b: any) => {
    return (b.createdAtMs || 0) - (a.createdAtMs || 0);
  });

  const latestTask = sortedTasks.length > 0 ? sortedTasks[0] : null;

  // Load AI suggestion based on latest task
  useEffect(() => {
    async function loadHomeAiSuggestion() {
      if (!latestTask) {
        setHomeAiSuggestion('Add a task to receive an AI suggestion.');
        return;
      }

      const suggestion = await generateTaskSuggestion(latestTask.title);
      setHomeAiSuggestion(suggestion);
    }

    loadHomeAiSuggestion();
  }, [latestTask]);

  if (checkingSession) {
    return null;
  }

  // Open selected task details screen
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

  const pageBackground = darkMode ? '#121212' : LIGHT_BG;
  const cardBackground = darkMode ? '#1E1E1E' : '#fff';
  const primaryText = darkMode ? '#fff' : '#222';
  const secondaryText = darkMode ? '#ccc' : '#666';
  const bodyFontSize = largeText ? 18 : 16;

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: pageBackground }]}
      edges={['top', 'left', 'right', 'bottom']}
    >
      <View style={[styles.container, { backgroundColor: pageBackground }]}>
        <View style={styles.topBar}>
          <Text style={styles.topBarTitle}>SmartLife Assist</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={[styles.userBar, { backgroundColor: cardBackground }]}>
            <Text
              style={[
                styles.userText,
                { color: secondaryText, fontSize: largeText ? 15 : 13 },
              ]}
            >
              Logged in as: {user?.email || 'Saved session active'}
            </Text>
          </View>

          <View style={[styles.taskCard, { backgroundColor: cardBackground }]}>
            {latestTask ? (
              <View style={styles.taskRow}>
                <View style={styles.checkCircle}>
                  <Text style={styles.checkMark}>✓</Text>
                </View>

                <View style={styles.taskTextContainer}>
                  <Text style={[styles.taskLabel, { color: secondaryText }]}>
                    Latest Task
                  </Text>

                  <Text style={[styles.taskTime, { color: primaryText }]}>
                    {latestTask.dueTime}
                  </Text>

                  <Text
                    style={[
                      styles.taskTitle,
                      {
                        color: primaryText,
                        fontSize: largeText ? 18 : 16,
                      },
                    ]}
                  >
                    {latestTask.title}
                  </Text>

                  <Text style={[styles.taskDate, { color: secondaryText }]}>
                    {latestTask.dueDate}
                  </Text>
                </View>
              </View>
            ) : (
              <View>
                <Text style={[styles.taskLabel, { color: secondaryText }]}>
                  Latest Task
                </Text>

                <Text
                  style={[
                    styles.emptyState,
                    { color: primaryText, fontSize: bodyFontSize },
                  ]}
                >
                  No tasks added yet.
                </Text>
              </View>
            )}
          </View>

          <View style={styles.middleButtons}>
            <Pressable
              style={styles.reminderButton}
              onPress={() => router.push('/reminder' as any)}
            >
              <Text style={styles.middleButtonTextWhite}>SET REMINDER</Text>
            </Pressable>

            <Pressable
              style={styles.aiButton}
              onPress={() => router.push('/ai-suggestions' as any)}
            >
              <Text style={styles.middleButtonTextWhite}>AI SUGGESTIONS</Text>
            </Pressable>

            <Pressable
              style={styles.detailsButton}
              onPress={() => latestTask && openTaskDetails(latestTask)}
            >
              <Text style={styles.middleButtonTextDark}>
                VIEW TASK DETAILS
              </Text>
            </Pressable>
          </View>

          <View
            style={[
              styles.suggestionCard,
              { backgroundColor: darkMode ? '#2A1F2D' : CARD_BG },
            ]}
          >
            <Text style={[styles.suggestionTitle, { color: secondaryText }]}>
              AI Suggestion
            </Text>

            <Text
              style={[
                styles.suggestionText,
                { color: primaryText, fontSize: bodyFontSize },
              ]}
            >
              {homeAiSuggestion}
            </Text>
          </View>

          <Text style={[styles.listHeading, { color: primaryText }]}>
            Saved Tasks
          </Text>

          {tasks.length === 0 ? (
            <View style={[styles.listCard, { backgroundColor: cardBackground }]}>
              <Text
                style={[
                  styles.emptyState,
                  { color: primaryText, fontSize: bodyFontSize },
                ]}
              >
                No saved tasks available.
              </Text>
            </View>
          ) : (
            sortedTasks.map((task) => (
              <Pressable
                key={task.id}
                style={[styles.listCard, { backgroundColor: cardBackground }]}
                onPress={() => openTaskDetails(task)}
              >
                <Text
                  style={[
                    styles.listTaskTitle,
                    { color: primaryText, fontSize: bodyFontSize },
                  ]}
                >
                  {task.title}
                </Text>

                <Text style={[styles.listTaskSub, { color: secondaryText }]}>
                  {task.dueDate} • {task.dueTime}
                </Text>
              </Pressable>
            ))
          )}
        </ScrollView>

        <View style={[styles.bottomNav, { backgroundColor: pageBackground }]}>
          <Pressable
            style={styles.bottomButtonGreen}
            onPress={() => router.push('/add-task' as any)}
          >
            <Text style={styles.bottomButtonTextWhite}>ADD TASK</Text>
          </Pressable>

          <Pressable
            style={styles.bottomButtonRed}
            onPress={() => router.push('/emergency' as any)}
          >
            <Text style={styles.bottomButtonTextWhite}>EMERGENCY</Text>
          </Pressable>

          <Pressable
            style={styles.bottomButtonOutline}
            onPress={() => router.push('/settings' as any)}
          >
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
  safeArea: { flex: 1, backgroundColor: LIGHT_BG },
  container: { flex: 1, backgroundColor: LIGHT_BG },
  scrollContent: { paddingTop: 12, paddingBottom: 20 },

  topBar: {
    width: '100%',
    backgroundColor: PURPLE,
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  topBarTitle: { color: '#fff', fontSize: 17, fontWeight: '600' },

  userBar: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 12,
    borderRadius: 4,
    elevation: 1,
  },
  userText: { fontSize: 13, color: '#444' },

  taskCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    padding: 18,
    borderRadius: 4,
    elevation: 2,
  },
  taskRow: { flexDirection: 'row', alignItems: 'center' },
  checkCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  checkMark: { color: '#fff', fontSize: 28, fontWeight: '700' },
  taskTextContainer: { flex: 1 },
  taskLabel: { fontSize: 14, color: '#777', marginBottom: 4 },
  taskTime: { fontSize: 30, fontWeight: '700', color: '#111' },
  taskTitle: { fontSize: 16, color: '#222', marginTop: 4 },
  taskDate: { fontSize: 14, color: '#666', marginTop: 4 },
  emptyState: { fontSize: 16, color: '#444', marginTop: 6 },

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
  bottomButtonTextWhite: { color: '#fff', fontSize: 14, fontWeight: '700' },
  bottomButtonTextBlue: { color: BLUE, fontSize: 14, fontWeight: '700' },
});