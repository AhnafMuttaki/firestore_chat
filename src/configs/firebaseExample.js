import firebase from "firebase";

const firebaseConfig = {
    apiKey: "FIREBASE APP KEY",
    authDomain: "AUTH DOMAIN",
    databaseURL: "DATABASE URL",
    projectId: "PROJECT ID",
    storageBucket: "STORAGE BUCKET",
    messagingSenderId: "MSG SENDER ID",
    appId: "APP ID"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
// console.log("firebaseApp:",firebaseApp);
const db = firebaseApp.firestore();

// const userCollection = db.collection('messages');

export default db;