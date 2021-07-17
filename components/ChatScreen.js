import { Avatar, IconButton } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import { useAuthState } from "react-firebase-hooks/auth"
import styled from "styled-components"
import { auth, db } from "../firebase"
import MoreVertIcon from "@material-ui/icons/More"
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions"
import AttachFileIcon from "@material-ui/icons/AttachFile"
import {useCollection} from "react-firebase-hooks/firestore"
import Message from "./Message";
import {useState,useRef} from "react"
import MicIcon from "@material-ui/icons/Mic"
import firebase from "firebase"
import Timeago from "timeago-react"
import getRecipientEmail from "../utils/getRecipientEmail";
function ChatScreen({chat,messages}) {
    const [user]=useAuthState(auth);
    const endofMessage=useRef(null);
    const[input,setInput]=useState()
    const router =useRouter()
    const[messageSnapshot]=useCollection(db.collection('chats').doc(router.query.id).collection('messages').orderBy('timestamp',"asc"))

    const[receipentSnapshot]=useCollection(db.collection('users').where("email" ,"=="
    ,getRecipientEmail(chat.users,user)))
    

    const showMessage=()=>{

        if(messageSnapshot){
            return messageSnapshot.docs.map(message=>(
                <Message key={message.id}
                user={message.data().user}
                message={{
                    ...message.data(),
                    timestamp:message.data().timestamp?.toDate().getTime(),
                }} 
                
                />
            ))
        }
        else{
            return JSON.parse(messages).map(message=>(
                <Message key={message.id} user={message.user} message={message}/>
            ))
        }
    }

    const sendMessage=(e)=>{
        e.preventDefault();
        db.collection('users').doc(user.uid).set({
            lastSeen:firebase.firestore.FieldValue.serverTimestamp(),
        },{merge: true})

        db.collection('chats').doc(router.query.id).collection("messages").add({
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            message:input,
            user:user.email,
            photoURL:user.photoURL,
        })

        setInput("");
        ScrolltoBottom();

    
    }

    const ScrolltoBottom =()=>{
        endofMessage.current.scrollIntoView({
            behavior:"smooth",
            block:"start",
        })
    }
    const receipent=receipentSnapshot?.docs?.[0]?.data();
    const receipentEmail=getRecipientEmail(chat.users,user)
    return (
       <Container>
           <Header>
               {
                   receipent?(
                    <Avatar src={receipent?.photoURL} />
                   ):(
                       <Avatar src={receipentEmail[0]}></Avatar>
                   )
               }
                
                <HeaderInfo>
                    <h3>{receipentEmail}</h3>
                    {receipentSnapshot ?(
                        <p>
                            Last Active :{receipent ?.lastSeen?.toDate()?(
                                <Timeago dateTime={receipent ?.lastSeen?.toDate()} />
                            ):
                            "Unavaiable"}
                        </p>
                    ):(
                        <p>Loading Last Active</p>
                    )
                }
                   
                </HeaderInfo>
                <HeaderIcons>
                    <IconButton>
                    <AttachFileIcon/>
                    </IconButton>
                    <IconButton>
                    <MoreVertIcon/>
                    </IconButton>
                  
                   

                </HeaderIcons>
           </Header>
           <MessageContainer>
               {showMessage()}
               <EndofMessage ref={endofMessage}/>
           </MessageContainer>
           
           <InputContainer>
          
           <EmojiEmotionsIcon/>
         <FormContainer>
          <Input value={input} onChange={e=>setInput(e.target.value)} />
          <button  hidden disabled={!input} type="submit" onClick={sendMessage}> send</button>
          </FormContainer>
          <MicIcon/>

          
       

       

        
           </InputContainer>

          
          

       </Container>
       
    )
}

export default ChatScreen

 const Input =styled.input`
 flex:1;
 margin-right:15px;
 margin-left:15px;
 padding:20px;
 background-color:whitesmoke;
 border:none;
 border-radius:10px;
 outline:none;
 `

const Container = styled.div`


`;
const Header = styled.div`
display:flex;
justify-content:space-between;
position:sticky;
top:0;
z-index:100;
background-color:white;
align-items:center;
height:80px;
padding:10px;
border-bottom:1px solid lightgray;

`;
const HeaderInfo = styled.div`
flex:1;
margin-left:15px;

>h3{
    margin-bottom:3px;
}
>p{
    font-size:14px;
}
`;
const HeaderIcons = styled.div``;
const MessageContainer =styled.div`
padding:30px;
background-color:#e5ded8;
min-height:90vh;
`;
const EndofMessage = styled.div``

const InputContainer = styled.div`
display:flex;
align-items:center;
padding:10px;
position:sticky;
bottom:0;
background-color:white;
z-index:100;


`;
const FormContainer = styled.form`
display:flex;
flex:1;
`