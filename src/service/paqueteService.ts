
const API_URL = 'http://localhost:8091';
export interface PaqueteData {
    id: number;
    nombre: string;
    imagen: string;
    estadoRegistro: string;
}

const getToken = (): string | null => {
    return localStorage.getItem('token');
};
export const getPaquetes = async (page: number, size: number): Promise<PaqueteData[]> => {
    try {
        const response = await fetch(`${API_URL}/paquete?page=${page}&size=${size}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Error fetching paquetes');
        }
        const data = await response.json();
        console.log('Datos recibidos del backend:', data); // Log para verificar datos
        return data.content && Array.isArray(data.content) ? data.content : [];
    } catch (error) {
        console.error('Error fetching paquetes:', error);
        throw error;
    }
};

export const buscarPaquete = async (nombre: string) => {
    try {
        const response = await fetch(`${API_URL}/paquete/buscar?nombre=${nombre}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Error en la búsqueda');
        }
        const data = await response.json();

        console.log('Datos buscados en el backend:', data);
        // Supongamos que el array está en `data.content`
        const paquetesArray = data.content && Array.isArray(data.content) ? data.content : [];
        console.log(paquetesArray);
        return paquetesArray;
    } catch (error) {
        console.error('Error en la recuperación de los paquetes:', error);
        throw error;
    }
};