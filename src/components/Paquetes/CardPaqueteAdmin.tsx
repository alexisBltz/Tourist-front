import React from "react";
import {useNavigate} from "react-router-dom";

interface CardPaqueteProps {
    id: number;
    nombre: string;
    imagen: string;
    onDelete?: (id: number) => void;
}

const CardPaquete: React.FC<CardPaqueteProps> = ({ id, nombre, imagen, onDelete }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/paquete/${id}/servicios`);
    };
    return (
        <div className="paquete-card border rounded shadow-lg p-4 m-2 cursor-pointer">
            <img src={imagen} alt={nombre} className="w-full h-48 object-cover rounded" onClick={handleClick}/>
            <h2 className="text-xl font-bold mt-2">{nombre}</h2>
            {onDelete && ( // Solo muestra el botón si onDelete está definido
                <button
                    onClick={() => onDelete(id)}
                    className="btn-delete mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                >
                    Eliminar
                </button>
            )}
        </div>
    );
};

export default CardPaquete;
