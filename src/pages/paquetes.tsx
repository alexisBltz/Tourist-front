import React, { useState } from 'react';
// Asegúrate de importar el componente SearchForm

import ListaDePaquetes from "../components/Paquetes/ListaDePaquetes.tsx";
import DestinosCheckBox from "../components/DestinosCheckBox.tsx";
import SearchForm from "../components/SearchForm.tsx"; // Asegúrate de importar el componente PaquetesCheckBox

export default function Paquetes() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [submittedTerm, setSubmittedTerm] = useState<string>('');

    const handleSearch = async (event: React.FormEvent) => {
        event.preventDefault(); // Evita el envío del formulario por defecto
        setSubmittedTerm(searchTerm.trim()); // Establece el término enviado
    };

    return (
        <div>
            <div className="">
                <div className="p-14">
                    <SearchForm
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleSearch={handleSearch}
                        placeholder="Busca paquetes, ofertas, destinos..."
                    />
                </div>
            </div>

            <div className="flex">
                <div className="ml-10 flex-row bg-gray-200 rounded-lg">
                    <h1 className="pl-32 pt-16 pr-36 font-serif text-3xl">Paquetes</h1>
                    <DestinosCheckBox />
                </div>

                <div className="flex-row justify-center items-center">
                    <ListaDePaquetes searchTerm={submittedTerm} />
                </div>
            </div>
        </div>
    );
}
