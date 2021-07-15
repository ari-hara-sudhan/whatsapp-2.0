import firebase from "firebase"
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyAOyC9Fv7eBsvBjlA577vyL3dj2EVECQPo",
    authDomain: "search-engine-f322b.firebaseapp.com",
    projectId: "search-engine-f322b",
    storageBucket: "search-engine-f322b.appspot.com",
    messagingSenderId: "969994207453",
    appId: "1:969994207453:web:9f5b1101c3ff6959f29b34",
    measurementId: "G-KQ9RHEBHDC"
  };

  const app =!firebase.apps.length? firebase.initializeApp(firebaseConfig) :firebase.app();
  
const db =firebase.firestore()
const storage=firebase.storage()
export {db,storage} 

