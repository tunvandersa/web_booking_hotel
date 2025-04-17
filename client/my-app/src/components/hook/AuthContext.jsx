import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/user/info', {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
            });
            
            if (response.data) {
                setUser(response.data);
                setIsAdmin(response.data.role === 'admin');
            } else {
                setUser(null);
                setIsAdmin(false);
            }
        } catch (error) {
            console.error('Lỗi khi kiểm tra xác thực:', error);
            setUser(null);
            setIsAdmin(false);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        checkAuth();
    }, []);

    const logout = async () => {
        try {
            await axios.post('http://localhost:3000/api/v1/logout', {}, { 
                withCredentials: true 
            });
            setUser(null);
            setIsAdmin(false);
        } catch (error) {
            console.error('Lỗi khi đăng xuất:', error);
        }
    }

    const isAuthenticated = () => {
        return !!user;
    }

    const hasAdminAccess = () => {
        return isAdmin;
    }
    
    return (
        <AuthContext.Provider value={{ 
            user, 
            setUser, 
            isAdmin,
            loading,
            logout,
            isAuthenticated,
            hasAdminAccess
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
