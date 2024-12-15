import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

const MedicoCard = () => {
    const [medicos, setMedicos] = useState([]);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:8000/api/medicos/')
            .then(response => {
                console.log(response.data); // Verifica el formato completo de la respuesta
                if (Array.isArray(response.data.results)) {
                    setMedicos(response.data.results); // Usa `results` que contiene el arreglo
                } else {
                    setMedicos([]); // Si no es un arreglo, asigna un arreglo vacío
                    console.error("La API no devolvió un arreglo en 'results'");
                }
            })
            .catch(error => {
                setError("No se encontraron médicos");
                console.error(error);
            });
    }, []);



    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % medicos.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + medicos.length) % medicos.length);
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (medicos.length === 0) {
        return <div>Loading...</div>;
    }

    const medico = medicos[currentIndex];

    return (
        <div className="relative mx-[62px] mt-[100px]"> {/* Cambié mt-[100px] a mt-[200px] */}
            <div className="text-center my-10">
                <span>
                    <span className="conoce-a-nuestros-especialistas-span">
                        CONOCE A
                        <br />
                    </span>
                    <span className="conoce-a-nuestros-especialistas-span2">
                        Nuestros especialistas
                    </span>
                </span>
            </div>

            <div className="flex flex-row gap-0 items-center justify-center w-full  mx-auto" style={{ boxShadow: "0px 20px 20px 0px rgba(0, 0, 0, 0.05)" }}>
                {/* Columna 1: Indicadores */}
                <div className="flex flex-col gap-4 items-start justify-start ">
                    {medicos.map((_, index) => (
                        <div key={index} className={`rounded-3xl shrink-0 w-1.5 h-[31px] relative ${currentIndex === index ? 'bg-blue-600' : 'bg-[rgba(35,147,227,0.30)]'}`}></div>
                    ))}
                </div>

                {/* Columna 2: Descripción */}
                <div className="bg-white rounded-tl-3xl rounded-bl-3xl pt-[50px] pr-[73px] pb-[50px] pl-[73px] flex flex-col gap-24 items-center justify-center shrink-0 relative max-w-2xl h-full">
                    <div className="flex flex-col gap-8 items-center justify-center shrink-0 relative">
                        <div className="text-black text-center font-mulish text-2xl font-normal relative flex items-center justify-center">
                            Dr. {medico.nombre} {medico.apellido}
                        </div>
                        <div className="text-black text-center font-mulish text-2xl font-normal relative flex items-center justify-center">
                            {medico.especialidad}
                        </div>
                        <div className="text-gray-400 text-center font-mulish text-base font-normal relative flex items-center justify-center max-w-md">
                            <span>{medico.descripcion}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 items-center justify-center shrink-0 relative">
                        <img className="shrink-0 w-[55.5px] h-[27px] relative overflow-visible" src="https://i.ibb.co/q01pfFr/Group-303.png" alt={medico.nombre} />
                        <div className="text-blue-600 text-center font-mulish text-xs font-normal relative flex items-center justify-center">
                            MIRAR TODO EL EQUIPO
                        </div>
                    </div>
                </div>

                {/* Columna 3: Imagen */}
                <div className="relative h-full w-full">
                    <img className="rounded-tr-3xl rounded-br-3xl w-full h-full object-cover" style={{ background: "linear-gradient(to left, #d9d9d9, #d9d9d9)" }} src={medico.foto} alt="Doctor" />
                </div>

                {/* Columna 4: Flechas */}
                <div className="flex flex-col items-center justify-center">
                    <div className="w-10 h-10 flex items-center justify-center cursor-pointer " onClick={handlePrev} style={{ cursor: "pointer" }}>
                        <div className="rounded-full border-solid border-black border-[0.8px] w-10 h-10 flex items-center justify-center bg-white -mt-12">
                            <FontAwesomeIcon icon={faArrowUp} className="text-black w-6 h-6" />
                        </div>
                    </div>
                    <div className="w-10 h-10 flex items-center justify-center cursor-pointer" onClick={handleNext} style={{ cursor: "pointer" }}>
                        <div className="rounded-full border-solid border-black border-[0.8px] w-10 h-10 flex items-center justify-center bg-white">
                            <FontAwesomeIcon icon={faArrowDown} className="text-black w-6 h-6" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MedicoCard;
