// app/_server/db.ts
import { initializeApp, FirebaseApp, getApps } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import firebaseConfig from "./firebaseConfig";

let app: FirebaseApp;
let db: Firestore;

try {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    console.log("Firebase app initialized successfully.");
  } else {
    app = getApps()[0];
    console.log("Using existing Firebase app.");
  }

  db = getFirestore(app);
  console.log("Firestore initialized successfully.");
} catch (error) {
  console.error("Error initializing Firebase:", error);
  throw new Error("Failed to initialize Firebase. Check configuration.");
}

export default db;
