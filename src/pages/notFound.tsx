import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-gray-400">404</h1>
                <p className="text-2xl md:text-3xl font-light text-gray-600 mt-4">
                    Lo sentimos, la página que estás buscando no se pudo encontrar.
                </p>
                <Link to="/" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                    Regresar al Inicio
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
