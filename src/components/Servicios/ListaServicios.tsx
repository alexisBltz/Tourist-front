import React, { useState, useEffect } from 'react';
import { getServicios, ServicioData } from "../../service/servicioService";
import ServicioCard from "./Card.tsx";

const ListaDeServicios: React.FC = () => {
    const [servicios, setServicios] = useState<ServicioData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [pagina, setPagina] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const fetchServicios = async (pagina: number) => {
        setLoading(true);
        try {
            const data = await getServicios(pagina, 3);
            console.log('Datos obtenidos:', data);

            if (Array.isArray(data)) {
                setServicios(prev => [...prev, ...data]);
                // Si la longitud de los datos obtenidos es menor que el límite, no hay más servicios
                if (data.length < 3) {
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
                    <ServicioCard
                        key={servicio.id}
                        id={servicio.id}
                        image={servicio.image}
                        nombre={servicio.nombre}
                        descripcion={servicio.descripcion}
                        fecha={servicio.fecha}
                        costo={servicio.costo}
                        destino={servicio.destino}
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

export default ListaDeServicios;
