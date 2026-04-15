import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="add-task" options={{ headerShown: false }} />
      <Stack.Screen name="settings" options={{ headerShown: false }} />
      <Stack.Screen name="reminder" options={{ headerShown: false }} />
      <Stack.Screen name="task-details" options={{ headerShown: false }} />
    </Stack>
  );
}