import useAuthToken from './useAuthToken';

const API_URL = 'http://localhost:8091';  // Reemplaza con la URL de tu API

export interface DatosListadoDatosUsuario {
    id: number;
    nombre: string;
    apellidoPaterno: string;
    celular: string;
}

export interface DatosListadoUsuario {
    id: number;
    login: string;
    estadoRegistro: string;
    rol: string;
    datosUsuarios: DatosListadoDatosUsuario[];
}

export const getUsuarios = async (page: number, size: number, token: string | null): Promise<DatosListadoUsuario[]> => {
    try {
        const response = await fetch(`${API_URL}/user?page=${page}&size=${size}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error('Error fetching usuarios');
        }
        const data = await response.json();
        return data.content; // Ajusta según la estructura de tu API
    } catch (error) {
        console.error('Error fetching usuarios:', error);
        throw error;
    }
};

export const deleteUsuario = async (id: number, token: string | null) => {
    try {
        const response = await fetch(`${API_URL}/user/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error('Error deleting usuario');
        }
    } catch (error) {
        console.error('Error deleting usuario:', error);
        throw error;
    }
};

export const updateUsuarioRol = async (id: number, nuevoRol: string, token: string | null) => {
    try {
        const response = await fetch(`${API_URL}/user/${id}/rol?nuevoRol=${nuevoRol}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error('Error updating user role');
        }
    } catch (error) {
        console.error('Error updating user role:', error);
        throw error;
    }
};

interface DatosRegistroUsuario {
    image: string;
    descripcion: string;
    nombre: string;
    fecha: string;
    costo: number;
    tipo: string;
    destino: string;
    estadoRegistro: string;
}

export const registrarUsuario = async (datosRegistroUsuario: DatosRegistroUsuario, token: string | null) => {
    try {
        const response = await fetch(`${API_URL}/usuario`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(datosRegistroUsuario),
        });
        if (!response.ok) {
            throw new Error('Error al registrar el usuario');
        }
        return await response.json();
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        throw error;
    }
};
