import styled from "styled-components"
import { Avatar } from "@material-ui/core"
import getRecipientEmail from "../utils/getRecipientEmail"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/dist/client/router";
function Chat({id,users}) {
    const router =useRouter();
    const [user]=useAuthState(auth)
    const [receipentSnapshot]=useCollection(db.collection('users').where('email','==',getRecipientEmail(users,user)))
    const recipientEmail=getRecipientEmail(users,user);

    const receipent =receipentSnapshot?.docs?.[0]?.data();

    return (
        <Container>
            {receipent ?(
                     <UserAvatar src={receipent?.photoURL}  />
            ):(
                <UserAvatar>{recipientEmail[0]}</UserAvatar>
            )
        }
           
            <p>{recipientEmail}</p>
            
            
        </Container>
    )
}

export default Chat


const Container = styled.div`
display:flex;
align-items:center;cursor:pointer;
padding:15px;
word-break:break-word;

:hover{
    background-color:#e9eaeb;
}

`
const UserAvatar=styled(Avatar)`
margin:5px;
margin-right:15px;
`