import React from 'react';
import LogoHospital from '../assets/LogoHospital.png';
import banner1 from '../assets/banner1.png';
import Traumatologia from '../assets/traumatologia.jpg';
import cardiologia from '../assets/cardiologia.png';
import pediatria from '../assets/pediatria.jpg';
import { Link } from 'react-router-dom';
import MedicoCard from './MedicoCard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
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
        <div className="relative bg-white  min-h-screen">
            <img
                className="absolute left-[714px] top-[-31px] w-[872px] h-[800px] object-cover z-0"
                src={banner1}
                alt="background"
            />
            <div className="absolute top-[25px] left-[62px] flex flex-row items-center justify-between w-[579px] z-10">
                <div className="flex flex-row gap-2.5 items-center">
                    <img className="w-[220px] h-[50px]" src={LogoHospital} alt="logo" />
                </div>
                <div className="flex flex-row gap-6 items-start mt-8">
                    <div className="text-black text-left font-normal text-base">Sobre nosotros</div>
                    <div className="text-black text-left font-normal text-base">Contactos</div>
                </div>
            </div>
            <div className="absolute right-0 top-0 flex items-center justify-end pr-10 pt-4 mt-8 z-20">
                <FontAwesomeIcon icon={faSearch} className="text-white mr-2.5" />
                <Link to="/login" className="bg-white rounded-3xl px-6 py-3 flex items-center justify-center gap-2.5 mr-4">
                    <FontAwesomeIcon icon={faHome} />
                    <div className="text-black font-semibold text-base">Iniciar Sesion</div>
                </Link>
            </div>

            <div className="relative overflow-auto">
                <div className="flex flex-col gap-6 items-start justify-start w-[579px] ml-16 mt-60">
                    <div className="flex flex-col gap-2 items-start justify-start montserrat-alternates">
                        <div className="text-black text-left font-normal text-[64px] leading-none">Proteje a ti ERROR</div>
                        <div className="text-black text-left font-normal text-[64px] leading-none">y a tu familia</div>
                        <div className="text-black text-left font-normal text-[64px] leading-none">junto a nosotros</div>
                    </div>
                    <img className="self-stretch h-0  relative overflow-visible" src={LogoHospital} alt="vector" />
                    <div className="text-black text-left font-normal text-base">Hospital General Isidro Ayora es una institución de salud comprometida con la excelencia médica y la atención personalizada. Con un equipo de profesionales altamente capacitados y tecnología de vanguardia.</div>
                    <div className="bg-[#2393e3] rounded-3xl px-6 py-3 flex items-center justify-center text-white font-bold text-sm">

                        <Link to="/login" >

                            <div className="text-white font-semibold text-base">Agenda tu cita</div>
                        </Link>
                    </div>

                </div>
            </div>



            <Carrusel items={items} />
            <MedicoCard />
            <Footer />

        </div>
    );
}

export default Home;
