import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import UseLogin from "../../Hooks/UseLogin"
import { authContext } from "../../context/AuthContext"

const Login =  () => {
    const navigate = useNavigate()
    const {user} = useContext(authContext)
    const [loginInputs, setLoginInputs] = useState({
        userName: "",
        password: "",
    })

   const {login} = UseLogin()

   const submitHandler = async (e) => {
    e.preventDefault()
   await login(loginInputs)
}

useEffect(()=>{
    if(user) navigate("/")
},[user,navigate])

   
    
    return (
        <div className=' pt-14 w-1/4 flex flex-col justify-center items-center min-w-96 mx-auto login'>
            <div className=' p-6 h-full  bg-blue-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-60 border border-gray-10'>
                <h1 className='p- font-semibold text-2xl text-slate-50'>Login</h1>
                <form className="w-3/4 justify-center items-center" onSubmit={submitHandler}>
                    <div>
                        <label className="label p-4">
                            Username
                        </label>
                        <input type="text" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" onChange={(e) => setLoginInputs({ ...loginInputs, userName: e.target.value })} />
                    </div>
                    <div>
                        <label className="label p-4">
                            password
                        </label>
                        <input type="password" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" onChange={(e) => setLoginInputs({ ...loginInputs, password: e.target.value })} />
                    </div>
                    <div>

                    <button className="btn btn-block mt-5">Login</button>
                    </div>
                    dont have account <Link to ="/signup"className="link link-info">signup</Link>


                </form>
            </div>
        </div>
    )
}

export default Login