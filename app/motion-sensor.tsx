import { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';

import { router } from 'expo-router';

import { Accelerometer } from 'expo-sensors';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function MotionSensorScreen() {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [movementDetected, setMovementDetected] = useState(false);

  // Set up accelerometer listener on component mount
  useEffect(() => {
    Accelerometer.setUpdateInterval(500);

    const subscription = Accelerometer.addListener((accelerometerData) => {
      setData(accelerometerData);

      // Calculate movement level based on accelerometer data
      const movementLevel =
        Math.abs(accelerometerData.x) +
        Math.abs(accelerometerData.y) +
        Math.abs(accelerometerData.z);

      setMovementDetected(movementLevel > 2.2);
    });

    return () => subscription.remove();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.topBarTitle}>Motion Sensor</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.label}>Accelerometer Data</Text>

            <Text style={styles.value}>
              X Axis: {data.x.toFixed(2)}
            </Text>

            <Text style={styles.value}>
              Y Axis: {data.y.toFixed(2)}
            </Text>

            <Text style={styles.value}>
              Z Axis: {data.z.toFixed(2)}
            </Text>
          </View>

          <View
            style={[
              styles.statusCard,
              {
                backgroundColor: movementDetected
                  ? '#E53935'
                  : '#4CAF50',
              },
            ]}
          >
            <Text style={styles.statusText}>
              {movementDetected
                ? 'Movement Detected'
                : 'Device Stable'}
            </Text>
          </View>

          <Text style={styles.description}>
            This feature uses the mobile device accelerometer sensor
            to monitor real-time movement and orientation changes.
          </Text>
        </View>

        <View style={styles.bottomArea}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>BACK</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const PURPLE = '#9C27B0';
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

  topBar: {
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
    padding: 18,
    elevation: 2,
  },

  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222',
    marginBottom: 16,
  },

  value: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },

  statusCard: {
    marginTop: 20,
    paddingVertical: 20,
    borderRadius: 4,
    alignItems: 'center',
  },

  statusText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  description: {
    marginTop: 20,
    fontSize: 15,
    color: '#444',
    lineHeight: 24,
  },

  bottomArea: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: '#d9d9d9',
  },

  backButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#999',
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 4,
  },

  backButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222',
  },
});