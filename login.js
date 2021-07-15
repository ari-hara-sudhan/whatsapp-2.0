import { Button } from "@material-ui/core"
import Head from "next/head"
import styled from "styled-components"
import { auth, provider } from "./firebase"
function Login() {
    const signin=()=>{
        auth.signInWithPopup(provider).catch(alert);
    }
    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>
            <LoginContainer>
                <Logo src="https://www.bing.com/th?id=OIP.HT81DsS-pt0LE33O5F-_QwHaEK&w=237&h=133&c=8&rs=1&qlt=90&o=6&dpr=1.25&pid=3.1&rm=2"/>
                <Button onClick={signin}>Sign in with Google</Button>
            </LoginContainer>
            
        </Container>
    )
}

export default Login


const Container = styled.div`
background-color:whitesmoke;
display:grid;
place-items:center;
height:100vh;

`

const LoginContainer = styled.div`
display:flex;
padding:100px;
flex-direction:column;
align-items:center;
border-radius:5px;
background-color:white;
box-shadow:0px 4px 14px -3px rgba(0,0,0,0.7);
`

const Logo =styled.img`
height:200px;
width:200px;
object-fit:contain;
margin-bottom:50px;
`