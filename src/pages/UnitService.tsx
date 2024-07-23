import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {getServicio} from "../service/servicioService.ts";

const UnitService: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [servicio, setServicio] = useState<any>(null);

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

    return (
        <div className="max-w-4xl mx-auto mt-8 p-4">
            <div className="flex flex-col md:flex-row items-center justify-center bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="flex-shrink-0 md:w-1/2">
                    <img className="w-full h-64 object-cover" src={servicio.image} alt={servicio.nombre} />
                </div>
                <div className="md:ml-8 p-4 md:w-1/2">
                    <h1 className="text-3xl font-bold mb-4">{servicio.nombre}</h1>
                    <p className="text-gray-700 text-base mb-4">{servicio.descripcion}</p>
                    <p className="text-gray-700 text-base mb-2">Fecha: {servicio.fecha}</p>
                    <p className="text-gray-700 text-base mb-2">Costo: S/. {servicio.costo}</p>
                    <p className="text-gray-700 text-base">Destino: {servicio.destino}</p>
                </div>
            </div>
        </div>
    );
};

export default UnitService;
