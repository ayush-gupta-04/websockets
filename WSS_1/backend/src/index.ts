//1. First request is a http server only then the connection upgrades to websocket.
//2. Websockets 

import express from 'express'
import { WebSocketServer,WebSocket } from 'ws'

const app = express();
const httpServer = app.listen(8080);

const wss = new WebSocketServer({ server: httpServer });



//--------------------------------------------------------------------------------------------------------------------------------
//if i want to send the message to the same client who send the message to web socket.





//everytime there is a connection .. the control will reach inside this.
//and get access to a "ws" instance of websocket
//ws represent a particular client.
wss.on('connection', (ws) => {

    //if there is an error in a particular client .. log the error.
    ws.on('error', (err) => {
        console.log(err)
    });


    //ws represent the specific client.
    //if any client sends a message to the websocket ... then control will reach here.
    //and it will respond back to that particular client who sends the messgae.
    ws.on('message', (data,isBinary) => {
        if(ws.readyState == WebSocket.OPEN){
            ws.send(data, {binary : isBinary})
            console.log(data.toString())
        }
    });


    //this message will be send to everyone who connects the first time.
    ws.send("websocket is connected");
});






//--------------------------------------------------------------------------------------------------------------------------------
//if i want to send the message to the all clients.


//wss is for every client.
wss.on('connection',(ws) => {
    ws.on('error',(err) => {
        console.log(err)
    })
    ws.on('message', (data,isBinary) => {
        wss.clients.forEach((client) => {
            if(client.readyState == WebSocket.OPEN){
                client.send(data,{binary : isBinary})
            }
        })
        console.log(data.toString())
    })
})
