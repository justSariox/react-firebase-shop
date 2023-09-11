import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyCC14HCydyzKT9YAwZIJd1sao7Ag8KDFYY",
    authDomain: "react-firebase-shop-5fafb.firebaseapp.com",
    databaseURL: "https://react-firebase-shop-5fafb-default-rtdb.firebaseio.com",
    projectId: "react-firebase-shop-5fafb",
    storageBucket: "react-firebase-shop-5fafb.appspot.com",
    messagingSenderId: "1073860831551",
    appId: "1:1073860831551:web:450b0bbb0ad3cfbef50b8a",
    measurementId: "G-750GDNN8NR"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { auth, db, storage };