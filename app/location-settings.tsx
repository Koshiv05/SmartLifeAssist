import { View, Text, StyleSheet, Pressable, TextInput, Switch } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function LocationSettingsScreen() {
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [locationText, setLocationText] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.topBarTitle}>Location Settings</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.card}>
            <View style={styles.toggleRow}>
              <View>
                <Text style={styles.optionTitle}>Enable Location</Text>
                <Text style={styles.optionSub}>
                  {locationEnabled ? 'Location services are enabled' : 'Location services are disabled'}
                </Text>
              </View>
              <Switch value={locationEnabled} onValueChange={setLocationEnabled} />
            </View>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Select location"
            placeholderTextColor="#666"
            value={locationText}
            onChangeText={setLocationText}
          />

          <Pressable style={styles.currentLocationButton}>
            <Text style={styles.currentLocationText}>USE CURRENT LOCATION</Text>
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
  toggleRow: {
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
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#bdbdbd',
    borderRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 16,
    fontSize: 16,
    marginBottom: 14,
  },
  currentLocationButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#90CAF9',
    borderRadius: 4,
    paddingVertical: 16,
    alignItems: 'center',
  },
  currentLocationText: {
    color: BLUE,
    fontSize: 14,
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