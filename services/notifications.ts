import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function requestNotificationPermission() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('smartlife-reminders', {
      name: 'SmartLife Reminders',
      importance: Notifications.AndroidImportance.HIGH,
      sound: 'default',
    });
  }

  const permission = await Notifications.requestPermissionsAsync();

  return true;
}

export async function scheduleBasicNotification(title: string, body: string) {
  const hasPermission = await requestNotificationPermission();

  if (!hasPermission) {
    throw new Error('Notification permission was not granted.');
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: 'default',
    },
    trigger: {
      seconds: 5,
      channelId: 'smartlife-reminders',
    } as any,
  });
}