import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // Importa useNavigate
import { getServicio } from '../../service/servicioService.ts';

const UnitService: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [servicio, setServicio] = useState<any>(null);
    const navigate = useNavigate();  // Crea una instancia de navigate

    useEffect(() => {
        if (id) {
            getServicio(Number(id))
                .then((data) => setServicio(data))
                .catch((error) => console.error('Error fetching service:', error));
        }
    }, [id]);

    if (!servicio) {
        return <div className="text-center p-4">Cargando...</div>;
    }

    const handleBack = () => {
        navigate('/servicios');  // Redirige a la página de servicios
    };

    return (
        <div className="max-w-4xl mx-auto mt-8 p-4">
            <div className="flex flex-col md:flex-row items-center justify-center bg-white  rounded-lg overflow-hidden  ">
                <div className="flex-shrink-0 md:w-1/2 p-4">
                    <img className="w-full h-auto object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none" src={servicio.image} alt={servicio.nombre} />
                </div>
                <div className="md:ml-8 p-6 md:w-1/2">
                    <h1 className="text-4xl font-bold mb-4 text-gray-800">{servicio.nombre}</h1>
                    <p className="text-gray-600 text-lg mb-6">{servicio.descripcion}</p>
                    <div className="mb-4">
                        <p className="text-gray-600 text-lg mb-2"><span className="font-semibold">Fecha:</span> {servicio.fecha}</p>
                        <p className="text-gray-600 text-lg mb-2"><span className="font-semibold">Costo:</span> S/. {servicio.costo}</p>
                        <p className="text-gray-600 text-lg"><span className="font-semibold">Destino:</span> {servicio.destino}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UnitService;
