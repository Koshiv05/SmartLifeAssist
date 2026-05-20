import { useCallback, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Switch,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';

import { router, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmergencyContact } from '../types/contact';

import {
  loadEmergencyContacts,
  saveEmergencyContacts,
} from '../services/contactStorage';

export default function ContactPickerScreen() {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // Load saved contacts whenever the screen becomes active
  useFocusEffect(
    useCallback(() => {
      async function fetchContacts() {
        const savedContacts = await loadEmergencyContacts();
        setContacts(savedContacts);
      }

      fetchContacts();
    }, [])
  );

  async function handleAddContact() {
    if (!name.trim() || !phone.trim()) {
      Alert.alert('Missing information', 'Please enter both contact name and phone number.');
      return;
    }

    const newContact: EmergencyContact = {
      id: Date.now().toString(),
      name: name.trim(),
      phone: phone.trim(),
      selected: true,
    };

    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);
    await saveEmergencyContacts(updatedContacts);

    setName('');
    setPhone('');

    Alert.alert('Contact added', 'Emergency contact has been added successfully.');
  }

  // Toggle contact selection for emergency alerts
  async function handleToggleContact(contactId: string) {
    const updatedContacts = contacts.map((contact) =>
      contact.id === contactId
        ? { ...contact, selected: !contact.selected }
        : contact
    );

    setContacts(updatedContacts);
    // Save updated contact list locally
    await saveEmergencyContacts(updatedContacts);
  }

  async function handleDeleteContact(contactId: string) {
    const updatedContacts = contacts.filter((contact) => contact.id !== contactId);

    setContacts(updatedContacts);
    await saveEmergencyContacts(updatedContacts);

    Alert.alert('Contact deleted', 'Emergency contact has been removed.');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.topBarTitle}>Select Contacts</Text>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>Add Emergency Contact</Text>

            <TextInput
              style={styles.input}
              placeholder="Contact name"
              placeholderTextColor="#666"
              value={name}
              onChangeText={setName}
            />

            <TextInput
              style={styles.input}
              placeholder="Phone number"
              placeholderTextColor="#666"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />

            <Pressable style={styles.addButton} onPress={handleAddContact}>
              <Text style={styles.addButtonText}>ADD CONTACT</Text>
            </Pressable>
          </View>

          <Text style={styles.sectionTitle}>Saved Emergency Contacts</Text>

          {contacts.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>No emergency contacts added yet.</Text>
            </View>
          ) : (
            contacts.map((contact) => (
              <View key={contact.id} style={styles.contactRow}>
                <View style={styles.contactTextArea}>
                  <Text style={styles.contactName}>{contact.name}</Text>
                  <Text style={styles.contactPhone}>{contact.phone}</Text>
                  <Text style={styles.contactStatus}>
                    {contact.selected ? 'Selected for alerts' : 'Not selected'}
                  </Text>
                </View>

                <View style={styles.actionArea}>
                  <Switch
                    value={contact.selected}
                    onValueChange={() => handleToggleContact(contact.id)}
                  />

                  <Pressable
                    style={styles.deleteButton}
                    onPress={() => handleDeleteContact(contact.id)}
                  >
                    <Text style={styles.deleteButtonText}>DELETE</Text>
                  </Pressable>
                </View>
              </View>
            ))
          )}
        </ScrollView>

        <View style={styles.bottomButtons}>
          <Pressable style={styles.saveButton} onPress={() => router.back()}>
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
  safeArea: { flex: 1, backgroundColor: LIGHT_BG },
  container: { flex: 1, backgroundColor: LIGHT_BG },
  topBar: {
    width: '100%',
    backgroundColor: PURPLE,
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  topBarTitle: { color: '#fff', fontSize: 18, fontWeight: '600' },
  content: {
    padding: 16,
    paddingBottom: 24,
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 16,
    marginBottom: 18,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#bdbdbd',
    borderRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: GREEN,
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  emptyCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 4,
    elevation: 1,
  },
  emptyText: {
    fontSize: 15,
    color: '#444',
  },
  contactRow: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 4,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
  },
  contactTextArea: {
    flex: 1,
    marginRight: 12,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
  },
  contactPhone: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  contactStatus: {
    fontSize: 12,
    color: '#444',
    marginTop: 6,
  },
  actionArea: {
    alignItems: 'center',
    gap: 8,
  },
  deleteButton: {
    backgroundColor: RED,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  bottomButtons: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: '#d9d9d9',
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