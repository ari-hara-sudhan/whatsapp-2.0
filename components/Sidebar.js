import styled from "styled-components"
import { Avatar,IconButton } from '@material-ui/core';
import ChatIcon from "@material-ui/icons/Chat"
import MoreVertIcon from "@material-ui/icons/More"

function Sidebar(){
    return(
        <Container>
            <Header>
                <UserAvatar/>
                <IconContainer>
                    <IconButton>
                    <ChatIcon/>
                    </IconButton>
                    <IconButton>
                    <MoreVertIcon/>
                    </IconButton>
                </IconContainer>
            </Header>
         
        </Container>
    )
}

export default Sidebar


const Container=styled.div`


`;

const Header=styled.div`
display:flex;
position:sticky;

`;
const UserAvatar=styled(Avatar)`
`;
const IconContainer=styled.div``;