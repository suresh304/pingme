import { createContext, useContext, useEffect, useState } from "react";

export const SocketContext = createContext()
import React from 'react'
import { authContext } from "./AuthContext";
import io from 'socket.io-client'

const SocketcontextProvider = ({children}) => {
    const [socket,setSocket] = useState(null)
    const [onlineUsers,setOnlineUsers] = useState([])
    const {user} = useContext(authContext)
    console.log(user)

useEffect(() => {
    if(user){
        const socket = io("http://localhost:3002",{
            query:{
                userId:user._id,
            },
        })
        setSocket(socket)
        //listen the events on client and server side both
        socket.on("getOnlineUsers",(users)=>{
            setOnlineUsers(users)

        })

        return ()=>socket.close()
    }
    else{
        if(socket){
            socket.close() 
            setSocket(null) 
        }
    }
  

  
}, [user])


  return (
    <SocketContext.Provider value={{socket,onlineUsers}}>
        {children}

    </SocketContext.Provider>
  )
}

export default SocketcontextProvider