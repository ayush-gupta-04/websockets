import { useEffect, useState } from "react"

export default function App() {
  const[socket,setSocket] = useState<null|WebSocket>(null)
  const[message,setMessage] = useState('')
  const[socketMsg,setSocketMsg] = useState<string[]>([])

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      setSocket(socket)
    }
    socket.onmessage = (msg) => {
      setSocketMsg(sc => [...sc,msg.data])
    }
    return () =>{
      socket.close()
    }
  },[])

  return (
    <div className="bg-gray-300 w-full h-screen flex justify-center items-center ">
      <div className="flex flex-col gap-3 w-1/3 h-fit">
      <div className="w-full bg-white rounded-md flex flex-col gap-6 px-4 py-6">
        <input type="text" className="px-3 py-3 border border-gray-600 rounded-md " onChange={(e) => {setMessage(e.target.value)}}/>
        <button className="bg-gray-800 py-3 text-white" onClick={() => {socket!.send(message)}}>{socket?"Send":"Connecting..."}</button>
      </div>
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
    </div>
  )
}
