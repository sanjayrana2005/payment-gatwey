import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Components/Login'
import Subscription from './Components/Subscription'
import Signup from './Components/Signup'
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import { userContext } from './Context/UserContext'

const App = () => {

  const { auth, loading, user, setUser } = useContext(userContext)

  const ProtectedRoute = ({ children }) => {
    if (loading) return <p>Loading...</p>;
    return auth ? children : <Navigate to="/login" replace />;
  };



  return (
    <>
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
      <ToastContainer />
    </>
  )
}

export default App
