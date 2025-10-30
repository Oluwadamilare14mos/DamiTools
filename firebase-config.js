// firebase-config.js
// Centralized Firebase configuration for DamiTools
// ------------------------------------------------

// Import the Firebase SDK (version 10+)
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";

// Your Firebase configuration (same one you already use)
const firebaseConfig = {
  apiKey: "AIzaSyA2lx1hb2qZsYaXrQhsUp7hepYu5nY3fgs",
  authDomain: "damitools.firebaseapp.com",
  projectId: "damitools",
  storageBucket: "damitools.appspot.com",
  messagingSenderId: "875796385681",
  appId: "1:875796385681:web:563ffc58665bdc94875430"
};

// Initialize Firebase only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Export the app for other scripts to use
export { app };
