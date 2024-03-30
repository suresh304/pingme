/* eslint-disable react/prop-types */

import { useContext } from "react"
import useConversation from "../../zustand/useConversation"
import { SocketContext } from "../context/Socketcontext"

const SingleConv = ({conv}) => {

  const {selectedConvo,setSelectedConvo} = useConversation()
  // console.log(selectedConvo)
  const isActiveConv = selectedConvo?._id == conv._id
  const {socket,onlineUsers} = useContext(SocketContext)
  console.log("online users>>>>>>>>>>>>>>>>>>>>>>",onlineUsers)
  const isOnline = onlineUsers.includes(conv._id)

  return (
    <div className={`${isActiveConv?"bg-green-500":""} flex  flex-row h-14 m-2 border-b items-center`} onClick={()=>setSelectedConvo(conv)}>
        <div className="w-10 my-auto text-center">
        {isOnline&&  <div className="w-3 h-3  rounded-full"></div>}
            <img src="https://avatar.iran.liara.run/public" alt="avatar" />
        </div>
        <div className="font-bold text-xl p-10 text-slate-100 font-serif">{conv.fullName}</div>
    </div>
  )
}

export default SingleConv