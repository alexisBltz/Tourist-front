import React, {useEffect, useState} from "react";
import {activarServicio, getServicios, inactivarServicio, ServicioData} from "../../../service/servicioService.ts";

import ServicioCardAdmin from "../../../components/Servicios/CardAdmin.tsx";
import useAuthToken from "../../../service/useAuthToken.ts";

const ListaDeServiciosAdmin: React.FC = () => {
    const [servicios, setServicios] = useState<ServicioData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [pagina, setPagina] = useState<number>(0);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const token = useAuthToken();
    const fetchServicios = async (pagina: number) => {
        setLoading(true);
        try {
            const data = await getServicios(pagina, 5);
            console.log('Datos obtenidos:', data);

            if (Array.isArray(data)) {
                console.log('IDs recibidos:', data.map(s => s.id));

                setServicios(prev => {
                    // Solo agregar elementos que no estén en el estado anterior
                    const newServicios = [...prev, ...data.filter(s => !prev.some(p => p.id === s.id))];
                    console.log('Servicios después de agregar:', newServicios.map(s => s.id));
                    return newServicios;
                });
                if (data.length < 5) {
                    setHasMore(false);
                }
            } else {
                console.error('La data no es un array:', data);
            }
        } catch (error) {
            console.error('Error fetching servicios:', error);
        } finally {
            setLoading(false);
        }
    };

    const inactivarServicioo = async (id: number) => {
        try {
            await inactivarServicio(id, token);
            // Actualiza el estado del servicio después de inactivarlo
            setServicios(prev =>
                prev.map(servicio =>
                    servicio.id === id ? { ...servicio, estadoRegistro: 'I' } : servicio
                )
            );
            console.log(`Servicio con ID ${id} inactivado.`);
        } catch (error) {
            console.error('Error inactivando servicio:', error);
        }
    };

    const activarServicioo = async (id: number) => {
        try {
            await activarServicio(id, token);
            // Actualiza el estado del servicio después de activarlo
            setServicios(prev =>
                prev.map(servicio =>
                    servicio.id === id ? { ...servicio, estadoRegistro: 'A' } : servicio
                )
            );
            console.log(`Servicio con ID ${id} activado.`);
        } catch (error) {
            console.error('Error activando servicio:', error);
        }
    };

    useEffect(() => {
        fetchServicios(pagina);
    }, [pagina]);

    const cargarMasServicios = () => {
        if (hasMore && !loading) {
            setPagina(prev => prev + 1);
        }
    };

    if (loading && pagina === 1) {
        return <div>Loading...</div>;
    }

    if (!loading && servicios.length === 0) {
        return <div>No se encontraron servicios.</div>;
    }

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-wrap justify-center">
                {servicios.map(servicio => (
                    <ServicioCardAdmin
                        key={servicio.id}
                        id={servicio.id}
                        image={servicio.image}
                        nombre={servicio.nombre}
                        descripcion={servicio.descripcion}
                        fecha={servicio.fecha}
                        costo={servicio.costo}
                        destino={servicio.destino}
                        estadoRegistro={servicio.estadoRegistro}
                        onActive= {activarServicioo}
                        onInactive= {inactivarServicioo} // Pasa la función de eliminar
                    />
                ))}
            </div>
            <div className="mt-4">
                {hasMore && (
                    <button
                        onClick={cargarMasServicios}
                        className="btn-load-more px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        {loading ? 'Cargando...' : 'Cargar Más'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default ListaDeServiciosAdmin;
