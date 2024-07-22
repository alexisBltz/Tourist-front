import React, { useState, useEffect } from 'react';
import { getServicios, ServicioData, buscarServicio } from "../../service/servicioService";
import ServicioCard from "./Card.tsx";

const ListaDeServicios: React.FC<{ searchTerm?: string }> = ({ searchTerm }) => {
    const [servicios, setServicios] = useState<ServicioData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [pagina, setPagina] = useState<number>(0);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const fetchServicios = async (pagina: number, searchTerm?: string) => {
        setLoading(true);
        try {
            const data = searchTerm
                ? await buscarServicio(searchTerm)
                : await getServicios(pagina, 5);

            console.log('Datos obtenidos:', data);

            if (Array.isArray(data)) {
                setServicios(prev => {
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

    useEffect(() => {
        // Vuelve a cargar cuando cambia la busqueda
        setPagina(0);
        // Limpiar los servicios existentes
        setServicios([]);
        //capaz aca este el por que no aparece el boton cuando no sale la busqueda, no hay tiempo
        //para solucionar, pero si busca :v
        if (searchTerm === ''){
            fetchServicios(pagina);
        }
    }, [searchTerm]);

    useEffect(() => {
        fetchServicios(pagina, searchTerm);
    }, [pagina, searchTerm]);

    const cargarMasServicios = () => {
        if (hasMore && !loading) {
            setPagina(prev => prev + 1);
        }
    };

    if (loading && pagina === 0) {
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
