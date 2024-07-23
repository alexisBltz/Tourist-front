import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CardPaqueteProps {
    id: number;
    nombre: string;
    imagen: string;
}

const CardPaquete: React.FC<CardPaqueteProps> = ({ id, nombre, imagen }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/paquete/${id}/servicios`);
    };

    return (
        <div className="paquete-card border rounded shadow-lg p-4 m-2 cursor-pointer" onClick={handleClick}>
            <img src={imagen} alt={nombre} className="w-full h-48 object-cover rounded" />
            <h2 className="text-xl font-bold mt-2">{nombre}</h2>
        </div>
    );
};

export default CardPaquete;
