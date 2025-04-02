import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const checkAuth = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/user/info', {
                withCredentials: true,
            });
            if (response.data != null) {
                setUser(response.data); 
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error('Lỗi khi kiểm tra xác thực:', error);
        }
    }
    useEffect(() => {
        checkAuth();
    }, []);

    const logout = async (data) => {
        try {
            await axios.post('http://localhost:3000/logout', {}, { withCredentials: true });
            setUser(null);
        } catch (error) {
            console.error('Lỗi khi đăng xuất:', error);
        }
    }
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
