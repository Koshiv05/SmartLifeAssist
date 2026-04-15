import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TaskDetailsScreen() {
  const { title, description, dueTime } = useLocalSearchParams<{
    title: string;
    description: string;
    dueTime: string;
  }>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.topBarTitle}>Task Details</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.label}>Task Title</Text>
            <Text style={styles.value}>{title}</Text>

            <Text style={styles.label}>Description</Text>
            <Text style={styles.value}>{description}</Text>

            <Text style={styles.label}>Due Time</Text>
            <Text style={styles.value}>{dueTime}</Text>
          </View>
        </View>

        <View style={styles.bottomButtons}>
          <Pressable style={styles.button} onPress={() => router.back()}>
            <Text style={styles.buttonText}>BACK</Text>
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
    padding: 18,
    elevation: 2,
  },
  label: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
    marginTop: 12,
  },
  value: {
    fontSize: 17,
    color: '#222',
  },
  bottomButtons: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: '#d9d9d9',
    backgroundColor: LIGHT_BG,
  },
  button: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#999',
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222',
  },
});