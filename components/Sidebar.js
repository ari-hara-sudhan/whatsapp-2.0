import styled from "styled-components"
import { Avatar,IconButton ,Button} from '@material-ui/core';
import ChatIcon from "@material-ui/icons/Chat"
import MoreVertIcon from "@material-ui/icons/More"
import SearchIcon from "@material-ui/icons/Search"
import {useAuthState} from "react-firebase-hooks/auth"
import * as EmailValidator from "email-validator"
import {auth, db} from "../firebase"
import {useCollection} from "react-firebase-hooks/firestore"
import Chat from "/components/Chat"
function Sidebar(){
    const [user]=useAuthState(auth)
    const userChatRef=db.collection('chats').where('users','array-contains',user.email);
    const [chatSnapshot]=useCollection(userChatRef)
    const createChat=()=>{
        const input =prompt('Enter ur Email pls..');

        if(!input) return null;
        if (EmailValidator.validate(input) && !chatAlreadyExits(input) && input !== user.email){

            //push into db..
            db.collection("chats").add({
                users:[user.email,input],

            })
        }

        
    }
    const chatAlreadyExits=(receipentEmail)=>
    !!chatSnapshot?.docs.find((chat)=>chat.data().users.find((user)=>user === receipentEmail)?.length >0)
    return(
        <Container>
            <Header>
                <UserAvatar src={user.photoURL} onClick={()=>auth.signOut()}/>
                <IconContainer>
                    <IconButton>
                    <ChatIcon/>
                    </IconButton>
                    <IconButton>
                    <MoreVertIcon/>
                    </IconButton>
                </IconContainer>
            </Header>
            <Search>
                <SearchIcon/>
                <SearchInput placeholder="Search in Chats"/>

            </Search>
            <SidebarButton onClick={createChat}>Start new Chat</SidebarButton>
            {chatSnapshot?.docs.map((chat) =>(
                <Chat key={chat.id} id={chat.id} users={chat.data().users}/>
            ))
            }
        </Container>
    )
}

export default Sidebar



const Header=styled.div`
display:flex;
position:sticky;
top:0;
background:white;
z-index:1;
justify-content:space-between;
align-items:center;
padding:15px;
height:80px;
border:1px solid whitesmoke;

`;

const Container=styled.div`
flex:0.45;
border-right:1px solid whitesmoke;
height:100vh;
max-width:350px;
min-width:300px;
overflow-y:scroll;

::-webkit-scrollbar{
    display:none;
}

`;
const UserAvatar=styled(Avatar)`
cursor:pointer;


:hover{
    opacity:0.8;
}
`;
const IconContainer=styled.div``;

const SearchInput=styled.input`
outline:none;
border:none;
flex:1;

`
const Search =styled.div`
display:flex;
align-items:center;
padding:20px;
border-radius:20px;
`;

const SidebarButton=styled(Button)`
width:100%;

&&&{

border-top:1px solid lightgray ;
border-bottom:1px solid lightgray;
}




`