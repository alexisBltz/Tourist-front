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
