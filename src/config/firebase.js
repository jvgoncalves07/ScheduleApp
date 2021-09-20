import firebase from "firebase"
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAaz2UDrva7g9MaRAWCRL2q-GtwoY-Cb4c",
  authDomain: "taskapp-79739.firebaseapp.com",
  projectId: "taskapp-79739",
  storageBucket: "taskapp-79739.appspot.com",
  messagingSenderId: "785429571665",
  appId: "1:785429571665:web:d2302bb70fc78819d07070"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase