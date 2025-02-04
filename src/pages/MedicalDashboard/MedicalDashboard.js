import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate

import Medicos from '../../assets/medicos.png';
import c1 from '../../assets/c1.png';
import c2 from '../../assets/c2.png';
import c3 from '../../assets/c3.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCalendarAlt, faHistory, faNotesMedical, faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import MenuDoctor from './MenuDoctor';

const MedicalDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [error, setError] = useState(null);
    const [doctorData, setDoctorData] = useState(null); // Datos del paciente
    const navigate = useNavigate();

    const medicoId = localStorage.getItem("medico_id");
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchDoctorData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8000/api/doctor-data/', {
                    headers: {
                        Authorization: `Token ${token}`, // Enviar el token de autenticación
                    },
                });
                setDoctorData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error al recuperar los datos del paciente:', error);
            }
        };

        fetchDoctorData();
    }, []);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`http://127.0.0.1:8000/api/medico/${medicoId}/citas/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                setAppointments(response.data);
            } catch (error) {
                console.error("Error al obtener las citas:", error);
                setError("No se pudieron cargar las citas. Intente nuevamente más tarde.");
            } finally {
                setIsLoading(false);
            }
        };

        if (medicoId) {
            fetchAppointments();
        } else {
            setError("No se encontró el ID del médico en localStorage.");
        }
    }, [medicoId, token]);

    const handleRowClick = (appointment) => {
        setIsOverlayVisible(true);
        setSelectedAppointment(appointment); // Establece la cita seleccionada

    };

    const handleCancel = () => {
        setIsOverlayVisible(false);
        setSelectedAppointment(null);
    };

    const handleStartConsultation = () => {
        if (!selectedAppointment) {
            console.error("No hay cita seleccionada");
            return;
        }
        navigate(`/medicodashboard/consulta/${selectedAppointment.id}`);
        setIsOverlayVisible(false);
    };


    if (isLoading) {
        return <div>Cargando citas...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }



    return (
        <div className="bg-[#f9faff] min-h-screen relative pb-[100px]">
            <MenuDoctor />
            <div className="lg:pl-[289px]  md:max-w-full flex flex-col 
            items-center min-h-screen overflow-auto  gap-7 md:pt-10 pt-[120px] p-6 md:p-0 ">


                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 w-full ">
                    <div className="flex flex-col gap-8 items-start justify-center relative w-full col-span-2">
                        <div className="flex flex-col gap-[22px] items-start justify-start">
                            <div className="text-black text-left font-['Mulish-SemiBold',_sans-serif] text-2xl font-semibold">
                                Bienvenido Dr. {doctorData ? `${doctorData.nombre} ${doctorData.apellido}` : "Cargando..."}
                            </div>
                            <div className="text-black text-left font-['Mulish-Light',_sans-serif] text-sm font-light">
                                Utiliza las opciones disponibles en nuestro sistema
                            </div>
                        </div>
                        <div className="bg-[#91c9f1] rounded-3xl p-8 
                        flex md:flex-row flex:col gap-2.5 items-center justify-start 
                        w-full relative mt-[80px] md:mt-0" style={{ boxShadow: '0px 20px 20px 0px rgba(0, 0, 0, 0.08)' }}>
                            <div className="flex flex-col gap-8 items-start justify-start w-[360px] mt-[200px] md:mt-0 ">
                                <div className="text-white text-left font-['Poppins-Medium',_sans-serif] text-xl font-medium" style={{ letterSpacing: '-0.01em' }}>
                                    Bienestar del Personal Médico
                                </div>
                                <div className="text-white text-left font-['Poppins-Regular',_sans-serif] text-sm font-normal w-[315px]" style={{ letterSpacing: '-0.01em' }}>
                                    Nuestro sistema está diseñado para apoyar y facilitar tu labor diaria, asegurando que puedas ofrecer el mejor cuidado a tus pacientes. ¡Gracias por tu dedicación y esfuerzo!
                                </div>
                            </div>

                            <img className="w-[341px] h-[277px] absolute md:left-[360.5px] right-1 md:right-0 top-[-72px] object-cover" src={Medicos} />
                        </div>
                    </div>
                    <div className="w-96 bg-white rounded-lg p-6 ">
                        <h3 className="text-[#0080c8] text-left font-['Mulish-SemiBold',_sans-serif] text-base font-semibold">Noticias para ti</h3>
                        <hr className="my-2" />
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <img className="w-20 h-14 rounded-md" src={c1} alt="Curso Farmacia" />
                                <div>
                                    <h4 className="font-medium text-lg">Curso <br></br> Farmacia Especializada</h4>
                                    <p className="text-gray-500 text-sm">12/Junio/2024</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <img className="w-20 h-14 rounded-md" src={c2} alt="Expertos ADN" />
                                <div>
                                    <h4 className="font-medium text-lg">Consejos <br></br> Expertos ADN</h4>
                                    <p className="text-gray-500 text-sm">12/Junio/2024</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <img className="w-20 h-14 rounded-md" src={c3} alt="Robotica Médica" />
                                <div>
                                    <h4 className="font-medium text-lg ">Curso <br></br> Robotica Médica</h4>
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
                        <div className="bg-[#fffff] ">
                            {/* Tabla de citas */}


                            <table className="min-w-full  bg-white rounded-lg">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 text-left text-[#B5B7C0]">Paciente</th>
                                        <th className="py-2 px-4 text-left text-[#B5B7C0]">Fecha</th>
                                        <th className="py-2 px-4 text-left text-[#B5B7C0]">Hora</th>
                                        <th className="py-2 px-4 text-left text-[#B5B7C0]">Contacto</th>
                                        <th className="py-2 px-4 text-left text-[#B5B7C0]">Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.length > 0 ? (
                                        appointments.map((appointment, index) => (
                                            <tr
                                                key={index}
                                                className={`border-b border-gray-200 ${appointment.estado === "finalizada"
                                                    ? "cursor-not-allowed"
                                                    : "cursor-pointer hover:bg-gray-100"
                                                    }`}
                                                onClick={
                                                    appointment.estado === "finalizada"
                                                        ? null // No hacer nada si está finalizada
                                                        : () => handleRowClick(appointment)
                                                }
                                            >
                                                <td className="py-4 px-4">
                                                    {appointment.paciente.first_name} {appointment.paciente.last_name}
                                                </td>
                                                <td className="py-4 px-4">{appointment.fecha}</td>
                                                <td className="py-4 px-4">{appointment.hora}</td>
                                                <td className="py-4 px-4">{appointment.paciente.telefono}</td>
                                                <td
                                                    className={`py-4 px-4 ${appointment.estado === "Reservada"
                                                        ? "text-green-600"
                                                        : "text-red-600"
                                                        }`}
                                                >
                                                    {appointment.estado}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="py-4 px-4 text-center text-gray-500">
                                                No hay citas disponibles.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>


                            {/* Overlay para confirmar acción */}
                            {isOverlayVisible && selectedAppointment && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                                        <h2 className="text-xl font-bold mb-4">
                                            ¿Deseas iniciar la consulta para{" "}
                                            {selectedAppointment.paciente.first_name}{" "}
                                            {selectedAppointment.paciente.last_name}?
                                        </h2>
                                        <div className="flex justify-end space-x-4">
                                            <button
                                                onClick={handleCancel}
                                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                onClick={handleStartConsultation}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                            >
                                                Comenzar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
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
