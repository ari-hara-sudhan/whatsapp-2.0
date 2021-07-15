import {Circle} from "better-react-spinkit"

function Loading() {
    return (
        <center style={{display:"grid",placeItems:"center",height:"100vh"}}>
            <div>
                <img src="https://www.bing.com/th?id=OIP.HT81DsS-pt0LE33O5F-_QwHaEK&w=237&h=133&c=8&rs=1&qlt=90&o=6&dpr=1.25&pid=3.1&rm=2"
                height={200}
                style={{marginBottom:10}}
                 />
                 <Circle color="#3CBC28" size={60}/>
                 

            </div>
            
        </center>
    )
}

export default Loading


