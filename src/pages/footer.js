import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import LogoHospital from '../assets/LogoHospital.png';

const Footer = () => {
    return (
        <div className="flex flex-col gap-10 items-center justify-start relative w-full bg-white px-4 md:px-8">
            {/* Línea decorativa */}
            <div className="w-full h-px bg-gray-300 opacity-30"></div>

            {/* Contenedor principal */}
            <div
                className="rounded-3xl p-8 flex flex-col gap-6 items-center justify-start w-full max-w-4xl"
                style={{
                    background: 'linear-gradient(-87.96deg, rgba(35, 147, 227, 0.1) 0%, rgba(19, 81, 125, 0.1) 100%)',
                }}
            >
                <div className="text-center text-sm font-bold uppercase text-gray-600 tracking-wider">
                    Piensa en tu FUTURO
                </div>
                <h2 className="text-center text-3xl md:text-4xl font-medium montserrat-alternates">
                    ¿Necesitas más información?
                </h2>
                <p className="text-center text-base md:text-lg text-gray-700 max-w-2xl">
                    El Hospital Isidro Ayora, de Loja nos destacamos por calidad y servicio hacia nuestros clientes.
                </p>
                <button
                    className="bg-[#2393E3] text-white rounded-3xl px-6 py-3 text-base md:text-lg font-bold shadow-md hover:shadow-lg"
                >
                    Contáctanos
                </button>
            </div>

            {/* Sección inferior */}
            <div className="flex flex-col gap-8 items-center justify-center w-full max-w-6xl">
                {/* Logo */}
                <img
                    className="w-40 md:w-52 object-contain"
                    src={LogoHospital}
                    alt="Hospital Logo"
                />

                <hr className="w-full border-t-1 border-gray-300" />

                {/* Enlaces y redes sociales */}
                <div className="flex flex-col md:flex-row gap-8 md:gap-16 md:items-center items-start justify-between w-full px-4">
                    {/* Copyright */}
                    <div className="text-center text-sm md:text-base font-bold text-gray-700">
                        © 2024 Copyright
                    </div>

                    {/* Links */}
                    <div className="flex flex-row gap-6 md:gap-10 items-center">
                        <span className="text-sm md:text-base font-bold text-gray-700 cursor-pointer hover:text-[#2393E3]">
                            Equipo
                        </span>
                        <span className="text-sm md:text-base font-bold text-gray-700 cursor-pointer hover:text-[#2393E3]">
                            Casos de éxito
                        </span>
                        <span className="text-sm md:text-base font-bold text-gray-700 cursor-pointer hover:text-[#2393E3]">
                            Publicaciones
                        </span>
                    </div>

                    {/* Social Media Icons */}
                    <div className="flex space-x-4 pb-12">
                        <FontAwesomeIcon icon={faFacebook} size="lg" className="text-gray-600 hover:text-[#2393E3] cursor-pointer" />
                        <FontAwesomeIcon icon={faTwitter} size="lg" className="text-gray-600 hover:text-[#2393E3] cursor-pointer" />
                        <FontAwesomeIcon icon={faInstagram} size="lg" className="text-gray-600 hover:text-[#2393E3] cursor-pointer" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
