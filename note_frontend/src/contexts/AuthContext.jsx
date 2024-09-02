import React, { createContext, useState, useContext, useEffect } from 'react';
import server from '../server/server';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(()=>{
        const loadUser = async () =>
        {
            if(token)
            {
                try{
                    const response = await server.get('/user',{
                        headers: {Authorization: `Bearer ${token}`},
                    });
                    setUser(response.data.user);
                }catch(error){
                    logout();
                }
            }
        };
        loadUser();
    }, [token]);

    const login = async (email, password) => {
        try {
            const response = await server.post('/login', { email, password });
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            setToken(token);
            setUser(user);
            return true;
        } catch (error) {
            return error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };



    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
