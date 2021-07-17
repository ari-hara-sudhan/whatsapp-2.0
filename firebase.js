import firebase from "firebase"
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyD5K1KQ_5yiTpiV99yE_2Ome74DHuPxfn4",
  authDomain: "message-app-7c3d7.firebaseapp.com",
  projectId: "message-app-7c3d7",
  storageBucket: "message-app-7c3d7.appspot.com",
  messagingSenderId: "463715874217",
  appId: "1:463715874217:web:81774e2a7ba9d6f01dc0b8",
  measurementId: "G-PBFWW0VJH7"
};

  const app =!firebase.apps.length? firebase.initializeApp(firebaseConfig) :firebase.app();
  
const db =app.firestore()
const auth=app.auth()
const provider=new firebase.auth.GoogleAuthProvider();
export {db,auth,provider} 

