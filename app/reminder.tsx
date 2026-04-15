import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scheduleBasicNotification, requestNotificationPermission } from '../services/notifications';

export default function ReminderScreen() {
  async function handleReminder() {
    const granted = await requestNotificationPermission();

    if (!granted) {
      Alert.alert('Permission denied', 'Notification permission is required.');
      return;
    }

    await scheduleBasicNotification(
      'Task Reminder',
      'Do not forget your upcoming SmartLife Assist task.'
    );

    Alert.alert('Reminder set', 'A local notification has been scheduled.');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.topBarTitle}>Set Reminder</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionLabel}>Options</Text>

          <Pressable style={styles.optionCard} onPress={handleReminder}>
            <Text style={styles.optionText}>Time-based reminder</Text>
          </Pressable>

          <Pressable style={styles.optionCard}>
            <Text style={styles.optionText}>Location-based reminder</Text>
          </Pressable>
        </View>

        <View style={styles.bottomButtons}>
          <Pressable style={styles.saveButton} onPress={handleReminder}>
            <Text style={styles.buttonText}>SAVE</Text>
          </Pressable>

          <Pressable style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.buttonText}>CANCEL</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const PURPLE = '#9C27B0';
const GREEN = '#4CAF50';
const RED = '#E53935';
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
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  optionCard: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 18,
    marginBottom: 14,
    elevation: 2,
  },
  optionText: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
  },
  bottomButtons: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: '#d9d9d9',
    backgroundColor: LIGHT_BG,
  },
  saveButton: {
    flex: 1,
    backgroundColor: GREEN,
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 4,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: RED,
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});