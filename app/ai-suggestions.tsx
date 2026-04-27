import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AiSuggestionsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.topBarTitle}>AI Suggestions</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.suggestionText}>
              Based on your schedule, consider starting the project report now to avoid
              last-minute rush.
            </Text>
            <View style={styles.actionRow}>
              <Pressable style={styles.acceptButton}>
                <Text style={styles.buttonText}>ACCEPT</Text>
              </Pressable>
              <Pressable style={styles.ignoreButton}>
                <Text style={styles.buttonText}>IGNORE</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.suggestionText}>
              You have a meeting at 3:00 PM. It might be good to prepare your
              presentation materials.
            </Text>
            <View style={styles.actionRow}>
              <Pressable style={styles.acceptButton}>
                <Text style={styles.buttonText}>ACCEPT</Text>
              </Pressable>
              <Pressable style={styles.ignoreButton}>
                <Text style={styles.buttonText}>IGNORE</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.suggestionText}>
              Weather forecast shows rain tomorrow. Don&apos;t forget to pack an
              umbrella for your morning commute.
            </Text>
            <View style={styles.actionRow}>
              <Pressable style={styles.acceptButton}>
                <Text style={styles.buttonText}>ACCEPT</Text>
              </Pressable>
              <Pressable style={styles.ignoreButton}>
                <Text style={styles.buttonText}>IGNORE</Text>
              </Pressable>
            </View>
          </View>
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
  content: { flex: 1, padding: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
  },
  suggestionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#222',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  acceptButton: {
    flex: 1,
    backgroundColor: GREEN,
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  ignoreButton: {
    flex: 1,
    backgroundColor: RED,
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
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