import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Components/Login'
import Subscription from './Components/Subscription'
import Signup from './Components/Signup'
import { Navigate } from "react-router-dom";

const App = () => {


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("paymentToken"); // or cookie check

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};


  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/subscription' element={
        <ProtectedRoute>
        <Subscription />
        </ProtectedRoute>
        } />
    </Routes>
  )
}

export default App
