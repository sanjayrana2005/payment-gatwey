import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Components/Login'
import Subscription from './Components/Subscription'
import Signup from './Components/Signup'
import { Navigate } from "react-router-dom";
  import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);

   const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

const ProtectedRoute = ({ children }) => {
  if (loading) return <p>Loading...</p>;
  return auth ? children : <Navigate to="/login" replace />;
};

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/check`, {
      withCredentials: true
    })
    .then(() => {
      setAuth(true);
      setLoading(false);
    })
    .catch(() => {
      setAuth(false);
      setLoading(false);
    });
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Home isAuth={auth}/>} />
      <Route path='/login' element={<Login setUser={setUser}/>} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/subscription' element={
        <ProtectedRoute>
          <Subscription user={user}/>
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default App
