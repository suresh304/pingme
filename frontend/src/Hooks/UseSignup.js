import { useContext, useState } from "react"
import toast from "react-hot-toast"
import { authContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const UseSignup = () => {
    const {user,setUser} = useContext(authContext)
    const navigate = useNavigate()

    const [loading,setLoading] = useState(false)

    const signup = async ({fullName,userName,password,confirmPassword,gender})=>{
        const valid = inputValidation(fullName,userName,password,confirmPassword,gender)
        if(!valid) return false
        setLoading(true)
        try {

            const res = await fetch("http://localhost:3002/api/auth/signup",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({fullName,userName,password,confirmPassword,gender})
            })

            const data = await res.json()
            console.log(data)
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

    return {loading,signup}
  
}

export default UseSignup


function inputValidation(fullName,userName,password,confirmPassword,gender) {
    if(!fullName|| !userName|| !password ||!confirmPassword|| !gender) {
        toast.error("some fields are empty")
            return false
        }
        if(password !== confirmPassword){
            toast.error("confirm pasword mismatch")
            return false
        }
        if(password.length<6){
            toast.error("password must be 6 letters or more")
            return false
        }
        return true
    
}