import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import LogoHospital from '../assets/LogoHospital.png';

const Footer = () => {
    return (
        <div className="flex flex-col gap-[70px] items-center justify-start relative">
            <img
                className="shrink-0 w-[1072px] h-px relative overflow-visible"
                style={{ opacity: 0.06 }}
                src="line-20.svg"
                alt="Line Decoration"
            />
            <div
                className="rounded-3xl pt-8 pb-8 flex flex-col gap-[26px] items-center justify-start shrink-0 w-[949px] relative"
                style={{
                    background: 'linear-gradient(-87.96deg, rgba(35, 147, 227, 0.1) 0%, rgba(19, 81, 125, 0.1) 100%)',
                }}
            >
                <div
                    className="text-dark text-center font-['Mulish-Bold',_sans-serif] text-sm font-bold uppercase relative self-stretch"
                    style={{ letterSpacing: '2.8px', opacity: 0.6 }}
                >
                    piensa en tu FUTURo
                </div>
                <div
                    className="text-dark text-center font-['MontserratAlternates-Medium',_sans-serif] text-[40px] font-medium relative self-stretch montserrat-alternates"
                >
                    Necesitas más información
                </div>
                <div
                    className="text-dark text-center font-['Mulish-Bold',_sans-serif] text-lg leading-[33px] font-bold relative w-[557px]"
                    style={{ opacity: 0.8 }}
                >
                    El Hospital Isidro Ayora, de Loja nos destacamos por calidad y servicio hacia nuestros clientes.
                </div>
                <div
                    className="bg-[#2393e3] rounded-3xl pt-3 pr-6 pb-3 pl-6 flex flex-row gap-2.5 items-center justify-center shrink-0 relative"
                    style={{ boxShadow: '0px 20px 20px 0px rgba(0, 0, 0, 0.1)' }}
                >
                    <div
                        className="text-[#ffffff] text-left font-['Mulish-Bold',_sans-serif] text-base font-bold relative"
                    >
                        Contáctanos
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-10 items-center justify-center self-stretch shrink-0 relative px-[62px]">
                <div className="flex flex-row gap-3 items-end justify-center shrink-0 relative">
                    <img
                        className="w-[220px] h-[50px] object-contain"
                        src={LogoHospital}
                        alt="Hospital Logo"
                    />
                </div>
                <hr className="w-full border-t-1 border-gray  " />

                <div className="flex flex-col md:flex-row gap-10 md:gap-[216px] items-center justify-between w-full relative px-[62px]">
                    <div
                        className="text-dark text-center font-['Mulish-ExtraBold',_sans-serif] text-base font-extrabold relative"
                        style={{ opacity: 0.8 }}
                    >
                        © 2024 Copyright
                    </div>
                    <div className="flex flex-col md:flex-row gap-10">
                        <div className="text-dark text-left font-['Mulish-ExtraBold',_sans-serif] text-base font-extrabold">
                            Equipo
                        </div>
                        <div className="text-dark text-center font-['Mulish-ExtraBold',_sans-serif] text-base font-extrabold">
                            Casos de éxito
                        </div>
                        <div className="text-dark text-left font-['Mulish-ExtraBold',_sans-serif] text-base font-extrabold">
                            Publicaciones
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <FontAwesomeIcon icon={faFacebook} size="2x" className="text-[#2393e3]" />
                        <FontAwesomeIcon icon={faTwitter} size="2x" className="text-[#2393e3]" />
                        <FontAwesomeIcon icon={faInstagram} size="2x" className="text-[#2393e3]" />
                    </div>
                </div>


                <div className="mt-[62px]"></div>
            </div>


        </div>
    );
};

export default Footer;
