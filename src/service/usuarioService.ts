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
const getToken = (): string | null => {
    return localStorage.getItem('token');
};
export const getUsuarios = async (page: number, size: number): Promise<DatosListadoUsuario[]> => {
    const token = getToken();
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


export const deleteUsuario = async (id: number) => {
    const token = getToken();
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
