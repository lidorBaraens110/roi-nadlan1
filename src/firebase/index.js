import firebase from 'firebase/app';
import "firebase/storage";
import dotenv from 'dotenv';

dotenv.config();
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "roi-nadlan.firebaseapp.com",
    projectId: "roi-nadlan",
    storageBucket: "roi-nadlan.appspot.com",
    messagingSenderId: process.env.REACT_APP_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};



firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default };