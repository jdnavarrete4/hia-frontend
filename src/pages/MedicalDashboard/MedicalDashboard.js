import React from 'react';
import Medicos from '../../assets/medicos.png';
import c1 from '../../assets/c1.png';
import c2 from '../../assets/c2.png';
import c3 from '../../assets/c3.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCalendarAlt, faHistory, faNotesMedical, faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import MenuDoctor from './MenuDoctor';

const MedicalDashboard = () => {
    return (
        <div className="bg-[#f9faff] min-h-screen relative ">
            <MenuDoctor />
            <div className="flex flex-col  items-center min-h-screen absolute left-[289px] right-0 top-0 px-8 overflow-auto">


                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 w-full ">
                    <div className="flex flex-col gap-8 items-start justify-center relative w-full col-span-2">
                        <div className="flex flex-col gap-[22px] items-start justify-start">
                            <div className="text-black text-left font-['Mulish-SemiBold',_sans-serif] text-2xl font-semibold">
                                Bienvenido Dr. Bayter
                            </div>
                            <div className="text-black text-left font-['Mulish-Light',_sans-serif] text-sm font-light">
                                Utiliza las opciones disponibles en nuestro sistema
                            </div>
                        </div>
                        <div className="bg-[#91c9f1] rounded-3xl p-8 flex flex-row gap-2.5 items-center justify-start w-full relative" style={{ boxShadow: '0px 20px 20px 0px rgba(0, 0, 0, 0.08)' }}>
                            <div className="flex flex-col gap-8 items-start justify-start w-[360px]">
                                <div className="text-white text-left font-['Poppins-Medium',_sans-serif] text-xl font-medium" style={{ letterSpacing: '-0.01em' }}>
                                    Bienestar del Personal Médico
                                </div>
                                <div className="text-white text-left font-['Poppins-Regular',_sans-serif] text-sm font-normal w-[315px]" style={{ letterSpacing: '-0.01em' }}>
                                    Nuestro sistema está diseñado para apoyar y facilitar tu labor diaria, asegurando que puedas ofrecer el mejor cuidado a tus pacientes. ¡Gracias por tu dedicación y esfuerzo!
                                </div>
                            </div>
                            <img className="w-[341px] h-[277px] absolute left-[360.5px] top-[-72px] object-cover" src={Medicos} />
                        </div>
                    </div>
                    <div className="w-96 bg-white rounded-lg p-6 ">
                        <h3 className="text-[#0080c8] text-left font-['Mulish-SemiBold',_sans-serif] text-base font-semibold">Noticias para ti</h3>
                        <hr className="my-2" />
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <img className="w-20 h-14 rounded-md" src={c1} alt="Curso Farmacia" />
                                <div>
                                    <h4 className="font-medium">Curso Farmacia Especializada</h4>
                                    <p className="text-gray-500 text-sm">12/Junio/2024</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <img className="w-20 h-14 rounded-md" src={c2} alt="Expertos ADN" />
                                <div>
                                    <h4 className="font-medium">Consejos Expertos ADN</h4>
                                    <p className="text-gray-500 text-sm">12/Junio/2024</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <img className="w-20 h-14 rounded-md" src={c3} alt="Robotica Médica" />
                                <div>
                                    <h4 className="font-medium">Curso Robotica Médica</h4>
                                    <p className="text-gray-500 text-sm">12/Junio/2024</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    <div className="bg-white rounded-lg p-6 col-span-2">
                        <div className="flex items-center justify-between">
                            <h3 className="text-[#0080c8] text-left font-['Mulish-SemiBold',_sans-serif] text-base font-semibold">Tus citas asignadas</h3>
                            <div className="relative">
                                <div className="bg-gray-50 rounded-lg px-4 py-2 inline-flex items-center">
                                    <span className="text-gray-400 mr-2">Filtrar por :</span>
                                    <select className="appearance-none bg-gray-50 text-gray-700 font-semibold focus:outline-none">
                                        <option>Todo</option>
                                        {/* Opciones adicionales */}
                                    </select>
                                    <FontAwesomeIcon icon={faChevronDown} className="text-gray-400 ml-2" />
                                </div>
                            </div>
                        </div>
                        <table className="min-w-full mt-4 bg-white rounded-lg">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 text-left text-[#B5B7C0]">Paciente</th>
                                    <th className="py-2 px-4 text-left text-[#B5B7C0]">Fecha asignada</th>
                                    <th className="py-2 px-4 text-left text-[#B5B7C0]">Hora</th>
                                    <th className="py-2 px-4 text-left text-[#B5B7C0]">Contacto</th>
                                    <th className="py-2 px-4 text-left text-[#B5B7C0]">Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-200">
                                    <td className="py-4 px-4">Jane Cooper</td>
                                    <td className="py-4 px-4">20-Junio-2024</td>
                                    <td className="py-4 px-4">9:00 AM</td>
                                    <td className="py-4 px-4">0967391345</td>
                                    <td className="py-4 px-4 text-green-600">Activa</td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="py-4 px-4">Jane Cooper</td>
                                    <td className="py-4 px-4">22-Junio-2024</td>
                                    <td className="py-4 px-4">9:00 AM</td>
                                    <td className="py-4 px-4">0967391345</td>
                                    <td className="py-4 px-4 text-red-600">Cancelada</td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="py-4 px-4">Jane Cooper</td>
                                    <td className="py-4 px-4">24-Junio-2024</td>
                                    <td className="py-4 px-4">9:00 AM</td>
                                    <td className="py-4 px-4">0967391345</td>
                                    <td className="py-4 px-4 text-green-600">Activa</td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="py-4 px-4">Jane Cooper</td>
                                    <td className="py-4 px-4">25-Junio-2024</td>
                                    <td className="py-4 px-4">9:00 AM</td>
                                    <td className="py-4 px-4">0967391345</td>
                                    <td className="py-4 px-4 text-green-600">Activa</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>




                    <div className="flex flex-col gap-8 items-start justify-start relative">
                        <div className="bg-white rounded-tl-3xl rounded-tr-3xl flex flex-col gap-6 items-center justify-start relative">
                            <div className="pt-8 pr-8 pl-8 flex flex-col gap-6 items-start justify-start self-stretch relative">
                                <div className="flex flex-col gap-6 items-start justify-start self-stretch relative">
                                    <div className="text-[#0080c8] text-left font-['Mulish-SemiBold',_sans-serif] text-base font-semibold" style={{ letterSpacing: '-0.01em' }}>
                                        Proxima cita
                                    </div>
                                    <div className="border-solid border-[#eeeeee] border-t border-r-0 border-b-0 border-l-0 self-stretch h-0 relative"></div>
                                    <div className="flex flex-col gap-1.5 items-start justify-start relative">
                                        <div className="text-black text-left font-['Poppins-Medium',_sans-serif] text-sm font-medium" style={{ letterSpacing: '-0.01em' }}>
                                            Junio 2024
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 items-start justify-start self-stretch relative">
                                    <div className="flex flex-row gap-4 items-start justify-start relative">
                                        <div className="flex flex-col gap-4 items-start justify-start relative">
                                            <div className="text-[#adadad] text-left font-['Poppins-Medium',_sans-serif] text-sm font-medium" style={{ letterSpacing: '-0.01em' }}>
                                                Lu
                                            </div>
                                            <div className="bg-[#2c7fff] rounded-full px-2 flex flex-col gap-2.5 items-start justify-start relative">
                                                <div className="text-white text-left font-['Poppins-Medium',_sans-serif] text-sm font-medium" style={{ letterSpacing: '-0.01em' }}>
                                                    1
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-4 items-start justify-start relative">
                                            <div className="text-[#adadad] text-left font-['Poppins-Medium',_sans-serif] text-sm font-medium" style={{ letterSpacing: '-0.01em' }}>
                                                Mar
                                            </div>
                                            <div className="text-black text-left font-['Poppins-Medium',_sans-serif] text-sm font-medium" style={{ letterSpacing: '-0.01em' }}>
                                                2
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-4 items-start justify-start relative">
                                            <div className="text-[#adadad] text-left font-['Poppins-Medium',_sans-serif] text-sm font-medium" style={{ letterSpacing: '-0.01em' }}>
                                                Mier
                                            </div>
                                            <div className="text-black text-left font-['Poppins-Medium',_sans-serif] text-sm font-medium" style={{ letterSpacing: '-0.01em' }}>
                                                3
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-4 items-start justify-start relative">
                                            <div className="text-[#adadad] text-left font-['Poppins-Medium',_sans-serif] text-sm font-medium" style={{ letterSpacing: '-0.01em' }}>
                                                Juev
                                            </div>
                                            <div className="text-black text-left font-['Poppins-Medium',_sans-serif] text-sm font-medium" style={{ letterSpacing: '-0.01em' }}>
                                                4
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-4 items-start justify-start relative">
                                            <div className="text-[#a4a4a4] text-left font-['Poppins-Medium',_sans-serif] text-sm font-medium" style={{ letterSpacing: '-0.01em' }}>
                                                Vier
                                            </div>
                                            <div className="text-black text-left font-['Poppins-Medium',_sans-serif] text-sm font-medium" style={{ letterSpacing: '-0.01em' }}>
                                                5
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-4 items-start justify-start relative">
                                            <div className="text-[#a4a4a4] text-left font-['Poppins-Medium',_sans-serif] text-sm font-medium" style={{ letterSpacing: '-0.01em' }}>
                                                Sab
                                            </div>
                                            <div className="text-black text-left font-['Poppins-Medium',_sans-serif] text-sm font-medium" style={{ letterSpacing: '-0.01em' }}>
                                                6
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-4 items-start justify-start relative">
                                            <div className="text-[#adadad] text-left font-['Poppins-Medium',_sans-serif] text-sm font-medium" style={{ letterSpacing: '-0.01em' }}>
                                                Dom
                                            </div>
                                            <div className="text-black text-left font-['Poppins-Medium',_sans-serif] text-sm font-medium" style={{ letterSpacing: '-0.01em' }}>
                                                7
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[#0597ff] rounded-tl-xl rounded-tr-xl pt-3 pr-8 pb-3 pl-8 flex flex-row gap-6 items-center justify-start w-[366px] relative">
                                <div className="rounded-xl border-dashed border-white border p-3 flex flex-col gap-3 items-start justify-start relative">
                                    <div className="text-white text-left font-['Poppins-Medium',_sans-serif] text-sm font-medium" style={{ letterSpacing: '-0.01em' }}>
                                        Lunes
                                    </div>
                                    <div className="text-white text-left font-['Poppins-Medium',_sans-serif] text-2xl font-medium" style={{ letterSpacing: '-0.01em' }}>
                                        01
                                    </div>
                                </div>
                                <div className="flex flex-row gap-5 items-start justify-start flex-1 relative">
                                    <div className="flex flex-col gap-1.5 items-start justify-start relative">
                                        <div className="text-white text-left font-['Poppins-Medium',_sans-serif] text-sm font-medium" style={{ letterSpacing: '-0.01em' }}>
                                            Jane Cooper
                                        </div>
                                        <div className="text-white text-left font-['Poppins-Medium',_sans-serif] text-sm font-medium" style={{ letterSpacing: '-0.01em' }}>
                                            27 años
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-xl p-3 flex flex-row gap-2.5 items-center justify-center relative">
                                        <div className="text-[#292d32] text-left font-['Poppins-Medium',_sans-serif] text-sm font-medium" style={{ letterSpacing: '-0.01em' }}>
                                            9:00 AM
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-3xl p-8 flex flex-col gap-8 items-start justify-start self-stretch relative">
                            <div className="text-[#0080c8] text-left font-['Mulish-SemiBold',_sans-serif] text-base font-semibold" style={{ letterSpacing: '-0.01em' }}>
                                Reportes Ricientes
                            </div>
                            <div className="border-solid border-[#eeeeee] border-t border-r-0 border-b-0 border-l-0 self-stretch h-0 relative"></div>
                            <div className="flex flex-row gap-8 items-start justify-start self-stretch relative">
                                <div className="flex flex-row gap-3 items-start justify-start relative">
                                    <img className="shrink-0 w-6 h-6 relative overflow-visible" src="description0.svg" alt="description0" />
                                    <div className="text-[#292d32] text-left font-['Poppins-Medium',_sans-serif] text-sm font-medium" style={{ letterSpacing: '-0.01em' }}>
                                        Jane Cooper
                                    </div>
                                </div>
                                <div className="text-[#292d32] text-left font-['Poppins-Medium',_sans-serif] text-sm font-medium relative" style={{ letterSpacing: '-0.01em' }}>
                                    19-Junio-24
                                </div>
                            </div>
                            <div className="flex flex-row gap-8 items-start justify-start self-stretch relative">
                                <div className="flex flex-row gap-3 items-start justify-start relative">
                                    <img className="shrink-0 w-6 h-6 relative overflow-visible" src="description1.svg" alt="description1" />
                                    <div className="text-[#292d32] text-left font-['Poppins-Medium',_sans-serif] text-sm font-medium" style={{ letterSpacing: '-0.01em' }}>
                                        Jane Cooper
                                    </div>
                                </div>
                                <div className="text-[#292d32] text-left font-['Poppins-Medium',_sans-serif] text-sm font-medium relative" style={{ letterSpacing: '-0.01em' }}>
                                    19-Junio-24
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MedicalDashboard;
