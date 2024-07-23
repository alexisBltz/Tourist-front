import React from 'react';
import {getServicio} from "../../service/servicioService.ts";
import {useNavigate} from "react-router-dom";

interface ServicioCardProps {
    id: number;
    image: string;
    descripcion: string;
    nombre: string;
    costo: number;
    destino: string;
    fecha: string;
}

const ServicioCard: React.FC<ServicioCardProps> = ({ id, image, nombre, descripcion, fecha, costo, destino }) => {
    const navigate = useNavigate();  // Crea una instancia de navigate

    const handleClick = () => {
        // Aquí podrías obtener el servicio si es necesario antes de redirigir
        getServicio(id);  // Solo si necesitas obtener información del servicio
        navigate(`/servicios/${id}`);  // Redirige a la página de detalles del servicio
    };
    return (
        <div
            className="cursor-pointer"
            onClick={handleClick}  // Maneja el clic
        >
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
            <img className="w-full" src={image} alt={nombre} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{nombre}</div>
                <p className="text-gray-700 text-base">{descripcion}</p>
                <p className="text-gray-700 text-base">Fecha: {fecha}</p>
                <p className="text-gray-700 text-base">Costo: S/. {costo}</p>
                <p className="text-gray-700 text-base">Destino: {destino}</p>
            </div>
        </div>
        </div>
    );
};


export default ServicioCard;