import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../services/firebase';
import { Task } from '../types/task';
import { loadTasksFromFirestore } from '../services/firestoreTasks';

type AppContextType = {
  user: User | null;
  tasks: Task[];
  darkMode: boolean;
  largeText: boolean;
  refreshTasks: () => Promise<void>;
  setDarkMode: (value: boolean) => void;
  setLargeText: (value: boolean) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [largeText, setLargeText] = useState(false);

  async function refreshTasks() {
    try {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        setTasks([]);
        return;
      }

      const firestoreTasks = await loadTasksFromFirestore(currentUser.uid);
      setTasks(firestoreTasks);
    } catch (error) {
      console.log('Task refresh failed:', error);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        const firestoreTasks = await loadTasksFromFirestore(firebaseUser.uid);
        setTasks(firestoreTasks);
      } else {
        setTasks([]);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        tasks,
        darkMode,
        largeText,
        refreshTasks,
        setDarkMode,
        setLargeText,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used inside AppProvider');
  }

  return context;
}