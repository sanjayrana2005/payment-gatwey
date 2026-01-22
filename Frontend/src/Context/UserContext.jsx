import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export const userContext = createContext()

const UserContext = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState(false);

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user"))
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/check`, {
                    withCredentials: true
                });
                setAuth(true);
                setLoading(false)
            } catch (error) {
                setAuth(true);
            } finally {
                setLoading(false)
            }
        }
        fetchData();
    }, []);
    return (
        <userContext.Provider value={{ auth, loading, setAuth, user, setUser }}>
            {children}
        </userContext.Provider>
    )
}

export default UserContext
