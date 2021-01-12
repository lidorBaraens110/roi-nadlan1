import firebase from 'firebase/app';
import "firebase/storage";
import dotenv from 'dotenv';



dotenv.config();
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "roi-nadlan.firebaseapp.com",
    projectId: "roi-nadlan",
    storageBucket: "roi-nadlan.appspot.com",
    messagingSenderId: "683606593751",
    appId: "1:683606593751:web:00692db2867f149599a092",
    measurementId: "G-QST9TRNG4M"
};



firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default };