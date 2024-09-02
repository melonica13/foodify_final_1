import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyBpsPfd443QLIjGwnnnZHe4kHWCkXu_eag",
	authDomain: "chat-app-169ec.firebaseapp.com",
	projectId: "chat-app-169ec",
	storageBucket: "chat-app-169ec.appspot.com",
	messagingSenderId: "262290492541",
	appId: "1:262290492541:web:05c8d71e3ba9d6bbb5f514",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
