import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from './firebase';
import { Task } from '../types/task';

type FirestoreTask = Task & {
  userId: string;
  createdAtMs: number;
};

export async function saveTaskToFirestore(task: Task) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('User is not logged in.');
  }

  const taskData: FirestoreTask = {
    ...task,
    userId: user.uid,
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

  const tasks = snapshot.docs.map((doc) => {
    const data = doc.data() as FirestoreTask;

    return {
      id: doc.id,
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      dueTime: data.dueTime,
      reminderType: data.reminderType || '',
    };
  });

  return tasks;
}