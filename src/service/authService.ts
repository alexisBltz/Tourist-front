// src/services/authService.ts
const API_URL = 'http://localhost:8091';  // Reemplaza con la URL de tu API

export const login = async (email: string, password: string) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login: email, clave: password }),
        });
        if (!response.ok) {
            throw new Error('Login failed');
        }
        const data = await response.json();
        // Guarda el token en localStorage o en un contexto global
        localStorage.setItem('token', data.token);
        return data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

export const register = async (email: string, password: string) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
            throw new Error('Registration failed');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};