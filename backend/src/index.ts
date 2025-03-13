import { WebSocketServer,WebSocket } from "ws";

const wss = new WebSocketServer({port:8060})

interface User{
    socket:WebSocket,
    roomId:string,
    userId:string
}

let allsockets:User[] = []

wss.on("connection",(socket)=>{

    console.log("connected");
    
    socket.on("message",(message)=>{
       
      // @ts-ignore
       const parsedMessage = JSON.parse(message);

       if(parsedMessage.type==="join_room"){
        console.log("yes");
        allsockets.push({
            socket,
            roomId:parsedMessage.payload.roomId,
            userId:parsedMessage.payload.userId
        })
       }

       if(parsedMessage.type==="chat"){
        console.log("chating");
         const currentUser=allsockets.find((x)=>x.socket===socket)
         const room =currentUser?.roomId
          const users =allsockets.filter((x)=>x.roomId===room) 
          console.log(parsedMessage);
          users.forEach((user)=>{
            if(user.roomId===parsedMessage.payload.roomId && user.socket!==socket){
                user.socket.send(JSON.stringify({
                    type:"chat",
                    message:parsedMessage.payload.message
                }))
                console.log("works");
            }
          })    
       }


    })

    socket.on("close", () => {
        console.log("Client disconnected");
    });
})
