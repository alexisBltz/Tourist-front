import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { login as loginService } from './authService';

interface User {
    token: string;
    rol: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Carga el usuario desde localStorage
        const token = localStorage.getItem('token');
        const rol = localStorage.getItem('rol');

        if (token && rol) {
            setUser({ token, rol });
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const data = await loginService(email, password);
            setUser({ token: data.token, rol: data.rol });
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('rol');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
