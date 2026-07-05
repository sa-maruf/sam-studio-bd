// src/firebase.js
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBWybrm-VIlqhQ5uGSE2965qnb1kfNPX-w",
  authDomain: "sam-web2-f25b1.firebaseapp.com",
  projectId: "sam-web2-f25b1",
  storageBucket: "sam-web2-f25b1.firebasestorage.app",
  messagingSenderId: "684634965682",
  appId: "1:684634965682:web:a381c7a249042ae1ebabab",
  measurementId: "G-T2EEV2M0L2"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app, "(default)");

console.log("Firebase config:", firebaseConfig);