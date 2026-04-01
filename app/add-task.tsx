import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddTaskScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.topBarTitle}>Add Task</Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Task Title"
            placeholderTextColor="#666"
          />

          <TextInput
            style={styles.textArea}
            placeholder="Description"
            placeholderTextColor="#666"
            multiline
            textAlignVertical="top"
          />

          <View style={styles.timeWrapper}>
            <Text style={styles.timeLabel}>Due Time</Text>
            <TextInput
              style={styles.timeInput}
              placeholder="--:--"
              placeholderTextColor="#333"
            />
          </View>
        </View>

        <View style={styles.bottomButtons}>
          <Pressable style={styles.saveButton}>
            <Text style={styles.buttonText}>SAVE</Text>
          </Pressable>

          <Pressable style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.buttonText}>CANCEL</Text>
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
  formContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
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
  textArea: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#bdbdbd',
    borderRadius: 4,
    paddingHorizontal: 14,
    paddingTop: 16,
    fontSize: 16,
    height: 140,
    marginBottom: 14,
  },
  timeWrapper: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#bdbdbd',
    borderRadius: 4,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 14,
  },
  timeLabel: {
    fontSize: 13,
    color: '#555',
    marginBottom: 6,
  },
  timeInput: {
    fontSize: 18,
    color: '#111',
    paddingVertical: 4,
  },
  bottomButtons: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: '#d9d9d9',
    backgroundColor: LIGHT_BG,
  },
  saveButton: {
    flex: 1,
    backgroundColor: GREEN,
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 4,
    elevation: 2,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: RED,
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});