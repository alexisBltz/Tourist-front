
const API_URL = import.meta.env.VITE_API_URL;
export interface PaqueteData {
    id: number;
    nombre: string;
    imagen: string;
    estadoRegistro: string;
}
export interface ServicioData {
    id: number;
    image: string;
    descripcion: string;
    nombre: string;
    costo: number;
    destino: string;
    fecha: string;
}

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
        return data;
    } catch (error) {
        console.error('Error en la recuperación de los paquetes:', error);
        throw error;
    }
};
export const getServiciosPorPaquete = async (paqCod: number) => {
    try {
        const response = await fetch(`${API_URL}/paquete/${paqCod}/servicios`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Error fetching servicios');
        }
        const data = await response.json();
        console.log('Datos recibidos del backend (servicios):', data);
        return data.content && Array.isArray(data.content) ? data.content : [];
    } catch (error) {
        console.error('Error fetching servicios:', error);
        throw error;
    }
};
export const deletePaquete = async (id: number, token : string |null) => {

    try {
        const response = await fetch(`${API_URL}/paquete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error('Error deleting servicio');
        }
    } catch (error) {
        console.error('Error deleting servicio:', error);
        throw error;
    }
};

interface PaqueteServicio {
    paqEstReg: string;
    paqImg: string;
    nombre: string;
    serviciosCodigos: number[];
}

export const createPaquete = async (paqueteServicio: PaqueteServicio, token:string |null) => {

    try {
        const response = await fetch(`${API_URL}/paquete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(paqueteServicio),
        });

        if (!response.ok) throw new Error('Error creating paquete');
        return await response.json();
    } catch (error) {
        console.error('Error creating paquete:', error);
        throw error;
    }
};