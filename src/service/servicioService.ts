const API_URL = 'http://localhost:8091';  // Reemplaza con la URL de tu API

export interface ServicioData {
    id: number;
    image: string;
    nombre: string;
    descripcion: string;
    fecha: string;
    costo: number;
    destino: string;
}

export const getServicio = async (id: number) => {
    try {
        const response = await fetch(`${API_URL}/servicio/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Error fetching servicio');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching servicio:', error);
        throw error;
    }
};

export const getServicios = async (page: number, size: number): Promise<ServicioData[]> => {
    try {
        const response = await fetch(`${API_URL}/servicio?page=${page}&size=${size}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Error fetching servicios');
        }
        const data = await response.json();
        console.log('Datos recibidos del backend:', data); // Log para verificar datos

        // Supongamos que el array está en `data.content`
        const serviciosArray = data.content && Array.isArray(data.content) ? data.content : [];
        return serviciosArray;
    } catch (error) {
        console.error('Error fetching servicios:', error);
        throw error;
    }
};

export const createServicio = async (servicioData: ServicioData) => {
    try {
        const response = await fetch(`${API_URL}/servicio`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(servicioData),
        });
        if (!response.ok) {
            throw new Error('Error creating servicio');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating servicio:', error);
        throw error;
    }
};

export const updateServicio = async (id: number, servicioData: Partial<ServicioData>) => {
    try {
        const response = await fetch(`${API_URL}/servicio/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(servicioData),
        });
        if (!response.ok) {
            throw new Error('Error updating servicio');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating servicio:', error);
        throw error;
    }
};

export const deleteServicio = async (id: number) => {
    try {
        const response = await fetch(`${API_URL}/servicio/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
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

export const buscarServicio = async (nombre: string) => {
    try {
        const response = await fetch(`${API_URL}/servicio/buscar?nombre=${nombre}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Error en la busqueda');
        }
        const data = await response.json();

        console.log('Datos buscados en el backend:', data); //blabla para recibir la busqeudaa
        return data;
        // Supongamos que el array está en `data.content`
        const serviciosArray = data.content && Array.isArray(data.content) ? data.content : [];
        console.log(serviciosArray)
        return serviciosArray;
        } catch (error) {
            console.error('Error en la recuperación de los servicios:', error);
            throw error;
        }
}


