
import express from 'express'
import { WebSocketServer,WebSocket } from 'ws'

const app = express();
const httpServer = app.listen(8080);

const wss = new WebSocketServer({ server: httpServer });
const users = new Map<string,WebSocket>();


//Data receiving and sending.
//1. sending : Always send a string.
//2. receiving : Always stringify the data before using. 
wss.on('connection',(ws,req) => {
    const userId = req.url?.split('?id=')[1];
    users.set(userId || "",ws);
    

    ws.on('message', (data) => {
        //data -> 1. Received from client.
        //        2. Type of data send from client side = Stringify JSON
        //        3. Type of data received here = Bytes stream something of Stringify JSON.
        //        4. What to do ??
        //           a. Convert data to string... const safeData = data.toString().
        //           b. Now parse the safeData to get the JSON.

        const safeData = data.toString()
        const {message , receiverId} = JSON.parse(safeData);
        const receiverWs = users.get(receiverId);
        if(receiverWs){
            receiverWs.send(JSON.stringify({message : message}))
        }else{
            console.log("no user")
        }

    })
    ws.on('error',(err) => {
        console.log(err)
    })
})
