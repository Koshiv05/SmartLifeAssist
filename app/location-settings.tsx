import { View, Text, StyleSheet, Pressable, TextInput, Switch, Alert } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { getCurrentLocation, CurrentLocation } from '../services/locationService';
import MapView, { Marker } from 'react-native-maps';

export default function LocationSettingsScreen() {
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [locationText, setLocationText] = useState('');
  const [currentLocation, setCurrentLocation] = useState<CurrentLocation | null>(null);

  async function handleUseCurrentLocation() {
    if (!locationEnabled) {
      Alert.alert('Location disabled', 'Please enable location before using GPS.');
      return;
    }

    try {
      const location = await getCurrentLocation();
      setCurrentLocation(location);
      setLocationText(location.address);
      Alert.alert('Location found', 'Current location has been added.');
    } catch (error: any) {
      Alert.alert('Location error', error.message || 'Could not get current location.');
    }
  }

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
            placeholder="Selected location"
            placeholderTextColor="#666"
            value={locationText}
            onChangeText={setLocationText}
          />

          <Pressable
            style={[
              styles.currentLocationButton,
              !locationEnabled && styles.disabledButton,
            ]}
            onPress={handleUseCurrentLocation}
            disabled={!locationEnabled}
          >
            <Text style={styles.currentLocationText}>USE CURRENT LOCATION</Text>
          </Pressable>

          {currentLocation && (
            <View style={styles.locationPreview}>
              <Text style={styles.locationPreviewTitle}>Current GPS Location</Text>

              <Text style={styles.locationPreviewText}>
                {currentLocation.address}
              </Text>

              <View style={styles.gpsInfoCard}>
                <Text style={styles.gpsInfoTitle}>GPS Data Captured</Text>
                <Text style={styles.gpsInfoText}>
                  The app used the device GPS sensor and reverse geocoding to detect the current location.
                </Text>
              </View>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: currentLocation.latitude,
                  longitude: currentLocation.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                  }}
                  title="Current Location"
                />
              </MapView>
            </View>
          )}
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
  disabledButton: {
    opacity: 0.5,
  },
  locationPreview: {
    backgroundColor: '#fff',
    marginTop: 14,
    padding: 16,
    borderRadius: 4,
    elevation: 2,
  },
  locationPreviewTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    marginBottom: 10,
  },
  locationPreviewText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 24,
  },
  gpsInfoCard: {
    marginTop: 16,
    backgroundColor: '#F5F5F5',
    padding: 14,
    borderRadius: 4,
  },
  map: {
  width: '100%',
  height: 220,
  marginTop: 16,
  borderRadius: 6,
},
  gpsInfoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#222',
    marginBottom: 6,
  },
  gpsInfoText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
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