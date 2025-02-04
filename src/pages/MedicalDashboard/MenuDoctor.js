import React, { useEffect, useState } from 'react';
import LogoHospital from '../../assets/LogoHospital.png';
import yo from '../../assets/yo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSignOutAlt, faChartBar, faUsers, faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";


const MenuDoctor = () => {
    const location = useLocation();
    const { citaId } = useParams(); // Obtiene el ID de la cita desde la URL

    const [menuOpen, setMenuOpen] = useState(false);
    const [userData, setUserData] = useState({ nombre: '', rol: '' });

    // Recuperar datos del usuario autenticado
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token'); // Recupera el token del almacenamiento local
                const response = await axios.get('http://localhost:8000/api/doctor-data/', {
                    headers: {
                        Authorization: `Token ${token}`, // Enviar el token de autenticación
                    },
                });
                setUserData({
                    nombre: `${response.data.nombre} ${response.data.apellido}`,
                    rol: response.data.rol,
                });
            } catch (error) {
                console.error('Error al recuperar los datos del usuario:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div>
            {/* Menú lateral para pantallas grandes */}
            <div className="bg-white p-4 flex flex-col justify-between min-h-screen fixed left-0 top-0 w-[260px] hidden lg:flex">
                {/* Parte superior: Logo y Menú */}
                <div className="flex flex-col gap-4 items-start w-full">
                    <img className="hospital-logo w-44" src={LogoHospital} alt="Logo" />

                    <div className="flex flex-col  items-start w-full mt-8">
                        <Link
                            to="/medicodashboard"
                            className={`rounded-lg p-2.5 flex items-center gap-2.5 w-full ${location.pathname === "/medicodashboard"
                                ? "  text-black bg-[#C7E8FF] "
                                : "text-gray-500"
                                }`}
                        >
                            <FontAwesomeIcon icon={faChartBar} className="w-4 h-4" />
                            <div className="font-normal text-base">Dashboard</div>
                        </Link>

                        <Link
                            to="/patientsearchandhistory"
                            className={`rounded-lg p-2.5 flex items-center gap-2.5 w-full ${location.pathname === "/patientsearchandhistory"
                                ? "  text-black bg-[#C7E8FF] "
                                : "text-gray-500"
                                }`}
                        >
                            <FontAwesomeIcon icon={faUsers} className="w-4 h-4" />
                            <div className="text-base">Historial de paciente</div>
                        </Link>

                        {/* <Link
                            to={`/consulta/${citaId || ""}`}
                            className={`rounded-lg p-2.5 flex items-center gap-2.5 w-full ${location.pathname === `/consulta/${citaId}` ? "text-black bg-[#C7E8FF]" : "text-gray-500"
                                }`}
                        >
                            <FontAwesomeIcon icon={faCalendarCheck} className="w-4 h-4" />
                            <div className="text-base">Gestión de citas</div>
                        </Link> */}
                    </div>
                </div>

                {/* Parte inferior: Datos del usuario y cerrar sesión */}
                <div className="flex flex-col gap-4 items-start w-full">
                    <div className="rounded-lg p-2.5 flex items-center gap-2.5 w-full mt-4">
                        <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4 text-gray-500" />
                        <div className="text-gray-500 font-light text-base">Cerrar Sesión</div>
                    </div>
                    <div className="w-full border-t border-gray-300"></div>
                    <div className="flex items-center gap-5 w-full">
                        <img src={yo} alt="Usuario" className="w-10 h-10 rounded-full object-cover" />
                        <div className="flex flex-col gap-2">
                            <div className="text-black font-semibold text-base">{userData.nombre || "Cargando..."}</div>
                            <div className="text-[#0080c8] text-base">{userData.rol || "Cargando rol..."}</div>
                        </div>
                    </div>

                </div>
            </div>


            {/* Menú hamburguesa para pantallas pequeñas */}
            <div className="bg-[#f9faff] p-4 flex items-center justify-between w-full fixed top-0 left-0 lg:hidden z-50">
                <img className="hospital-logo w-38 h-10" src={LogoHospital} alt="Logo" />
                <button
                    className="text-gray-500 p-2 rounded focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
                </button>
            </div>

            {/* Menú desplegable para pantallas pequeñas */}
            {menuOpen && (
                <div className="bg-[#f9faff] p-4 flex flex-col gap-4 fixed top-14 left-0 w-full z-50 shadow-lg lg:hidden">
                    <div className="flex flex-col gap-2.5 items-start">
                        <div className="bg-[#2393e3] bg-opacity-50 rounded-lg p-2.5 flex items-center gap-2.5 w-full">
                            <FontAwesomeIcon icon={faChartBar} className="w-4 h-4 text-white" />
                            <div className="text-white font-semibold text-base">Agendamiento de citas</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MenuDoctor;
