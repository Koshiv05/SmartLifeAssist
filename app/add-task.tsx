import { View, Text, TextInput, StyleSheet, Pressable, Alert, Platform } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { loadTasks, saveTasks } from '../services/storage';
import { Task } from '../types/task';
import { saveTaskToFirestore } from '../services/firestoreTasks';

export default function AddTaskScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  function formatDate(date: Date) {
    return date.toLocaleDateString('en-AU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  function formatTime(date: Date) {
    return date.toLocaleTimeString('en-AU', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }

  function handleDateChange(event: DateTimePickerEvent, selectedDate?: Date) {
    setShowDatePicker(false);
    if (event.type === 'set' && selectedDate) {
      setDueDate(formatDate(selectedDate));
    }
  }

  function handleTimeChange(event: DateTimePickerEvent, selectedTime?: Date) {
    setShowTimePicker(false);
    if (event.type === 'set' && selectedTime) {
      setDueTime(formatTime(selectedTime));
    }
  }

  async function handleSave() {
    if (!title.trim() || !description.trim() || !dueDate.trim() || !dueTime.trim()) {
      Alert.alert('Missing information', 'Please complete all fields before saving.');
      return;
    }

    try {
      const existingTasks = await loadTasks();

      const newTask: Task = {
        id: Date.now().toString(),
        title: title.trim(),
        description: description.trim(),
        dueDate,
        dueTime,
        reminderType: '',
      };

      const updatedTasks = [...existingTasks, newTask];
      await saveTasks(updatedTasks);
      await saveTaskToFirestore(newTask);

      setTitle('');
      setDescription('');
      setDueDate('');
      setDueTime('');

      Alert.alert('Success', 'Task saved successfully.');
      router.back();
    } catch (error) {
      Alert.alert('Error', 'Could not save task.');
    }
  }

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
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            style={styles.textArea}
            placeholder="Description"
            placeholderTextColor="#666"
            multiline
            textAlignVertical="top"
            value={description}
            onChangeText={setDescription}
          />

          <Pressable style={styles.pickerCard} onPress={() => setShowDatePicker(true)}>
            <Text style={styles.pickerLabel}>Due Date</Text>
            <Text style={styles.pickerValue}>{dueDate || 'Select date'}</Text>
          </Pressable>

          <Pressable style={styles.pickerCard} onPress={() => setShowTimePicker(true)}>
            <Text style={styles.pickerLabel}>Due Time</Text>
            <Text style={styles.pickerValue}>{dueTime || 'Select time'}</Text>
          </Pressable>

          {showDatePicker && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
            />
          )}

          {showTimePicker && (
            <DateTimePicker
              value={new Date()}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleTimeChange}
            />
          )}
        </View>

        <View style={styles.bottomButtons}>
          <Pressable style={styles.saveButton} onPress={handleSave}>
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
  pickerCard: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#bdbdbd',
    borderRadius: 4,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 14,
    marginBottom: 14,
  },
  pickerLabel: {
    fontSize: 13,
    color: '#555',
    marginBottom: 6,
  },
  pickerValue: {
    fontSize: 18,
    color: '#111',
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