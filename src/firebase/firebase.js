import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCfMdhOAK6Uqd2n526KNIgx3HdD-cf4IW0",
    authDomain: "reactlogin-e8e14.firebaseapp.com",
    projectId: "reactlogin-e8e14",
    storageBucket: "reactlogin-e8e14.appspot.com",
    messagingSenderId: "269680795912",
    appId: "1:269680795912:web:7e87925da3e22b0cf7ccbd",
    measurementId: "G-4RXLCBNH33"
   
  };
  // Initialize Firebase
  
  firebase.initializeApp(firebaseConfig); 
  firebase.analytics();


export default firebase;

export const database = firebase.database().ref();
// export const fireStore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
 const messaging = firebase.messaging();
export const analytics =firebase.analytics();
// export const storageRef = firebase.storage().ref();

