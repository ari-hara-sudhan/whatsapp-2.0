import { useAuthState } from "react-firebase-hooks/auth"
import styled from "styled-components"
import { auth } from "../firebase"
import moment from "moment"
function Message({user,message}) {
    const[userLoggedIn]=useAuthState(auth);

    const TypeofMessage=user ===userLoggedIn.email ? Sender :Receiver;



    return (
        <Container>

            <TypeofMessage>{message.message} 
            <Timestamp>
              {message.timestamp?moment(message.timestamp).format("LT"):"..."}

            </Timestamp>
      
            </TypeofMessage>
            
        </Container>
    )
}

export default Message


const Container = styled.div``

const MessageElement = styled.p`
width:fit-content;
padding:15px;
border-radius:8px;
margin:10px;
min-width:60px;
padding-bottom:20px;
position:relative;
text-align:right;

`
const Timestamp =styled.div`
font-size:10px;
color:gray;
margin-left:auto;`

const Sender=styled(MessageElement)`
margin-left:auto;
background-color:#dcf8c6;
`
const Receiver = styled(MessageElement)`
text-align:left;
background-color:whitesmoke;

`