import { View, Text, StyleSheet, Pressable, Switch } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [largeText, setLargeText] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.topBarTitle}>Settings</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Profile</Text>
            <Text style={styles.name}>John Doe</Text>
            <Text style={styles.email}>john.doe@email.com</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.optionRow}>
              <View>
                <Text style={styles.optionTitle}>Dark Mode</Text>
                <Text style={styles.optionSub}>
                  {darkMode ? 'Dark mode enabled' : 'Dark mode disabled'}
                </Text>
              </View>
              <Switch value={darkMode} onValueChange={setDarkMode} />
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.optionRow}>
              <View>
                <Text style={styles.optionTitle}>Large Text</Text>
                <Text style={styles.optionSub}>
                  {largeText ? 'Large text enabled' : 'Large text disabled'}
                </Text>
              </View>
              <Switch value={largeText} onValueChange={setLargeText} />
            </View>
          </View>

          <Pressable style={styles.locationButton}>
            <Text style={styles.locationButtonText}>LOCATION SETTINGS</Text>
          </Pressable>
        </View>

        <View style={styles.bottomArea}>
          <Pressable style={styles.saveButton} onPress={() => router.back()}>
            <Text style={styles.saveButtonText}>SAVE</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const PURPLE = '#9C27B0';
const GREEN = '#4CAF50';
const LIGHT_BG = '#F2F2F2';
const BLUE = '#1976D2';

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
  content: { flex: 1, padding: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
  },
  cardTitle: { fontSize: 18, fontWeight: '700', marginBottom: 10, color: '#222' },
  name: { fontSize: 17, color: '#222' },
  email: { fontSize: 14, color: '#666', marginTop: 4 },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionTitle: { fontSize: 16, fontWeight: '600', color: '#222' },
  optionSub: { fontSize: 13, color: '#666', marginTop: 4 },
  locationButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#90CAF9',
    borderRadius: 4,
    paddingVertical: 16,
    alignItems: 'center',
  },
  locationButtonText: { color: BLUE, fontSize: 14, fontWeight: '700' },
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
  saveButtonText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});