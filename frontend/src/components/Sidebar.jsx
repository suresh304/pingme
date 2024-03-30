import Search from './Search'
import Conversations from './Conversations'
import LogoutButton from './LogoutButton'

const Sidebar = () => {
  return (
    <div className= 'flex flex-col text-center w-1/5 bg-slate-400'> 
    <Search/>
    <Conversations/>
    <LogoutButton/>
    </div>
  )
}

export default Sidebar