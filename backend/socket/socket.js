import  Express  from "express";
import { Server } from "socket.io";

import http from "http"

export const app = Express()

export const server = http.createServer(app)

export const io = new Server(server,{
    cors:{
        origin:["http://localhost:5173"],
        methods:["GET","POST"]
    }
})

export const getRecieverSocketId = (recieverId)=>{
    return userSocketMap[recieverId]

}
const userSocketMap = {}
io.on('connection',(socket)=>{
    console.log("user connected ",socket.id)
    const userId = socket.handshake.query.userId
    if(userId !== undefined){
        userSocketMap[userId] = socket.id
    }

    io.emit("getOnlineUsers",Object.keys(userSocketMap))

    socket.on("disconnect",()=>{
        console.log("user Disconnected",socket.id)
        delete userSocketMap[userId]
        io.emit("getOnlineUsers",Object.keys(userSocketMap))
    })
})