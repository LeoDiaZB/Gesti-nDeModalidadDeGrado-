// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCK6_Sx0QPNp9IaNIudb7VnDOPtwwtABzg",
  authDomain: "usco-9e9e0.firebaseapp.com",
  projectId: "usco-9e9e0",
  storageBucket: "usco-9e9e0.appspot.com",
  messagingSenderId: "686282661697",
  appId: "1:686282661697:web:af8b968b2caa2454c2cbc0",
  measurementId: "G-EX1CGWK01K"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const firebaseAnalytics = getAnalytics(firebaseApp);
const firebaseAuth = getAuth(firebaseApp);

// Export the initialized services
export { firebaseApp, db, firebaseAnalytics, firebaseAuth };