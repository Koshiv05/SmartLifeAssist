import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCZFT94QgSp9evAlCQIgm2AdYnzu7Spq9Y",
  authDomain: "smartlifeassist.firebaseapp.com",
  projectId: "smartlifeassist",
  storageBucket: "smartlifeassist.firebasestorage.app",
  messagingSenderId: "909913080225",
  appId: "1:909913080225:web:161d21eb41f001d40ccbe0",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);