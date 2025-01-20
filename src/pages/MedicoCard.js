import React, { useEffect, useState } from "react";
import axios from "axios";
import GroupIcon from '../assets/Group 303.png';

const MedicoCard = () => {
    const [medicos, setMedicos] = useState([]);
    const [randomMedicos, setRandomMedicos] = useState([]);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Obtener los datos de los médicos
    useEffect(() => {
        axios.get("http://localhost:8000/api/medicos/")
            .then(response => {
                if (Array.isArray(response.data.results)) {
                    setMedicos(response.data.results);
                    setRandomMedicos(getRandomItems(response.data.results, 7));
                } else {
                    setMedicos([]);
                    console.error("La API no devolvió un arreglo en 'results'");
                }
            })
            .catch(() => setError("No se encontraron médicos"));
    }, []);

    // Función para obtener 7 elementos aleatorios
    const getRandomItems = (array, count) => {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    // Rotar automáticamente los médicos cada 4 segundos
    useEffect(() => {
        if (randomMedicos.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % randomMedicos.length);
            }, 4000);

            return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
        }
    }, [randomMedicos]);

    if (error) {
        return <div>{error}</div>;
    }

    if (medicos.length === 0) {
        return <div>Loading...</div>;
    }

    const medico = randomMedicos[currentIndex];

    return (
        <div className="relative mx-auto w-full ">
            {/* Título */}
            <div className="text-left md:text-center md:my-6 px-6 md:px-0">
                <h2 className="text-lg font-bold text-[#2393E3] ">CONOCE A</h2>
                <h2 className="text-2xl font-extralight text-black">Nuestros especialistas</h2>
            </div>

            {/* Contenedor principal */}
            <div className="flex flex-col md:flex-row gap-6 items-center justify-center mx-auto w-full md:px-6 py-6">
                {/* Barra lateral con indicadores */}
                <div className="hidden md:flex flex-col gap-2">
                    {randomMedicos.map((_, index) => (
                        <div
                            key={index}
                            className={`w-2 h-10 rounded-full transition-colors duration-300 ${currentIndex === index ? "bg-blue-600" : "bg-gray-300"
                                }`}
                        ></div>
                    ))}
                </div>

                {/* Contenedor unificado de información y foto */}
                <div
                    className="bg-white rounded-3xl 
                    p-6 flex flex-col md:flex-row gap-6 
                    items-center shadow-none w-full 
                    max-w-[800px] mx-auto md:h-[550px] my-div"

                >

                    {/* Foto del médico */}
                    <div className="w-full md:w-1/2 h-[300px] md:h-full">
                        <img
                            className="md:rounded-lg rounded-2xl w-full h-full object-cover"
                            src={medico.foto || "https://via.placeholder.com/400x300?text=Sin+Foto"}
                            alt={`Foto de ${medico.nombre} ${medico.apellido}`}
                            onError={(e) => {
                                e.target.src = "https://via.placeholder.com/400x300?text=Imagen+No+Disponible";
                            }}
                        />
                    </div>

                    {/* Información del médico */}
                    <div className="flex flex-col items-center text-center max-w-lg mx-auto">
                        <h3 className="text-2xl font-semibold">Dr.{medico.nombre} {medico.apellido}</h3>
                        <p className="text-xl text-gray-500 mt-2">{medico.especialidad_nombre}</p>
                        <p className="text-base text-gray-400 mt-4">{medico.descripcion}</p>

                        {/* Icono e información adicional */}
                        <div className="flex flex-col items-center mt-10">
                            <img
                                src={GroupIcon}
                                alt="Icono equipo"
                                className="w-14 mb-2"
                            />
                            <p className="text-[#2393E3] text-sm font-medium">MIRAR TODO EL EQUIPO</p>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    );
};

export default MedicoCard;
