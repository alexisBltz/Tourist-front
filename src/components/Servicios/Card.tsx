import React from 'react';

interface ServicioCardProps {
    id: number;
    image: string;
    descripcion: string;
    nombre: string;
    costo: number;
    destino: string;
    fecha: string;
    onDelete?: (id: number) => void;
}

const ServicioCard: React.FC<ServicioCardProps> = ({ id, image, nombre, descripcion, fecha, costo, destino,onDelete  }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
            <img className="w-full" src={image} alt={nombre} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{nombre}</div>
                <p className="text-gray-700 text-base">{descripcion}</p>
                <p className="text-gray-700 text-base">Fecha: {fecha}</p>
                <p className="text-gray-700 text-base">Costo: S/. {costo}</p>
                <p className="text-gray-700 text-base">Destino: {destino}</p>
                {onDelete && ( // Solo muestra el botón si onDelete está definido
                    <button
                        onClick={() => onDelete(id)}
                        className="btn-delete mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                    >
                        Eliminar
                    </button>
                )}
            </div>
        </div>
    );
};


export default ServicioCard;