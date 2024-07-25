import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {getServiciosPorPaquete, ServicioData,} from "../../service/paqueteService.ts";

import ServicioCardAdmin from "../Servicios/CardAdmin.tsx";
import {inactivarServicio} from "../../service/servicioService.ts";
import useAuthToken from "../../service/useAuthToken.ts";
// Importa la función

const ServiciosDelPaquete: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [servicios, setServicios] = useState<ServicioData[]>([]);
    const token = useAuthToken();
    const [loading, setLoading] = useState(true);
    const eliminarServicio = async (id: number) => {

        try {
            await inactivarServicio(id, token);
            // Actualiza la lista de servicios después de eliminar
            setServicios(prev => prev.filter(servicio => servicio.id !== id));
            console.log(`Servicio con ID ${id} eliminado.`);
        } catch (error) {
            console.error('Error eliminando servicio:', error);
        }
    };
    useEffect(() => {
        const fetchServicios = async () => {
            try {
                if (id) {
                    const servicioData = await getServiciosPorPaquete(Number(id));
                    setServicios(servicioData);
                }
            } catch (error) {
                console.error('Error al obtener los servicios:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchServicios();
    }, [id]);

    if (loading) return <p>Cargando servicios...</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Servicios del Paquete</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {servicios.length > 0 ? (
                    servicios.map(servicio => {
                        console.log('Props para ServicioCard:', servicio); // Verifica las props pasadas a ServicioCard
                        return (
                            <ServicioCardAdmin
                                key={servicio.id}
                                id={servicio.id}
                                image={servicio.image}
                                nombre={servicio.nombre}
                                descripcion={servicio.descripcion}
                                fecha={servicio.fecha}
                                costo={servicio.costo}
                                destino={servicio.destino}
                                onInactivar={eliminarServicio}
                            />
                        );
                    })
                ) : (
                    <p>No hay servicios disponibles para este paquete.</p>
                )}
            </div>
        </div>
    );
};

export default ServiciosDelPaquete;
