import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import 'firebase/compat/auth'
import 'firebase/compat/database'
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: "AIzaSyBbgJLdUnW9WydZz62slL642J0A_8N697o",
	authDomain: "shoppe-44681.firebaseapp.com",
	projectId: "shoppe-44681",
	storageBucket: "shoppe-44681.appspot.com",
	messagingSenderId: "152685398178",
	appId: "1:152685398178:web:26d4c781900f0e453aaffb"
};



const app = firebase.initializeApp(firebaseConfig)
const firestore = firebase.firestore();
const storage = firebase.storage()
const auth = firebase.auth();
const database = firebase.database();
const db = getFirestore(app);

export { app, firestore, storage, auth, database, db }