import { Stack } from 'expo-router';
import { AppProvider } from '../contexts/AppContext';

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index"/>
        <Stack.Screen name="add-task"/>
        <Stack.Screen name="settings"/>
        <Stack.Screen name="reminder"/>
        <Stack.Screen name="task-details"/>
        <Stack.Screen name="ai-suggestions"/>
        <Stack.Screen name="emergency"/>
        <Stack.Screen name="contact-picker"/>
        <Stack.Screen name="location-settings"/>
        <Stack.Screen name="login"/>
        <Stack.Screen name="signup"/>
        <Stack.Screen name="edit-task"/>
        <Stack.Screen name="motion-sensor"/>
        <Stack.Screen name="parallel-tasks"/>
        <Stack.Screen name="background-task"/>
        <Stack.Screen name="admob-demo"/>
      </Stack>
    </AppProvider>
  );
}