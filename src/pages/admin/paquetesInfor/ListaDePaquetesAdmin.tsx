import React, { useState, useEffect } from 'react';
import {getPaquetes, PaqueteData, buscarPaquete, deletePaquete} from "../../../service/paqueteService.ts";
import CardPaqueteAdmin from "../../../components/Paquetes/CardPaqueteAdmin.tsx";


const ListaDePaquetesAdmin: React.FC<
    { searchTerm?: string, destinosSeleccionados: string[] }> = ({ searchTerm, destinosSeleccionados }) => {
    const [paquetes, setPaquetes] = useState<PaqueteData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [pagina, setPagina] = useState<number>(0);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const handleDeletePaquete = async (id: number) => {
        try {
            await deletePaquete(id);
            setPaquetes(prev => prev.filter(p => p.id !== id));
        } catch (error) {
            console.error('Error deleting paquete:', error);
        }
    };
    const fetchPaquetes = async (pagina: number, searchTerm?: string) => {
        setLoading(true);
        try {

            const data = searchTerm
                ? await buscarPaquete(searchTerm)
                : await getPaquetes(pagina, 5);

            console.log('Datos obtenidos:', data);

            if (Array.isArray(data)) {
                setPaquetes(prev => {
                    const newPaquetes = [...prev, ...data.filter(p => !prev.some(pa => pa.id === p.id))];
                    console.log('Paquetes después de agregar:', newPaquetes.map(p => p.id));
                    return newPaquetes;
                });
                if (data.length < 5) {
                    setHasMore(false);
                }
            } else {
                console.error('La data no es un array:', data);
            }
        } catch (error) {
            console.error('Error fetching paquetes:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Vuelve a cargar cuando cambia la busqueda
        setPagina(0);
        // Limpiar los paquetes existentes
        setPaquetes([]);
        // Capaz acá esté el porqué no aparece el botón cuando no sale la búsqueda
        if (searchTerm === ''){
            fetchPaquetes(pagina);
        }
    }, [searchTerm]);

    useEffect(() => {
        fetchPaquetes(pagina, searchTerm);
    }, [pagina, searchTerm]);

    const cargarMasPaquetes = () => {
        if (hasMore && !loading) {
            setPagina(prev => prev + 1);
        }
    };

    if (loading && pagina === 0) {
        return <div>Loading...</div>;
    }

    if (!loading && paquetes.length === 0) {
        return <div>No se encontraron paquetes.</div>;
    }

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-wrap justify-center">
                {paquetes.map(paquete => (
                    <CardPaqueteAdmin
                        key={paquete.id}
                        id={paquete.id}
                        nombre={paquete.nombre}
                        imagen={paquete.imagen}
                        onDelete={handleDeletePaquete}
                    />
                ))}
            </div>
            <div className="mt-4">
                {hasMore && (
                    <button
                        onClick={cargarMasPaquetes}
                        className="btn-load-more px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        {loading ? 'Cargando...' : 'Cargar Más'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default ListaDePaquetesAdmin;
