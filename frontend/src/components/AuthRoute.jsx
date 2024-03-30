import React, { useContext } from 'react'
import { authContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const AuthRoute = ({children}) => {
  
    const {user} = useContext(authContext)
  return user?(<>{children}</>):<Navigate to="/login"/>
  
}

export default AuthRoute



