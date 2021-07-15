import {useAuthState} from "react-firebase-hooks/auth"
import { auth, db } from "../firebase"
import Loading from "../Loading"
import Login from "../login"
import {useEffect} from "react"
import firebase from "firebase"
function MyApp({ Component, pageProps }) {
  const [user,loading]=useAuthState(auth)

  useEffect(()=>{
    if(user){
      db.collection('users').doc(user.uid).set({
        email:user.email,
        lastSeen:firebase.firestore.FieldValue.serverTimestamp(),
        photoUrl:user.photoURL
      },{merge:true})
    }
  },[])
  if (loading) return <Loading />
  if(!user) return <Login/>

  return(
    
    <Component {...pageProps} />
 

  )

 
}

export default MyApp
