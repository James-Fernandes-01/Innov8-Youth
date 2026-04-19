// Necessary SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase configuration - using environment variables for security
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Check for required environment variables
const requiredVars = ['VITE_FIREBASE_API_KEY', 'VITE_FIREBASE_PROJECT_ID', 'VITE_FIREBASE_AUTH_DOMAIN'];
const missingVars = requiredVars.filter(varName => !import.meta.env[varName]);

if (missingVars.length > 0) {
  console.error('Missing Firebase environment variables:', missingVars);
  console.error('Please check your Amplify environment variables configuration.');
  throw new Error(`Missing required Firebase config: ${missingVars.join(', ')}`);
}

// Debug: Log environment variables in development
if (import.meta.env.DEV) {
  console.log('Firebase Config Debug:', {
    apiKey: firebaseConfig.apiKey ? 'Set' : 'Missing',
    authDomain: firebaseConfig.authDomain ? 'Set' : 'Missing',
    projectId: firebaseConfig.projectId ? 'Set' : 'Missing',
    storageBucket: firebaseConfig.storageBucket ? 'Set' : 'Missing',
    messagingSenderId: firebaseConfig.messagingSenderId ? 'Set' : 'Missing',
    appId: firebaseConfig.appId ? 'Set' : 'Missing',
    measurementId: firebaseConfig.measurementId ? 'Set' : 'Missing',
  });
}

// Initialization
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, analytics };