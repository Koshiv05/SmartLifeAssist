import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EmergencyScreen() {
  function handleAlert() {
    Alert.alert('Emergency Alert', 'Emergency alert action triggered.');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topBarRed}>
          <Text style={styles.topBarTitle}>Emergency</Text>
        </View>

        <View style={styles.content}>
          <Pressable style={styles.alertCard} onPress={handleAlert}>
            <Text style={styles.alertIcon}>!</Text>
            <Text style={styles.alertText}>SEND ALERT</Text>
          </Pressable>

          <View style={styles.infoCard}>
            <Text style={styles.infoText}>
              Your location will be shared with selected contacts
            </Text>
          </View>

          <Pressable
            style={styles.manageButton}
            onPress={() => router.push('/contact-picker' as any)}
          >
            <Text style={styles.manageButtonText}>MANAGE EMERGENCY CONTACTS</Text>
          </Pressable>
        </View>

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
  safeArea: { flex: 1, backgroundColor: LIGHT_BG },
  container: { flex: 1, backgroundColor: LIGHT_BG },
  topBarRed: {
    width: '100%',
    backgroundColor: RED,
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  topBarTitle: { color: '#fff', fontSize: 18, fontWeight: '600' },
  content: { flex: 1, padding: 16 },
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
    marginTop: 0,
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