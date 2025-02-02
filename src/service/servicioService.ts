const API_URL = import.meta.env.VITE_API_URL; // Reemplaza con la URL de tu API

export interface ServicioData {
    id: number;
    image: string;
    nombre: string;
    descripcion: string;
    fecha: string;
    costo: number;
    destino: string;
    estadoRegistro: string;
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
        return await response.json();
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
        return data.content && Array.isArray(data.content) ? data.content : [];
    } catch (error) {
        console.error('Error fetching servicios:', error);
        throw error;
    }
};

export const getServiciosActivos = async (page: number, size: number): Promise<ServicioData[]> => {
    try {
        const response = await fetch(`${API_URL}/servicio/activos?page=${page}&size=${size}`, {
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
        return data.content && Array.isArray(data.content) ? data.content : [];
    } catch (error) {
        console.error('Error fetching servicios:', error);
        throw error;
    }
};

export const getServiciosInactivos = async (page: number, size: number): Promise<ServicioData[]> => {
    try {
        const response = await fetch(`${API_URL}/servicio/inactivos?page=${page}&size=${size}`, {
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
        return data.content && Array.isArray(data.content) ? data.content : [];
    } catch (error) {
        console.error('Error fetching servicios:', error);
        throw error;
    }
};


interface CrearServicio {
    image: string;
    descripcion: string;
    nombre: string;
    fecha: string;
    costo: string;
    tipo: string;
    destino: string;
    estadoRegistro: string;
}
export const createServicio = async (crearServicio: CrearServicio, token: string|null ) => {

    try {
        const response = await fetch(`${API_URL}/servicio`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(crearServicio),
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

export const inactivarServicio = async (id: number, token:string |null) => {

    try {
        const response = await fetch(`${API_URL}/servicio/inactivar/${id}`, {
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
export const activarServicio = async (id: number, token:string |null) => {

    try {
        const response = await fetch(`${API_URL}/servicio/activar/${id}`, {
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
export const getDestinos = async (): Promise<string[]> => {
    try {
        const response = await fetch(`${API_URL}/servicio/destino`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Error fetching destinos');
        }
        const data = await response.json();
        console.log('Datos de destinos recibidos del backend:', data);

        // Extraer destinos del array `content` en el JSON recibido
        const destinosArray = data.content && Array.isArray(data.content)
            ? data.content.map((item: { destino: string }) => item.destino)
            : [];
        console.log("Destinos del array:", destinosArray);
        return destinosArray;
    } catch (error) {
        console.error('Error fetching destinos:', error);
        throw error;
    }
};
export const getDatosDestinos = async (page: number, size: number, destinos: string[] = []): Promise<ServicioData[]> => {
    try {
        // Construye los parámetros de la query string
        const queryParams = new URLSearchParams();
        queryParams.append('page', page.toString());
        queryParams.append('size', size.toString());

        // Agrega los destinos a los parámetros de la query string si existen
        if (destinos.length > 0) {
            destinos.forEach(destino => queryParams.append('destinos', destino));
        }

        // Realiza la solicitud al backend
        const response = await fetch(`${API_URL}/servicio/destino?${queryParams.toString()}`, {
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

export const listarServicios = async (): Promise<ServicioData[]> => {
    try {
        const response = await fetch(`${API_URL}/servicio`);
        if (!response.ok) {
            throw new Error('Error fetching servicios');
        }
        const data = await response.json();
        return data.content || []; // Ajusta según la estructura de la respuesta
    } catch (error) {
        console.error('Error fetching servicios:', error);
        throw error;
    }
};


