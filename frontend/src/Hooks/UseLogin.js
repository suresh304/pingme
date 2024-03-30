import { useContext, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { authContext } from "../context/AuthContext"

const UseLogin = () => {
    const [loading,setLoading] = useState(false)
    const {user,setUser} = useContext(authContext)
    const navigate = useNavigate()

    const login = async ({userName,password})=>{
        const valid = inputValidation(userName,password)
        if(!valid) return false
        setLoading(true)
        try {

            const res = await fetch("http://localhost:3002/api/auth/login",{
                method:"POST",
                credentials:"include",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({"userName":userName,"password":password,})
            })

            const data = await res.json()
            if(data.error)
            {
                throw new Error(data.error)
            }

            localStorage.setItem("user",JSON.stringify(data))
            setUser(data)
            navigate("/")

            return data
            
        } catch (error) {
            console.log("error in useSignuphook",error)
            
        }finally{
            setLoading(false)
        }
        

    }

    return {loading,login}
  
}


function inputValidation(userName,password) {
    console.log(userName,password)
    if( !userName|| !password ) {
        toast.error("some fields are empty")
            return false
        }
        
        if(password.length<6){
            toast.error("password must be 6 letters or more")
            return false
        }
        return true
    
}

export default UseLogin