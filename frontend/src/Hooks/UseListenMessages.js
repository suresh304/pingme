import { useContext, useEffect } from "react"
import { SocketContext } from "../context/Socketcontext"
import useConversation from "../../zustand/useConversation"

const UseListenMessages = () => {
  const {socket} = useContext(SocketContext)
  const {messages,setMessages} = useConversation()

  useEffect(()=>{
    socket?.on("newMessage",(newMessage)=>{
        setMessages([...messages,newMessage])
    })

    return ()=>socket?.off("newMessage")
  },[socket,messages,setMessages])
}

export default UseListenMessages