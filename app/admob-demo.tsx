import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';

import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AdmobDemoScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.topBarTitle}>
            AdMob Integration
          </Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.description}>
            This screen demonstrates AdMob integration support
            within the SmartLife Assist application.
          </Text>

          {/* Sample banner ad preview */}
          <View style={styles.adContainer}>
            <Text style={styles.adLabel}>
              SAMPLE BANNER AD
            </Text>

            <Text style={styles.adText}>
              Your Advertisement Here
            </Text>
          </View>

          <Text style={styles.note}>
            In production builds, this section can be connected
            to Google AdMob banner advertisements.
          </Text>
        </View>

        <View style={styles.bottomArea}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>
              BACK
            </Text>
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
    justifyContent: 'center',
    padding: 20,
  },

  description: {
    fontSize: 16,
    lineHeight: 26,
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },

  adContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'dashed',
    borderRadius: 6,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },

  adLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },

  adText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },

  note: {
    fontSize: 14,
    lineHeight: 22,
    color: '#555',
    textAlign: 'center',
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