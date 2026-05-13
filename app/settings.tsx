import { View, Text, StyleSheet, Pressable, Switch, Alert } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '../contexts/AppContext';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { clearUserSession } from '../services/storage';
import { useEffect, useState } from 'react';
import { getBatteryInfo } from '../services/batteryService';

export default function SettingsScreen() {
  const {
    user,
    darkMode,
    largeText,
    setDarkMode,
    setLargeText,
  } = useAppContext();
  useEffect(() => {
    async function loadBatteryInfo() {
      try {
        const batteryInfo = await getBatteryInfo();

        setBatteryPercentage(batteryInfo.percentage);
        setIsCharging(batteryInfo.isCharging);
      } catch (error) {
        console.log('Battery info error:', error);
      }
    }

    loadBatteryInfo();
  }, []);
  async function handleLogout() {
    try {

      await clearUserSession();
      await signOut(auth);
      router.replace('/login' as any);
    } catch (error) {
      Alert.alert('Logout Error', 'Could not log out.');
    }
  }

  const pageBackground = darkMode ? '#121212' : LIGHT_BG;
  const cardBackground = darkMode ? '#1E1E1E' : '#fff';
  const primaryText = darkMode ? '#fff' : '#222';
  const secondaryText = darkMode ? '#ccc' : '#666';
  const [batteryPercentage, setBatteryPercentage] = useState(0);
  const [isCharging, setIsCharging] = useState(false);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: pageBackground }]}>
      <View style={[styles.container, { backgroundColor: pageBackground }]}>
        <View style={styles.topBar}>
          <Text style={styles.topBarTitle}>Settings</Text>
        </View>

        <View style={styles.content}>
          <View style={[styles.card, { backgroundColor: cardBackground }]}>
            <Text style={[styles.cardTitle, { color: primaryText }]}>
              Profile
            </Text>

            <Text
              style={[
                styles.name,
                {
                  color: primaryText,
                  fontSize: largeText ? 20 : 17,
                },
              ]}
            >
              {user?.email?.split('@')[0] || 'User'}
            </Text>

            <Text style={[styles.email, { color: secondaryText }]}>
              {user?.email || 'No email available'}
            </Text>
          </View>

          <View style={[styles.card, { backgroundColor: cardBackground }]}>
            <View style={styles.optionRow}>
              <View>
                <Text
                  style={[
                    styles.optionTitle,
                    {
                      color: primaryText,
                      fontSize: largeText ? 18 : 16,
                    },
                  ]}
                >
                  Dark Mode
                </Text>

                <Text style={[styles.optionSub, { color: secondaryText }]}>
                  {darkMode ? 'Dark mode enabled' : 'Dark mode disabled'}
                </Text>
              </View>

              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
              />
            </View>
          </View>

          <View style={[styles.card, { backgroundColor: cardBackground }]}>
            <View style={styles.optionRow}>
              <View>
                <Text
                  style={[
                    styles.optionTitle,
                    {
                      color: primaryText,
                      fontSize: largeText ? 18 : 16,
                    },
                  ]}
                >
                  Large Text
                </Text>

                <Text style={[styles.optionSub, { color: secondaryText }]}>
                  {largeText ? 'Large text enabled' : 'Large text disabled'}
                </Text>
              </View>

              <Switch
                value={largeText}
                onValueChange={setLargeText}
              />
            </View>
          </View>
          <View style={[styles.card, { backgroundColor: cardBackground }]}>
            <Text
              style={[
                styles.cardTitle,
                {
                  color: primaryText,
                  fontSize: largeText ? 20 : 18,
                },
              ]}
            >
              Battery Status
            </Text>

            <Text
              style={[
                styles.name,
                {
                  color: primaryText,
                  fontSize: largeText ? 18 : 16,
                },
              ]}
            >
              Battery: {batteryPercentage}%
            </Text>

            <Text style={[styles.email, { color: secondaryText }]}>
              {isCharging ? 'Device is charging' : 'Device is not charging'}
            </Text>

            {batteryPercentage <= 20 && (
              <Text
                style={{
                  color: '#E53935',
                  marginTop: 10,
                  fontWeight: '700',
                }}
              >
                Low battery detected.
              </Text>
            )}
          </View>
          <Pressable
            style={[styles.locationButton, { backgroundColor: cardBackground }]}
            onPress={() => router.push('/motion-sensor' as any)}
          >
            <Text style={styles.locationButtonText}>
              MOTION SENSOR
            </Text>
          </Pressable>
          <Pressable
            style={[styles.locationButton, { backgroundColor: cardBackground }]}
            onPress={() => router.push('/parallel-tasks' as any)}
          >
            <Text style={styles.locationButtonText}>
              PARALLEL PROCESSING
            </Text>
          </Pressable>
          <Pressable
            style={[styles.locationButton, { backgroundColor: cardBackground }]}
            onPress={() => router.push('/background-task' as any)}
          >
            <Text style={styles.locationButtonText}>
              WORK MANAGER
            </Text>
          </Pressable>
          <Pressable
            style={[styles.locationButton, { backgroundColor: cardBackground }]}
            onPress={() => router.push('/location-settings' as any)}
          >
            <Text style={styles.locationButtonText}>
              LOCATION SETTINGS
            </Text>
          </Pressable>

          <Pressable
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.logoutButtonText}>LOG OUT</Text>
          </Pressable>
        </View>

        <View style={styles.bottomArea}>
          <Pressable
            style={styles.saveButton}
            onPress={() => router.back()}
          >
            <Text style={styles.saveButtonText}>SAVE</Text>
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
const BLUE = '#1976D2';

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
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: '#222',
  },
  name: {
    fontSize: 17,
    color: '#222',
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  optionSub: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  locationButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#90CAF9',
    borderRadius: 4,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 14,
  },
  locationButtonText: {
    color: BLUE,
    fontSize: 14,
    fontWeight: '700',
  },
  logoutButton: {
    backgroundColor: RED,
    borderRadius: 4,
    paddingVertical: 16,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  bottomArea: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: '#d9d9d9',
  },
  saveButton: {
    backgroundColor: GREEN,
    paddingVertical: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});