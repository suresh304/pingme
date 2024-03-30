import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import UseSignup from "../../Hooks/UseSignup"
import { authContext } from "../../context/AuthContext"

const Signup = () => {
    const {user} = useContext(authContext)
    const navigate = useNavigate()
    const [signupInputs, setSignupInputs] = useState({
        fullName: "",
        userName: "",
        password: "",
        confirmPassword: "",
        gender: ""
    })

    const { signup } = UseSignup()
    const submitHandler = async (e) => {
        e.preventDefault()
        await signup(signupInputs)
    }
    useEffect(()=>{
        if(user) navigate("/")
    },[user,navigate])
    return (
        <div className='flex flex-col pt-14 w-1/4 justify-center items-center min-w-96 mx-auto text-center'>
            <div className=' p-6 h-full  w-full bg-blue-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-60 border border-gray-10'>
                <h1 className='p- font-semibold text-2xl text-white'>Signup</h1>
                <form onSubmit={submitHandler}>
                    <div>
                        <label className="label p-2">
                            Full name
                        </label>
                        <input type="text" id="fullName" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" onChange={(e) => setSignupInputs({ ...signupInputs, fullName: e.target.value })}/>
                    </div>

                    <div>
                        <label className="label p-2">
                            userName
                        </label>
                        <input type="text" id="userName" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" onChange={(e) => setSignupInputs({ ...signupInputs, userName: e.target.value })} />
                    </div>
                    <div>
                        <label className="label p-2">
                            password
                        </label>
                        <input type="password" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" onChange={(e) => setSignupInputs({ ...signupInputs, password: e.target.value })} />
                    </div>
                    <div>
                        <label className="label p-2">
                            confirm password
                        </label>
                        <input type="password" id="password" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" onChange={(e) => setSignupInputs({ ...signupInputs, confirmPassword: e.target.value })} />
                    </div>
                    <div>
                        <label className="label p-2">
                            Gender
                        </label>

                        {/* <div className="dropdown dropdown-hover">
                            <div tabIndex={0} role="button" className="btn m-1">gender</div>
                            <ul tabIndex={0} id="gender" className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52" onChange={(e) => setSignupInputs({ ...signupInputs, gender: e.target.value })}>
                                <li><a>male</a></li>
                                <li><a>female</a></li>
                            </ul>
                        </div> */}


                        <select className="select select-bordered w-full max-w-xs" onChange={(e) => setSignupInputs({ ...signupInputs, gender: e.target.value })}>
                            <option disabled selected>gender</option>
                            <option value={"male"}>male</option>
                            <option value={"female"}>female</option>
                        </select>

                    </div>
                    <div className="mt-5"><button className="btn btn-block">signup</button></div>
                    <span>already have an account <Link to="/login">Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup