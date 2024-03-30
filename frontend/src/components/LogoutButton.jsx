import UseLogout from "../Hooks/UseLogout"

const LogoutButton = () => {
  const {logout} = UseLogout();
  return (
    <div className="p-2 m-2">

    <button className="btn btn-block p-2" onClick={logout}>Logout</button>
    </div>
  )
}

export default LogoutButton