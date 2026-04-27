import { View, Text, StyleSheet, Pressable, Switch } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function ContactPickerScreen() {
  const [john, setJohn] = useState(true);
  const [sarah, setSarah] = useState(true);
  const [michael, setMichael] = useState(false);
  const [emily, setEmily] = useState(false);
  const [david, setDavid] = useState(false);

  const contacts = [
    { name: 'John Smith', phone: '(555) 123-4567', selected: john, setSelected: setJohn },
    { name: 'Sarah Johnson', phone: '(555) 234-5678', selected: sarah, setSelected: setSarah },
    { name: 'Michael Brown', phone: '(555) 345-6789', selected: michael, setSelected: setMichael },
    { name: 'Emily Davis', phone: '(555) 456-7890', selected: emily, setSelected: setEmily },
    { name: 'David Wilson', phone: '(555) 567-8901', selected: david, setSelected: setDavid },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.topBarTitle}>Select Contacts</Text>
        </View>

        <View style={styles.content}>
          {contacts.map((contact) => (
            <View key={contact.name} style={styles.contactRow}>
              <View style={styles.contactTextArea}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactPhone}>{contact.phone}</Text>
              </View>
              <Switch value={contact.selected} onValueChange={contact.setSelected} />
            </View>
          ))}
        </View>

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
  content: { flex: 1, paddingTop: 10 },
  contactRow: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contactTextArea: {
    flex: 1,
    marginRight: 12,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  contactPhone: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
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