import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
// ... other firebase imports

export const firebaseApp = initializeApp({
  // your application settings
  apiKey: "AIzaSyAR84yRMSxqodyPoQbyYso0iNo6T--qZ7g",
  authDomain: "personal-project-4ac6f.firebaseapp.com",
  projectId: "personal-project-4ac6f",
  storageBucket: "personal-project-4ac6f.appspot.com",
  messagingSenderId: "337096134393",
  appId: "1:337096134393:web:edd7878c77fc6add839c28",
});

// used for the firestore refs
const db = getFirestore(firebaseApp);

// here we can export reusable database references
export const todosRef = collection(db, "todos");
