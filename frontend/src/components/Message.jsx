import { useContext } from "react"
import { authContext } from "../context/AuthContext"

const Message = (chat) => {
  const {user} = useContext(authContext)
  console.log("userId",user._id)
  console.log("senderId",chat?.chat?._id)

  const isSender = user._id == chat?.chat?.senderId
  console.log("isthis sender",isSender)
  return (
    <div className={`flex  w-fit ${isSender?"float-right rounded-bl-3xl bg-blue-400  ":"float-left rounded-br-3xl bg-black text-white "}   px-5 justify-around flex-row h-14 m-3 text-cyan-900 items-center`}>
        <div className="w-10 my-auto text-center">
            <img src="https://avatar.iran.liara.run/public" alt="avatar" />
        </div>
        <div className="text-slate-50 text-wrap px-5">{chat?.chat?.message}</div>
        <div></div>
    </div>
  )
}

export default Message