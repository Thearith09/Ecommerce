import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAME_9QlxjgYDzJDYpnirhomeAX5zILDAw",
    authDomain: "ecommerce-1625a.firebaseapp.com",
    projectId: "ecommerce-1625a",
    storageBucket: "ecommerce-1625a.appspot.com",
    messagingSenderId: "643320170172",
    appId: "1:643320170172:web:4292b6beabe20c80d6f2b9"
};

firebase.initializeApp(firebaseConfig);

const projectAuth = firebase.auth();
const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectAuth, projectFirestore, timestamp, projectStorage };