
interface ServicioCardProps {
    id: number;
    image: string;
    descripcion: string;
    nombre: string;
    costo: number;
    destino: string;
    fecha: string;
    estadoRegistro: string;
    onActivar?: (id: number) => void;
    onInactivar?: (id: number) => void;
}

const ServicioCardAdmin: React.FC<ServicioCardProps>
    = ({id, image, nombre,
           descripcion, fecha, costo, destino,estadoRegistro, onActive , onInactive  }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
            <img className="w-full" src={image} alt={nombre} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{nombre}</div>
                <p className="text-gray-700 text-base">{descripcion}</p>
                <p className="text-gray-700 text-base">Fecha: {fecha}</p>
                <p className="text-gray-700 text-base">Costo: S/. {costo}</p>
                <p className="text-gray-700 text-base">Destino: {destino}</p>
                <p className="text-gray-700 text-base">Estado de Registro: {estadoRegistro}</p>
                <div className="flex items-center justify-center space-x-4 p-4">
                    {onActive && (
                        <button
                            onClick={() => onActive(id)}
                            className="btn-active mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                        >
                            Activar
                        </button>
                    )}
                    {onInactive && (
                        <button
                            onClick={() => onInactive(id)}
                            className="btn-inactive mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                        >
                            Inactivar
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
};


export default ServicioCardAdmin;