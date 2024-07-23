const API_URL = 'http://localhost:8091';

export interface User {
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

export const login = async (email: string, password: string): Promise<User> => {
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

        // Verifica que los campos esperados existan en la respuesta
        if (!data.token || !data.rol) {
            throw new Error('No hay token ni rol');
        }
        localStorage.setItem('user', JSON.stringify(data));
        console.log(data)
        return data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};
interface UsuarioData {
    login: string;
    clave: string;
    rol: string;
    estadoRegistro: string;
    datosUsuarios: {
        nombre: string;
        apellidoPaterno: string;
        apellidoMaterno: string;
        direccion: string;
        fechaNacimiento: string;
        dni: string;
        nacionalidad: string;
        celular: string;
    }[];
}

export const register = async (userData: UsuarioData) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
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