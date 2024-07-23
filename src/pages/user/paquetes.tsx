import React, { useState } from 'react';
// Asegúrate de importar el componente SearchForm

import ListaDePaquetes from "../../components/Paquetes/ListaDePaquetes.tsx";

import SearchForm from "../../components/SearchForm.tsx"; // Asegúrate de importar el componente PaquetesCheckBox

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

                <div className="mx-10 flex-row justify-center items-center">
                    <ListaDePaquetes searchTerm={submittedTerm} />
                </div>
            </div>
        </div>
    );
}
