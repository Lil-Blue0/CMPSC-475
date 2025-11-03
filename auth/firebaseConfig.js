import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Replace with your Firebase configuration
// Get these values from Firebase Console: Project Settings > General > Your apps
const firebaseConfig = {
  apiKey: "AIzaSyBZouW8C72KLA46C2VOu51Gv1Hew-gJA9g",

  authDomain: "babys-first-auth.firebaseapp.com",

  projectId: "babys-first-auth",

  storageBucket: "babys-first-auth.firebasestorage.app",

  messagingSenderId: "246789671893",

  appId: "1:246789671893:web:9d4ec1156a1ca16acb0b5c",

  measurementId: "G-14PJDJM35G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage for persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
const db = getFirestore(app);

export { auth, db };
