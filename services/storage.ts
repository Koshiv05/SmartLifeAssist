import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types/task';

const TASKS_KEY = 'smartlife_tasks';

export async function saveTasks(tasks: Task[]) {
  try {
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks:', error);
    throw error;
  }
}

export async function loadTasks(): Promise<Task[]> {
  try {
    const data = await AsyncStorage.getItem(TASKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading tasks:', error);
    return [];
  }
}

const USER_SESSION_KEY = 'smartlife_user_session';

export async function saveUserSession(email: string) {
  try {
    await AsyncStorage.setItem(USER_SESSION_KEY, email);
  } catch (error) {
    console.error('Error saving user session:', error);
  }
}

export async function loadUserSession(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(USER_SESSION_KEY);
  } catch (error) {
    console.error('Error loading user session:', error);
    return null;
  }
}

export async function clearUserSession() {
  try {
    await AsyncStorage.removeItem(USER_SESSION_KEY);
  } catch (error) {
    console.error('Error clearing user session:', error);
  }
}