import React, { useContext, useState } from 'react'
import { authContext } from '../context/AuthContext'
import toast from 'react-hot-toast';

const UseLogout = () => {
    const [loading,setLoading] = useState(false);
    const {user,setUser} = useContext(authContext);

    const logout = async()=>{

        try {

            const res = await fetch("http://localhost:3002/api/auth/logout",{
                method:"GET",
                headers:{"Content-Type":"application/json"},
            })
    
            const data = await res.json()
            console.log("logout data",data)
            if(data.error)
            {
                throw new Error(data.error)
            }
    
            localStorage.removeItem("user")
            setUser(null)
    
            return data
            
        } catch (error) {
            console.log("error in uselogout",error)
            toast.error(error.message)
    
            
        }finally{
            setLoading(false)
        }

    }

    return {loading,logout}
    
  
}

export default UseLogout