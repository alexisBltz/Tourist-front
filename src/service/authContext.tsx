import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { login as loginService, User as AuthServiceUser } from './authService';

interface User {
    id: number;
    login: string;
    rol: string;
    datosUsuarios: {
        id: number;
        nombre: string;
        apellidoPaterno: string;
        apellidoMaterno: string;
        direccion: string;
        fechaNacimiento: string;
        nacionalidad: string;
        celular: string;
    }[];
    token: string;
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
        const storedUser = localStorage.getItem('user');
        console.log('Stored User:', storedUser);
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error('Error parsing stored user:', error);
            }
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const data = await loginService(email, password);
            setUser(data);
            console.log("Verificando que llegue: "+data);
            localStorage.setItem('user', JSON.stringify(data));
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
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
