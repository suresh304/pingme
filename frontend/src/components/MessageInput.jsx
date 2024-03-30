import React, { useEffect, useState } from 'react'
import useConversation from '../../zustand/useConversation'

const MessageInput = (recieverId) => {

    const [loading,setLoading] = useState(false)
  const {selectedConvo,messages,setMessages} = useConversation()

    const [msg,setMsg] = useState()
    const sendMessage = async (e)=>{
        e.preventDefault()
        try {
            setLoading(true)

            const res = await fetch(`http://localhost:3002/api/messages/send/${selectedConvo._id}`,{
                method:"POST",
                credentials:"include",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({"message":msg})
            })
           const json = await res.json()
           setMessages([...messages,json])
            
        } catch (error) {
            console.log("error in sending message",error)
            
        }
        finally{
            setLoading(false)
            setMsg("")

        }

    }
// const enterHandler = (e) =>{
//     if(e.code == "Enter"){
//         sendMessage()
//         document.getElementsByClassName("messages")[0].scrollTo(0, document.body.scrollHeight)
//     }

// }

useEffect(()=>{
    document.getElementsByClassName("messages")[0].scrollTo(0, 3000)

},[messages])

    return (
        <div className=''>
            <form onSubmit={sendMessage} className='flex flex-row my-2'>

            <input type="text" placeholder="search" value={msg} className="input input-bordered input-primary w-full " onChange={(e)=>setMsg(e.target.value)} />
            <div className="">
                <button className="btn btn-block" onClick={sendMessage}>send</button>
            </div>
            </form>
        </div>
    )
}

export default MessageInput