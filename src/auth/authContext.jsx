import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export default function AuthProvider({children}) {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const [userScope, setUserScope] = useState(null);

    const logout = () => {
        setToken(null);
        setIsAuthenticated(false);
        setUserId(null);
        setUserScope(null);
        localStorage.removeItem('token');
    }

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        }
    }, [token]);

    // .ok es propio de fetch, axios manda a catch los 400 solo
    useEffect(() => {
        const verifyToken = async () => {
            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await axios.get('http://localhost:3000/users/auth/me', {
                    headers: {
                        Authorization: `Bearer ${token}`
                }});
                setIsAuthenticated(true);
                setUserId(response.data.id);
                setUserScope(response.data.scope);
            } catch (err) {
                logout();
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }

        verifyToken();
    }, [token])

    return (
        <AuthContext.Provider value={{token, setToken, logout, isAuthenticated, isLoading, userId, userScope}}>
            {children}
        </AuthContext.Provider>
    );
}
