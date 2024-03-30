import React from 'react'
import ReactDOM from 'react-dom/client'
import {Toaster} from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/Login.jsx';
import Signup from './pages/signup/Signup.jsx';
import AuthRoute from './components/AuthRoute.jsx'
import SocketcontextProvider from './context/Socketcontext.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element:<AuthRoute><Home/></AuthRoute>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/signup",
    element:<Signup/>
  }

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='w-full h-screen'>
      <AuthProvider>
        <SocketcontextProvider>

       <RouterProvider router={router} />
        </SocketcontextProvider>
      </AuthProvider>
    <Toaster/>
    </div>
  </React.StrictMode>,
)




// both works this is previous version routs

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; // Import BrowserRouter
// import App from './App.jsx';
// import { Toaster } from 'react-hot-toast';
// import { AuthProvider } from './context/AuthContext.jsx';
// import './index.css';
// import Home from './pages/Home/Home.jsx';
// import Login from './pages/Login/Login.jsx';
// import Signup from './pages/signup/Signup.jsx';

// // Define routes
// const routes = [
//   {
//     path: '/',
//     element: <Home />,
//   },
//   {
//     path: '/login',
//     element: <Login />,
//   },
//   {
//     path: '/signup',
//     element: <Signup />,
//   },
// ];

// // Render the app
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <div className='w-full h-screen'>
//       <AuthProvider>
//         <Router>
//           <Routes>

//             <Route path='/' element={<Home />}/>
//             <Route path='/login' element={<Login />}/>
//             <Route path='/signup' element={<Signup />}/>
//           </Routes>
//         </Router>
//       </AuthProvider>
//       <Toaster />
//     </div>
//   </React.StrictMode>
// );
