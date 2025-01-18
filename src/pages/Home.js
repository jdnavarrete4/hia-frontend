import React from 'react';
import LogoHospital from '../assets/LogoHospital.png';
import banner1 from '../assets/banner1.png';
import Traumatologia from '../assets/traumatologia.jpg';
import cardiologia from '../assets/cardiologia.png';
import pediatria from '../assets/pediatria.jpg';
import { Link } from 'react-router-dom';
import MedicoCard from './MedicoCard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import Carrusel from './Specialties';
import Footer from './footer';

const Home = () => {

    const items = [
        {
            image: Traumatologia,
            title: 'Traumatologia',
            description: 'La especialidad de Traumatología se enfoca en el diagnóstico, tratamiento y rehabilitación de lesiones del sistema musculoesquelético.'
        },
        {
            image: cardiologia,
            title: 'Cardiología',
            description: 'La especialidad de Cardiología se dedica al estudio y tratamiento de enfermedades del corazón y del sistema circulatorio.'
        },
        {
            image: pediatria,
            title: 'Pediatria',
            description: 'La especialidad de Pediatría se enfoca en el diagnóstico, tratamiento y rehabilitación de lesiones del sistema musculoesquelético.'
        }
    ];
    return (
        <div className="relative bg-white min-h-screen overflow-x-hidden">
            {/* Menú superior */}
            <div className="absolute top-0 left-0 w-full flex items-center justify-between px-4 py-4 md:px-6 md:py-4 z-10">
                {/* Logo y enlaces */}
                <div className="flex items-center gap-4 md:gap-8">
                    <img className="w-[150px] md:w-[220px] h-auto" src={LogoHospital} alt="logo" />
                    <div className="hidden md:flex gap-6">
                        <span className="text-black font-normal text-sm md:text-base cursor-pointer">Sobre nosotros</span>
                        <span className="text-black font-normal text-sm md:text-base cursor-pointer">Contactos</span>
                    </div>
                </div>
                {/* Búsqueda e inicio de sesión */}
                <div className="flex items-center gap-4 md:gap-6">
                    <FontAwesomeIcon icon={faSearch} className="text-black text-base md:text-lg cursor-pointer" />
                    <Link
                        to="/login"
                        className="bg-white rounded-3xl px-4 py-2 md:px-6 md:py-2 flex items-center gap-2 border border-gray-300 hover:shadow-lg"
                    >
                        <FontAwesomeIcon icon={faUser} />
                        <span className="hidden md:block text-black font-semibold text-sm md:text-base">Iniciar Sesión</span>
                    </Link>
                </div>
            </div>

            {/* Contenido principal */}
            <div className="relative flex flex-col md:flex-row items-stretch md:h-[90vh]  mx-auto ">
                {/* Columna izquierda: Texto */}
                <div className="flex flex-col justify-center items-start text-left px-4 pt-24 md:pt-35 md:px-16 w-full md:w-1/2 z-10">
                    <h1 className="text-black font-light text-3xl md:text-[64px] leading-snug montserrat-alternates">
                        Proteje a ti <br />
                        y a tu familia <br />
                        junto a nosotros
                    </h1>
                    <p className="text-gray-600 text-sm md:text-lg mt-6">
                        Hospital General Isidro Ayora es una institución de salud comprometida con la excelencia médica
                        y la atención personalizada. Con un equipo de profesionales altamente capacitados y tecnología
                        de vanguardia.
                    </p>
                    <Link
                        to="/login"
                        className="bg-[#2393E3] text-white rounded-3xl px-4 py-2 md:px-6 md:py-3 mt-6 text-sm md:text-base font-bold hover:shadow-lg"
                    >
                        Agenda tu cita
                    </Link>
                </div>

                {/* Columna derecha: Imagen del banner */}
                <div className="w-full md:w-1/2 ">
                    <img
                        className="hidden md:block w-full h-full object-cover"
                        src={banner1}
                        alt="Banner"
                    />
                </div>
            </div>

            {/* Carrusel */}

            <div className="md:relative md:-mt-20 z-20">
                <Carrusel items={items} />
            </div>


            {/* Médicos */}
            <div className="flex justify-center items-center w-full max-w-screen-xl mx-auto px-4 py-10">
                <MedicoCard />
            </div>

            {/* Footer */}
            <Footer />
        </div>




    );
}

export default Home;
