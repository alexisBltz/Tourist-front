// src/services/ventaService.ts

const API_URL = 'http://localhost:8091/venta';

export const getVentas = async (page: number, size: number, token: string | null): Promise<DatosListadoVenta[]> => {

    console.log('Token:', token);
    try {
        const response = await fetch(`${API_URL}?page=${page}&size=${size}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error('Error fetching ventas');
        }
        const data = await response.json();
        console.log('Datos recibidos del backend:', data); // Log para verificar datos

        // Supongamos que el array está en `data.content`
        return data.content && Array.isArray(data.content) ? data.content : [];
    } catch (error) {
        console.error('Error fetching ventas:', error);
        throw error;
    }
};

export interface DatosListadoVenta {
    id: number;
    fecha: string;
    medioPago: string;
    estadoRegistro: string;
    montoTotal: string;
    nombreUsuario: string;
}
export const getVentasPorDia = async (fecha: string, page: number, size: number, token: string | null): Promise<DatosListadoVenta[]> => {
    try {
        const url = `${API_URL}/dia?fecha=${fecha}&page=${page}&size=${size}`;
        console.log('Fetching URL:', url); // Verifica la URL de la solicitud

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Error fetching ventas del día');
        }

        const data = await response.json();
        console.log('Data fetched:', data); // Verifica la respuesta de la API

        return data.content && Array.isArray(data.content) ? data.content : [];
    } catch (error) {
        console.error('Error fetching ventas del día:', error);
        throw error;
    }
};


export const getVentasPorMes = async (mes: number, anio: number, page: number, size: number, token: string | null): Promise<DatosListadoVenta[]> => {
    try {
        const response = await fetch(`${API_URL}/mes?mes=${mes}&anio=${anio}&page=${page}&size=${size}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error('Error fetching ventas del mes');
        }
        const data = await response.json();
        return data.content && Array.isArray(data.content) ? data.content : [];
    } catch (error) {
        console.error('Error fetching ventas del mes:', error);
        throw error;
    }
};

export const getVentasPorAnio = async (anio: number, page: number, size: number, token: string | null): Promise<DatosListadoVenta[]> => {
    try {
        const response = await fetch(`${API_URL}/anio?anio=${anio}&page=${page}&size=${size}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error('Error fetching ventas del año');
        }
        const data = await response.json();
        return data.content && Array.isArray(data.content) ? data.content : [];
    } catch (error) {
        console.error('Error fetching ventas del año:', error);
        throw error;
    }
};
