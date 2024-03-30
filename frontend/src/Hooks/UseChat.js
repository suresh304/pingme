// import  { useState } from 'react'

// const UseChat = () => {
//  const [loading,setLoading] = useState(false)
//  const chatMessages = async(id)=>{
//     if(!id)
//     return
//     try {
//         setLoading(true)
//           const chats =await fetch("http://localhost:3002/api/messages/"+id,{
//             method:"GET",
//                 headers:{"Content-Type":"application/json"},
//                 credentials:'include'
//           })
//           const data = await chats.json()
//           console.log("chat messsa>>>>>>>>>>>>>>>>>",data)

        
//     } catch (error) {
//         console.log("error in useChat",error)
        
//     }finally{
//         setLoading(false)
//     }
//  }
//  return {loading,chatMessages}
// }

// export default UseChat






import { useState, useEffect } from 'react';

const UseChat = (id) => {
  const [loading, setLoading] = useState(false);
  const [chatData, setChatData] = useState(null);

  const chatMessages = async (id) => {
    if (!id) return;
    try {
      setLoading(true);
      const chats = await fetch(`http://localhost:3002/api/messages/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      const data = await chats.json();
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>chat messages:", id,data);
      setChatData(data);
    } catch (error) {
      console.error("Error in useChat:", error);
    } finally {
      setLoading(false);
    }
  };

  // If `id` changes, fetch new chat messages
  useEffect(() => {
    chatMessages(id);
  }, [id]); // Assuming `id` is a dependency

  return { loading, chatData };
};

export default UseChat;
