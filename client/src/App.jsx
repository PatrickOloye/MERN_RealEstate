import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Header from './components/Header'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from './components/PrivateRoute'

const App = () => {
  return (
    <BrowserRouter>
    <ToastContainer />
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      {/* <Route  element={<PrivateRoute/>}>
      <Route path='/profile' element={<Profile/>}/>
      </Route> */}

<Route path="/profile" element={<PrivateRoute />}>
          <Route index element={<Profile />} />
        </Route>
      <Route path='/sign-in' element={<SignIn/>}/>
      <Route path='/sign-up' element={<SignUp/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App 