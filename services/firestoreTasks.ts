import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
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

export async function loadTasksFromFirestore(): Promise<Task[]> {
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