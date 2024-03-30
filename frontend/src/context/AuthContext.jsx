import { createContext, useState } from "react";
import { json } from "react-router-dom";

export const authContext = createContext({})
export const AuthProvider = ({children}) =>{
    const [user,setUser] = useState(JSON.parse(localStorage.getItem("user")||null))

    return <authContext.Provider value={{user,setUser}}>
        {children}
    </authContext.Provider>

}