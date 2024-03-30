import React from 'react'
import Sidebar from '../../components/Sidebar'
import MessageContainer from '../../components/MessageContainer'
import { AuthProvider } from '../../context/AuthContext'

const Home = () => {
    return (
        <div className='flex flex-row sm:h-[450px] md:h-[full] lg:h-full
    h-full w-full bg-white-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-50 border border-gray-100 home'>
          <Sidebar/>
          <MessageContainer/>
          
        </div>
    )
}

export default Home