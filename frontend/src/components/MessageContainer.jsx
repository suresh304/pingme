import { useContext, useEffect } from "react"
import useConversation from "../../zustand/useConversation"
import Message from "./Message"
import MessageInput from "./MessageInput"
import { authContext } from "../context/AuthContext"
import UseChat from "../Hooks/UseChat"
import UseListenMessages from "../Hooks/UseListenMessages"

const MessageContainer = () => {
  const {selectedConvo,setSelectedConvo,messages,setMessages} = useConversation()
  const {user} = useContext(authContext)
  console.log(selectedConvo?._id)

  
  console.log(user)
  console.log(selectedConvo,"message container")
  const {chatData} = UseChat(selectedConvo?._id)
  UseListenMessages()

  useEffect(() => {
    
    // setMessages(chatData)
  
    return () => {
      setSelectedConvo(null)
    }
  }, [setSelectedConvo])

  useEffect(()=>{
    setMessages(chatData)
  },[chatData,setMessages])
  
  
   

  

  return selectedConvo?(
    <div className='w-4/5    overflow-y-auto flex flex-col justify-between' >
      <div className="h-20 bg-yellow-200 text-center">
        <span className="pl-10 text-teal-950 font-extrabold text-2xl">{selectedConvo.fullName}</span>
      </div>
      <div className="flex flex-col h-[10/12] overflow-y-auto messages">

{messages?.map((chat,i)=><div key={i} className=""><Message chat={chat}/></div>)}
      </div>
      <div className="h-[2/12]">
        <MessageInput/>
      </div>
      
      

    </div>
  ):<div className="flex flex-row  ">
    <img src="../welcome.png" />
     <div className="flex mt-80 text-5xl font-serif" >Welcome ,<span className="text-white">{user.fullName}</span></div>
     </div>
}

export default MessageContainer