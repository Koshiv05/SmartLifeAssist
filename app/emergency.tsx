import { View, Text, StyleSheet, Pressable, Alert, ScrollView, Share } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { CurrentLocation, getCurrentLocation } from '../services/locationService';
import { loadEmergencyContacts } from '../services/contactStorage';
import { EmergencyContact } from '../types/contact';

export default function EmergencyScreen() {
  const [emergencyLocation, setEmergencyLocation] = useState<CurrentLocation | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<EmergencyContact[]>([]);
  const [preparedMessage, setPreparedMessage] = useState('');

  async function handleAlert() {
    try {
      setIsLoadingLocation(true);

      const location = await getCurrentLocation();
      const contacts = await loadEmergencyContacts();
      const enabledContacts = contacts.filter((contact) => contact.selected);

      const message =
        `EMERGENCY ALERT\n\n` +
        `I need emergency assistance.\n\n` +
        `Current Location:\n${location.address}\n\n` +
        `Please contact me as soon as possible.`;

      setEmergencyLocation(location);
      setSelectedContacts(enabledContacts);
      setPreparedMessage(message);

      Alert.alert(
        'Emergency Alert Prepared',
        `Emergency alert prepared for ${enabledContacts.length} selected contact(s).`
      );
    } catch (error: any) {
      Alert.alert(
        'Location Error',
        error.message || 'Could not prepare emergency alert.'
      );
    } finally {
      setIsLoadingLocation(false);
    }
  }

  async function handleShareAlert() {
    if (!preparedMessage) {
      Alert.alert('No alert prepared', 'Please press Send Alert first.');
      return;
    }

    await Share.share({
      message: preparedMessage,
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topBarRed}>
          <Text style={styles.topBarTitle}>Emergency</Text>
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Pressable style={styles.alertCard} onPress={handleAlert}>
            <Text style={styles.alertIcon}>!</Text>
            <Text style={styles.alertText}>
              {isLoadingLocation ? 'GETTING LOCATION...' : 'SEND ALERT'}
            </Text>
          </Pressable>

          <View style={styles.infoCard}>
            <Text style={styles.infoText}>
              Your current location will be prepared for sharing with selected contacts.
            </Text>
          </View>

          {emergencyLocation && (
            <View style={styles.locationCard}>
              <Text style={styles.locationTitle}>Emergency Location</Text>
              <Text style={styles.locationText}>{emergencyLocation.address}</Text>
            </View>
          )}

          {selectedContacts.length > 0 && (
            <View style={styles.contactsCard}>
              <Text style={styles.contactsTitle}>Selected Emergency Contacts</Text>

              {selectedContacts.map((contact) => (
                <Text key={contact.id} style={styles.contactItem}>
                  • {contact.name} ({contact.phone})
                </Text>
              ))}
            </View>
          )}

          {preparedMessage ? (
            <View style={styles.messageCard}>
              <Text style={styles.messageTitle}>Prepared Emergency Message</Text>

              <Text style={styles.messageText}>{preparedMessage}</Text>

              <Pressable style={styles.shareButton} onPress={handleShareAlert}>
                <Text style={styles.shareButtonText}>SHARE ALERT</Text>
              </Pressable>
            </View>
          ) : null}

          <Pressable
            style={styles.manageButton}
            onPress={() => router.push('/contact-picker' as any)}
          >
            <Text style={styles.manageButtonText}>MANAGE EMERGENCY CONTACTS</Text>
          </Pressable>
        </ScrollView>

        <View style={styles.bottomButtons}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>BACK TO DASHBOARD</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const RED = '#FF4438';
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
  topBarRed: {
    width: '100%',
    backgroundColor: RED,
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
  scrollContent: {
    paddingBottom: 40,
  },
  alertCard: {
    backgroundColor: RED,
    borderRadius: 4,
    paddingVertical: 34,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  alertIcon: {
    fontSize: 44,
    color: '#fff',
    fontWeight: '700',
    marginBottom: 10,
  },
  alertText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '700',
  },
  infoCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    elevation: 2,
  },
  infoText: {
    fontSize: 15,
    color: '#222',
    textAlign: 'center',
    lineHeight: 22,
  },
  locationCard: {
    backgroundColor: '#fff',
    marginTop: 16,
    padding: 16,
    borderRadius: 4,
    elevation: 2,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },
  contactsCard: {
    backgroundColor: '#fff',
    marginTop: 16,
    padding: 16,
    borderRadius: 4,
    elevation: 2,
  },
  contactsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    marginBottom: 10,
  },
  contactItem: {
    fontSize: 14,
    color: '#444',
    marginTop: 6,
  },
  messageCard: {
    backgroundColor: '#fff',
    marginTop: 16,
    padding: 16,
    borderRadius: 4,
    elevation: 2,
  },
  messageTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    marginBottom: 10,
  },
  messageText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
  },
  shareButton: {
    marginTop: 16,
    backgroundColor: '#1976D2',
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  manageButton: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#90CAF9',
    borderRadius: 4,
    paddingVertical: 16,
    alignItems: 'center',
  },
  manageButtonText: {
    color: '#1976D2',
    fontSize: 14,
    fontWeight: '700',
  },
  bottomButtons: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: '#d9d9d9',
  },
  backButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#90CAF9',
    paddingVertical: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#1976D2',
    fontSize: 14,
    fontWeight: '700',
  },
});