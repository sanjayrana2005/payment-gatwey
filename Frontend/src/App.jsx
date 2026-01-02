import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Components/Login'
import Subscription from './Components/Subscription'
import Signup from './Components/Signup'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/subscription' element={<Subscription />} />
    </Routes>
  )
}

export default App
