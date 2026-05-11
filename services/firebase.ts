import { initializeApp, getApps } from 'firebase/app';
import * as FirebaseAuth from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCZFT94QgSp9evAlCQIgm2AdYnzu7Spq9Y",
    authDomain: "smartlifeassist.firebaseapp.com",
    projectId: "smartlifeassist",
    storageBucket: "smartlifeassist.firebasestorage.app",
    messagingSenderId: "909913080225",
    appId: "1:909913080225:web:161d21eb41f001d40ccbe0",
};

const app =
  getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApps()[0];

const getReactNativePersistence =
  (FirebaseAuth as any).getReactNativePersistence;

let authInstance: FirebaseAuth.Auth;

try {
  if (getReactNativePersistence) {
    authInstance = FirebaseAuth.initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } else {
    authInstance = FirebaseAuth.getAuth(app);
  }
} catch (error) {
  authInstance = FirebaseAuth.getAuth(app);
}

export const auth = authInstance;
export const db = getFirestore(app);