import AsyncStorage from '@react-native-async-storage/async-storage';
import { EmergencyContact } from '../types/contact';

const CONTACTS_KEY = 'smartlife_emergency_contacts';

export async function saveEmergencyContacts(contacts: EmergencyContact[]) {
  await AsyncStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
}

export async function loadEmergencyContacts(): Promise<EmergencyContact[]> {
  const data = await AsyncStorage.getItem(CONTACTS_KEY);
  return data ? JSON.parse(data) : [];
}