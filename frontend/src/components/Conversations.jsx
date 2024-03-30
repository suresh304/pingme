import { useContext, useState } from "react"
import useGetConversations from "../Hooks/useGetConversations"
import SingleConv from "./SingleConv"
import { json } from "react-router-dom"
import useConversation from "../../zustand/useConversation"
import { SocketContext } from "../context/Socketcontext"

const Conversations = () => {

  const {loading,conversations} = useGetConversations()
  console.log(conversations,"converrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")

  return (
    <div className="h-5/6 bg-slate-700 rounded-lg m-2 overflow-y-auto">
      {conversations&&conversations?.map((conv,i)=><SingleConv conv={conv} key={conv._id}/>)}
    </div>
  )
}

export default Conversations