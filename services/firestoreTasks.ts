import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

import { auth, db } from './firebase';
import { Task } from '../types/task';

type FirestoreTask = Task & {
  userId: string;
  createdAtMs: number;
};

export async function saveTaskToFirestore(task: Task, userId: string) {
  const taskData: FirestoreTask = {
    ...task,
    userId,
    createdAtMs: Date.now(),
  };

  await addDoc(collection(db, 'tasks'), taskData);
}

export async function loadTasksFromFirestore(uid: string): Promise<Task[]> {
  const user = auth.currentUser;

  if (!user) {
    return [];
  }

  const taskQuery = query(
    collection(db, 'tasks'),
    where('userId', '==', user.uid)
  );

  const snapshot = await getDocs(taskQuery);

  const tasks = snapshot.docs.map((docItem) => {
    const data = docItem.data() as FirestoreTask;

    return {
      id: docItem.id,
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      dueTime: data.dueTime,
      reminderType: (data.reminderType || '') as Task['reminderType'],
    };
  });

  return tasks;
}

export async function deleteTaskFromFirestore(taskId: string) {
  await deleteDoc(doc(db, 'tasks', taskId));
}

export async function updateTaskInFirestore(task: Task) {
  await updateDoc(doc(db, 'tasks', task.id), {
    title: task.title,
    description: task.description,
    dueDate: task.dueDate,
    dueTime: task.dueTime,
    reminderType: task.reminderType || '',
  });
}