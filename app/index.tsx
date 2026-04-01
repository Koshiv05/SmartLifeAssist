import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function MainScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>SmartLife Assist</Text>
      </View>

      <Text style={styles.screenLabel}>Main Activity</Text>

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

      <View style={styles.bottomNav}>
        <Pressable style={styles.bottomButtonGreen} onPress={() => router.push('/add-task')}>
          <Text style={styles.bottomButtonTextWhite}>ADD TASK</Text>
        </Pressable>

        <Pressable style={styles.bottomButtonRed}>
          <Text style={styles.bottomButtonTextWhite}>EMERGENCY</Text>
        </Pressable>

        <Pressable style={styles.bottomButtonOutline} onPress={() => router.push('/settings')}>
          <Text style={styles.bottomButtonTextBlue}>SETTINGS</Text>
        </Pressable>
      </View>
    </View>
  );
}

const PURPLE = '#9C27B0';
const RED = '#FF4438';
const YELLOW = '#FFC107';
const GREEN = '#4CAF50';
const LIGHT_BG = '#F2F2F2';
const CARD_BG = '#F7EEF8';
const BLUE = '#1976D2';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT_BG,
    paddingBottom: 20,
  },
  topBar: {
    backgroundColor: PURPLE,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginTop: 18,
    marginHorizontal: 16,
    elevation: 3,
  },
  topBarTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  screenLabel: {
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 6,
    color: '#666',
    fontSize: 13,
  },
  taskCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    borderRadius: 3,
    elevation: 2,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  checkMark: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  taskTextContainer: {
    flex: 1,
  },
  taskLabel: {
    fontSize: 13,
    color: '#777',
    marginBottom: 4,
  },
  taskTime: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111',
  },
  taskTitle: {
    fontSize: 15,
    color: '#222',
    marginTop: 4,
  },
  middleButtons: {
    marginTop: 14,
    marginHorizontal: 16,
  },
  reminderButton: {
    backgroundColor: RED,
    paddingVertical: 14,
    alignItems: 'center',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  aiButton: {
    backgroundColor: PURPLE,
    paddingVertical: 14,
    alignItems: 'center',
  },
  detailsButton: {
    backgroundColor: YELLOW,
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  middleButtonTextWhite: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  middleButtonTextDark: {
    color: '#222',
    fontWeight: '700',
    fontSize: 14,
  },
  suggestionCard: {
    backgroundColor: CARD_BG,
    marginHorizontal: 16,
    marginTop: 18,
    padding: 14,
    borderRadius: 3,
    elevation: 2,
  },
  suggestionTitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  suggestionText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#222',
  },
  bottomNav: {
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginHorizontal: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  bottomButtonGreen: {
    flex: 1,
    backgroundColor: GREEN,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 3,
  },
  bottomButtonRed: {
    flex: 1,
    backgroundColor: '#E53935',
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 3,
  },
  bottomButtonOutline: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#90CAF9',
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 3,
  },
  bottomButtonTextWhite: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  bottomButtonTextBlue: {
    color: BLUE,
    fontSize: 13,
    fontWeight: '700',
  },
});