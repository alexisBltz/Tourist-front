import React, { useState, useEffect } from 'react';
import {getDestinos} from "../service/servicioService.ts";
import {CheckIcon} from "@heroicons/react/16/solid";
import {Checkbox} from "@headlessui/react";

const DestinosCheckbox: React.FC = () => {
    const [destinos, setDestinos] = useState<string[]>([]);
    const [selectedDestinos, setSelectedDestinos] = useState<Set<string>>(new Set());

    useEffect(() => {
        const fetchDestinos = async () => {
            try {
                const data = await getDestinos();
                setDestinos(data);
                console.log("DESTINOS: "+data)
            } catch (error) {
                console.error('Error fetching destinos:', error);
            }
        };

        fetchDestinos();
    }, []);

    const handleCheckboxChange = (destino: string) => {
        setSelectedDestinos((prevSelected) => {
            const newSelected = new Set(prevSelected);
            if (newSelected.has(destino)) {
                newSelected.delete(destino);
            } else {
                newSelected.add(destino);
            }
            return newSelected;
        });
    };

    return (
        <div>
            {destinos.map((destino) => (
                <div key={destino}>
                    <div className="flex px-10 py-5">
                    <Checkbox
                        checked={selectedDestinos.has(destino)}
                        onChange={() => handleCheckboxChange(destino)}
                        className="group size-6 rounded-md bg-black p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-white"
                    >
                        <CheckIcon className="hidden size-4 fill-black group-data-[checked]:block" />
                    </Checkbox>
                    <h1 className="text-center mx-5">{destino}</h1>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DestinosCheckbox;
