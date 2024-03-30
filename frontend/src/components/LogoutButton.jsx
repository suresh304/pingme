import { useContext } from "react"
import { authContext } from "../context/AuthContext"
import UseLogout from "../Hooks/UseLogout"

const LogoutButton = () => {
  const {user} = useContext(authContext)
  const {loading,logout} = UseLogout();
  return (
    <div className="p-2 m-2">

    <button className="btn btn-block p-2" onClick={logout}>Logout</button>
    </div>
  )
}

export default LogoutButton