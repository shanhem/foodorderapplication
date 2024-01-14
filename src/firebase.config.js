import {getApp,getApps,initializeApp} from "firebase/app"
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'


const firebaseConfig = {

    apiKey: "AIzaSyDTfsj13cQC7Fhb9FPLC61RzFqsvjvqOzk",
  
    authDomain: "wekraveapp-ab74e.firebaseapp.com",
  
    databaseURL: "https://wekraveapp-ab74e-default-rtdb.europe-west1.firebasedatabase.app",
  
    projectId: "wekraveapp-ab74e",
  
    storageBucket: "wekraveapp-ab74e.appspot.com",
  
    messagingSenderId: "677319200245",
  
    appId: "1:677319200245:web:03686c71fa97e50a09e4bc",
  
    measurementId: "G-B1YLL0KCJC"
  
  };
  

  const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)

  const firestore = getFirestore(app)
  const storage = getStorage(app)

export {app, firestore, storage};