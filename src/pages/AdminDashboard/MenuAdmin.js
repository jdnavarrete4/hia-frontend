import React from 'react';
import LogoHospital from '../../assets/LogoHospital.png';
import yo from '../../assets/yo.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faUsers, faCalendarCheck, faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const MenuAdmin = () => {
    return (
        <div className="bg-white p-4 flex flex-col justify-between min-h-screen fixed left-0 top-0 w-[289px]">
            <div className="flex flex-col gap-4 items-start w-full">
                <div className="flex items-center gap-4 w-full">
                    <img className="hospital-logo w-36 h-13" src={LogoHospital} alt="Logo" />
                </div>

                <div className="flex flex-col gap-2.5 items-start w-full mt-8"> {/* Added margin-top here */}
                    <div className="bg-[#2393e3] bg-opacity-50 rounded-lg p-2.5 flex items-center gap-2.5 w-full">
                        <FontAwesomeIcon icon={faChartBar} className="w-5 h-5 text-white" />
                        <div className="text-white font-semibold text-base">Estadísticas</div>
                    </div>
                    <div className="rounded-lg p-2.5 flex items-center gap-2.5 w-full">
                        <FontAwesomeIcon icon={faUsers} className="w-5 h-5 text-gray-500" />
                        <div className="text-gray-500 font-light text-base">Gestión de usuarios</div>
                    </div>
                    <div className="rounded-lg p-2.5 flex items-center gap-2.5 w-full">
                        <FontAwesomeIcon icon={faCalendarCheck} className="w-5 h-5 text-gray-500" />
                        <div className="text-gray-500 font-light text-base">Gestión de citas</div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 items-start w-full">
                <div className="rounded-lg p-2.5 flex items-center gap-2.5 w-full">
                    <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5 text-gray-500" />
                    <div className="text-gray-500 font-light text-base">Cerrar Sesión</div>
                </div>
                <div className="w-full border-t border-gray-300 mt-2"></div> {/* Linea gris debajo de Cerrar Sesión */}
                <div className="flex items-center gap-5 w-full">
                    <img src={yo} alt="Admin" className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex flex-col gap-2">
                        <div className="text-black font-semibold text-base">Jordy Navarrete</div>
                        <div className="text-[#0080c8] text-base">Admin</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuAdmin;
