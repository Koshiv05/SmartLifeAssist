import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function AddTaskScreen() {
  return (
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
  );
}

const PURPLE = '#9C27B0';
const GREEN = '#4CAF50';
const RED = '#E53935';
const LIGHT_BG = '#F2F2F2';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT_BG,
    paddingBottom: 18,
  },
  topBar: {
    backgroundColor: PURPLE,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginTop: 18,
    marginHorizontal: 16,
    elevation: 3,
  },
  topBarTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  formContainer: {
    marginTop: 14,
    marginHorizontal: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#bdbdbd',
    borderRadius: 3,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 12,
  },
  textArea: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#bdbdbd',
    borderRadius: 3,
    paddingHorizontal: 14,
    paddingTop: 14,
    fontSize: 16,
    height: 130,
    marginBottom: 12,
  },
  timeWrapper: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#bdbdbd',
    borderRadius: 3,
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 12,
  },
  timeLabel: {
    fontSize: 12,
    color: '#555',
    marginBottom: 6,
  },
  timeInput: {
    fontSize: 18,
    color: '#111',
    paddingVertical: 4,
  },
  bottomButtons: {
    marginTop: 'auto',
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: 16,
    paddingTop: 16,
  },
  saveButton: {
    flex: 1,
    backgroundColor: GREEN,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 3,
    elevation: 2,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: RED,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 3,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});