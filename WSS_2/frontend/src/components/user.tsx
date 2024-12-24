import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

export default function User(){
    const[socket,setSocket] = useState<null|WebSocket>(null)
    const [message,setMessage] = useState("");
    const[socketMsg,setSocketMsg] = useState<string[]>([])
    const {id} = useParams();
    useEffect(() => {
        const socket = new WebSocket(`ws://localhost:8080?id=${id}`);
        socket.onopen = () => {
            setSocket(socket)
        }
        socket.onmessage = (msg) => {
            setSocketMsg(sc => [...sc,JSON.parse(msg.data).message])
        }
        return () =>{
            socket.close()
        }
    },[])
    return(
        <>
        <div className="flex w-screen h-screen justify-center items-center bg-gray-200">
            <form onSubmit={(e) => {e.preventDefault()}} className="w-1/3 flex flex-col gap-4 bg-white px-4 py-6 rounded-lg">
                <input type="text" className="w-full px-3 py-2 border border-slate-800 rounded-lg" placeholder="Write something ..." onChange={(e) => {setMessage(e.target.value)}}/>
                <button type="submit" className="cursor-pointer bg-slate-900 text-white px-3 w-full py-2 rounded-lg" onClick={() => {socket?.send(JSON.stringify({message : message ,receiverId : "2"}))}}>Send</button>
            </form>
            <div className="flex flex-col gap-4">
            {socketMsg.map((msg,id) => {
                return (
                    <div key = {id}>
                        {msg}
                    </div>
                )
                })}
            </div>
        </div>

        </>
    )
}