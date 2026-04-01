import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MainScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.topBarTitle}>SmartLife Assist</Text>
        </View>

        <Text style={styles.screenLabel}>Main Activity</Text>

        <View style={styles.content}>
          <View style={styles.taskCard}>
            <View style={styles.taskRow}>
              <View style={styles.checkCircle}>
                <Text style={styles.checkMark}>✓</Text>
              </View>

              <View style={styles.taskTextContainer}>
                <Text style={styles.taskLabel}>Next Task</Text>
                <Text style={styles.taskTime}>05:30PM</Text>
                <Text style={styles.taskTitle}>Complete project report</Text>
              </View>
            </View>
          </View>

          <View style={styles.middleButtons}>
            <Pressable style={styles.reminderButton}>
              <Text style={styles.middleButtonTextWhite}>SET REMINDER</Text>
            </Pressable>

            <Pressable style={styles.aiButton}>
              <Text style={styles.middleButtonTextWhite}>AI SUGGESTIONS</Text>
            </Pressable>

            <Pressable style={styles.detailsButton}>
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
        </View>

        <View style={styles.bottomNav}>
          <Pressable
            style={styles.bottomButtonGreen}
            onPress={() => router.push('/add-task')}
          >
            <Text style={styles.bottomButtonTextWhite}>ADD TASK</Text>
          </Pressable>

          <Pressable style={styles.bottomButtonRed}>
            <Text style={styles.bottomButtonTextWhite}>EMERGENCY</Text>
          </Pressable>

          <Pressable
            style={styles.bottomButtonOutline}
            onPress={() => router.push('/settings')}
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
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  taskCard: {
    backgroundColor: '#fff',
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
  middleButtons: {
    marginTop: 16,
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
});