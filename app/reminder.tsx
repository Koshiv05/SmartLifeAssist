import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';

import { router } from 'expo-router';

import { SafeAreaView } from 'react-native-safe-area-context';

import { scheduleBasicNotification } from '../services/notifications';

export default function ReminderScreen() {
  // Schedules a local notification to appear after 5 seconds
  async function handleReminder() {
    try {
      await scheduleBasicNotification(
        'SmartLife Assist Reminder',
        'This is your scheduled task reminder.'
      );

      Alert.alert(
        'Reminder Scheduled',
        'Notification will appear in 5 seconds.'
      );
    } catch (error) {
      Alert.alert(
        'Notification Error',
        'Could not schedule notification.'
      );
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Reminder</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.text}>
          Press the button below to schedule a local notification reminder.
        </Text>

        <Pressable
          style={styles.reminderButton}
          onPress={handleReminder}
        >
          <Text style={styles.reminderButtonText}>
            SET REMINDER
          </Text>
        </Pressable>

        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>BACK</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const PURPLE = '#9C27B0';
const GREEN = '#4CAF50';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },

  topBar: {
    backgroundColor: PURPLE,
    padding: 18,
  },

  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#222',
    lineHeight: 24,
  },

  reminderButton: {
    backgroundColor: GREEN,
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 6,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },

  reminderButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },

  backButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#999',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 6,
    width: '100%',
    alignItems: 'center',
  },

  backButtonText: {
    color: '#222',
    fontWeight: '700',
    fontSize: 15,
  },
});