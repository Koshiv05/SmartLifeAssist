import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';

import { useEffect, useState } from 'react';

import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getBatteryInfo } from '../services/batteryService';
import { loadTasksFromSQLite } from '../services/sqliteTaskService';
import { loadTasksFromFirestore } from '../services/firestoreTasks';

export default function ParallelTasksScreen() {
  const [loading, setLoading] = useState(true);

  const [battery, setBattery] = useState(0);
  const [sqliteCount, setSqliteCount] = useState(0);
  const [firestoreCount, setFirestoreCount] = useState(0);

  useEffect(() => {
    async function loadParallelData() {
      try {
        const [batteryInfo, sqliteTasks, firestoreTasks] =
          await Promise.all([
            getBatteryInfo(),
            Promise.resolve(loadTasksFromSQLite()),
            loadTasksFromFirestore('tasks'),
          ]);

        setBattery(batteryInfo.percentage);
        setSqliteCount(sqliteTasks.length);
        setFirestoreCount(firestoreTasks.length);
      } catch (error) {
        console.log('Parallel processing error:', error);
      } finally {
        setLoading(false);
      }
    }

    loadParallelData();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.topBarTitle}>
            Parallel Programming
          </Text>
        </View>

        <View style={styles.content}>
          {loading ? (
            <ActivityIndicator size="large" color="#9C27B0" />
          ) : (
            <>
              <View style={styles.card}>
                <Text style={styles.label}>
                  Battery Percentage
                </Text>

                <Text style={styles.value}>
                  {battery}%
                </Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.label}>
                  SQLite Task Count
                </Text>

                <Text style={styles.value}>
                  {sqliteCount}
                </Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.label}>
                  Firestore Task Count
                </Text>

                <Text style={styles.value}>
                  {firestoreCount}
                </Text>
              </View>

              <Text style={styles.description}>
                This screen demonstrates parallel asynchronous
                processing using Promise.all() to load multiple
                data sources at the same time.
              </Text>
            </>
          )}
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
    marginBottom: 14,
    elevation: 2,
  },

  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },

  value: {
    fontSize: 24,
    fontWeight: '700',
    color: '#222',
  },

  description: {
    marginTop: 20,
    fontSize: 15,
    lineHeight: 24,
    color: '#444',
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