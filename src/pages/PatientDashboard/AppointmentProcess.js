import LogoHospital from '../../assets/LogoHospital.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendarAlt, faHistory, faNotesMedical, faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MenuPatient from './MenuPatient';
import Swal from 'sweetalert2';

const AppointmentProcess = () => {

    const [selectedSpecialty, setSelectedSpecialty] = useState(''); // Especialidad seleccionada
    const [availableDates, setAvailableDates] = useState([]); // Fechas disponibles
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const [totalPages, setTotalPages] = useState(1); // Total de páginas
    const [step, setStep] = useState(1); // Paso actual
    const [patientData, setPatientData] = useState(null); // Datos del paciente
    const [provinces, setProvinces] = useState([]); // Provincias
    const [selectedProvince, setSelectedProvince] = useState(''); // Provincia seleccionada
    const [cantons, setCantons] = useState([]); // Cantones disponibles
    const [specialties, setSpecialties] = useState([]); // Especialidades
    const [isModalOpen, setIsModalOpen] = useState(false); // Controla si el modal está abierto
    const [selectedAppointment, setSelectedAppointment] = useState(null); // Cita seleccionada
    const [selectedDate, setSelectedDate] = useState(null); // Estado para la fecha seleccionada
    const [selectedSpecialtyName, setSelectedSpecialtyName] = useState(""); // Estado para el nombre de la especialidad


    console.log("Datos del paciente:", patientData);

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8000/api/patient-data/', {
                    headers: {
                        Authorization: `Token ${token}`, // Enviar el token de autenticación
                    },
                });
                setPatientData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error al recuperar los datos del paciente:', error);
            }
        };

        fetchPatientData();
    }, []);


    useEffect(() => {
        const fetchProvincesAndCantons = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/provincias-cantones/');
                setProvinces(response.data);
            } catch (error) {
                console.error('Error al recuperar provincias y cantones:', error);
            }
        };

        fetchProvincesAndCantons();
    }, []);


    const handleProvinceChange = (event) => {
        const selected = event.target.value;
        setSelectedProvince(selected);
        const province = provinces.find((prov) => prov.nombre === selected);
        setCantons(province ? province.cantones : []);
    };


    if (!patientData) {
        return <div>Cargando datos...</div>;
    }

    //  continuar y cargar especialidades
    const handleContinue = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/especialidades/');
            setSpecialties(response.data);
            setStep(2);
        } catch (error) {
            console.error('Error al cargar especialidades:', error);
        }
    };

    // Manejar el cambio de especialidad
    const handleSpecialtyChange = (event) => {
        const selectedSpecialtyId = parseInt(event.target.value, 10);
        const selectedSpecialty = specialties.find((specialty) => specialty.id === selectedSpecialtyId);

        setSelectedSpecialty(selectedSpecialtyId);
        setSelectedSpecialtyName(selectedSpecialty?.nombre || "");
    };

    // Buscar fechas disponibles
    const handleSearchAvailability = async (page) => {
        if (!selectedSpecialty) {
            alert('Por favor selecciona una especialidad.');
            return;
        }

        const pageNumber = typeof page === 'number' ? page : currentPage;

        try {

            const response = await axios.get(
                `http://localhost:8000/api/fechas-disponibles/${selectedSpecialty}/?page=${pageNumber}`
            );

            console.log("Respuesta de la API:", response.data);


            const mappedDates = response.data.results.map((date) => ({
                ...date,
                medico_id: date.medico_id || null,
            }));

            setAvailableDates(mappedDates);
            console.log("Fechas disponibles actualizadas:", mappedDates);
            setCurrentPage(pageNumber);
            setTotalPages(Math.ceil(response.data.count / 10));
            setStep(3);
        } catch (error) {
            console.error('Error al buscar disponibilidad:', error);
        }
    };


    const handleSelectHour = (hour, date) => {
        if (!patientData || !patientData.id) {
            console.error("El ID del paciente no está disponible:", patientData);
            return;
        }

        if (!selectedSpecialty) {
            console.error("No se ha seleccionado ninguna especialidad:", selectedSpecialty);
            return;
        }

        if (!date.medico_id) {
            console.error("El ID del médico no está disponible en la fecha seleccionada:", date);
            return;
        }

        setSelectedAppointment({
            usuario: patientData.id,
            fecha: date.fecha,
            hora: hour,
            especialidad: selectedSpecialty,
            medico: date.medico_id,
            direccion: "Hospital General Isidro Ayora Piso 3",
            costo: 20.00,
        });
        setIsModalOpen(false);
        setStep(4);
    };









    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    const handleSelectDate = (date) => {
        setSelectedDate(date);
        setIsModalOpen(true);
    };


    const handleConfirmAppointment = async () => {
        try {
            const formattedDate = formatDateToISO(selectedAppointment.fecha);

            console.log("Datos seleccionados para la cita:", {
                ...selectedAppointment,
                fecha: formattedDate,
                estado: "Reservada",
            });

            const response = await axios.post("http://localhost:8000/api/crear-cita/", {
                usuario: patientData.id,
                especialidad: selectedAppointment.especialidad,
                medico: selectedAppointment.medico,
                fecha: formattedDate,
                hora: selectedAppointment.hora,
                direccion: selectedAppointment.direccion,
                estado: "Reservada", // Incluye el estado
            });

            console.log("Cita creada exitosamente:", response.data);

            Swal.fire({
                icon: "success",
                title: "Tu reserva fue creada exitosamente",
                text: "No olvides asistir 10 minutos antes con tu identificación",
            });

            setStep(1); // Reset
        } catch (error) {
            console.error("Error al crear la cita:", error);
            if (error.response && error.response.data) {
                console.error("Detalles del error:", error.response.data);
            }
            Swal.fire({
                icon: "error",
                title: "Error al crear la cita",
                text: "Revisa los datos e inténtalo nuevamente.",
            });
        }
    };


    const formatDateToISO = (dateString) => {

        const [day, month, year] = dateString.split("-");
        const months = {
            January: "01",
            February: "02",
            March: "03",
            April: "04",
            May: "05",
            June: "06",
            July: "07",
            August: "08",
            September: "09",
            October: "10",
            November: "11",
            December: "12",
        };

        return `${year}-${months[month]}-${day.padStart(2, "0")}`;
    };


    const generateHoursInRange = (startTime, endTime) => {
        const hours = [];
        let currentTime = new Date(`1970-01-01T${startTime}:00`);
        const end = new Date(`1970-01-01T${endTime}:00`);

        while (currentTime <= end) {
            hours.push(currentTime.toTimeString().slice(0, 5)); // Formato HH:MM
            currentTime.setMinutes(currentTime.getMinutes() + 60);
        }

        return hours;
    };

    const getSpecialtyName = (id) => {
        const specialty = specialties.find((spec) => spec.id === id);
        return specialty ? specialty.nombre : "Especialidad no encontrada";
    };


    const getMedicoName = (id) => {
        const dateWithMedico = availableDates.find((date) => date.medico_id === id);
        return dateWithMedico ? dateWithMedico.medico : "Médico no encontrado";
    };

    return (
        <div className="bg-[#f9faff] min-h-screen">

            <MenuPatient />




            <div className="lg:pl-[289px] flex flex-col items-center min-h-screen overflow-auto  gap-7 pt-10">

                <div className="flex flex-col gap-8 items-start w-[880px]">
                    <div className="flex flex-col gap-4 items-start">
                        <div className="text-black font-semibold text-2xl">
                            Bienvenido {patientData.nombre}
                        </div>
                        <div className="text-black font-light text-sm">
                            Utiliza las opciones disponibles en nuestro sistema
                        </div>
                    </div>
                </div>
                <div
                    className="bg-white rounded-3xl p-6 flex flex-col gap-8 items-start w-full max-w-[880px]"
                    style={{ boxShadow: '0px 20px 20px 0px rgba(0, 0, 0, 0.04)' }}
                >
                    <div className="text-black font-semibold text-xl">Datos del paciente</div>

                    {/* Primera fila */}
                    <div className="flex flex-row flex-wrap gap-6 items-center w-full">
                        <div className="flex flex-col gap-2.5 items-start flex-1 min-w-[250px]">
                            <div className="text-[#0080c8] font-semibold text-xs">Cédula</div>
                            <div className="text-black font-normal text-base">
                                {patientData.numero_cedula}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2.5 items-start flex-1 min-w-[250px]">
                            <div className="text-[#0080c8] font-semibold text-xs">Nombre</div>
                            <div className="text-black font-normal text-base">
                                {patientData.nombre} {patientData.apellido}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2.5 items-start flex-1 min-w-[250px]">
                            <div className="text-[#0080c8] font-semibold text-xs">Teléfono</div>
                            <div className="text-black font-normal text-base">
                                {patientData.telefono}
                            </div>
                        </div>
                    </div>

                    {/* Segunda fila */}
                    <div className="flex flex-row flex-wrap gap-6 items-center w-full">
                        <div className="flex flex-col gap-2.5 items-start flex-1 min-w-[250px]">
                            <div className="text-[#0080c8] font-semibold text-xs">Edad</div>
                            <div className="text-black font-normal text-base">{patientData.edad} años</div>
                        </div>
                        <div className="flex flex-col gap-2.5 items-start flex-1 min-w-[250px]">
                            <div className="text-[#0080c8] font-semibold text-xs">Correo</div>
                            <div className="text-black font-normal text-base">
                                {patientData.correo_electronico || 'No proporcionado'}
                            </div>
                        </div>
                    </div>
                </div>



                <div className="bg-white rounded-3xl p-4 sm:p-6 flex flex-col gap-6 sm:gap-8 w-full max-w-[880px] mx-auto">

                    {step === 1 && (
                        <>
                            <div className="text-black font-semibold text-xl">Datos para confirmar tu cita</div>
                            <div className="flex flex-col gap-6 items-start w-full">
                                <div className="flex flex-row gap-6 items-center w-full">
                                    <div className="flex flex-col gap-2 items-start flex-1">
                                        <label className="text-black font-semibold text-xs">*Provincia</label>
                                        <select
                                            className="w-full bg-white border border-gray-300 rounded-lg p-3 placeholder-text"
                                            value={selectedProvince}
                                            onChange={handleProvinceChange}
                                        >
                                            <option value="">Selecciona una provincia</option>
                                            {provinces.map((provincia) => (
                                                <option key={provincia.id} value={provincia.nombre}>
                                                    {provincia.nombre}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-2 items-start flex-1">
                                        <label className="text-black font-semibold text-xs">*Cantón</label>
                                        <select
                                            className="w-full bg-white border border-gray-300 rounded-lg p-3 placeholder-text"
                                            disabled={!cantons.length}
                                        >
                                            <option value="">Selecciona un cantón</option>
                                            {cantons.map((canton) => (
                                                <option key={canton.id} value={canton.nombre}>
                                                    {canton.nombre}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2.5 items-end w-full">
                                <button
                                    onClick={handleContinue}
                                    className="bg-[#2393e3] rounded-lg px-6 py-3 text-white font-bold text-sm"
                                >
                                    Continuar
                                </button>
                            </div>
                        </>
                    )}


                    {step === 2 && (
                        <>
                            <div className="text-black font-semibold text-xl">Disponibilidad</div>
                            <div className="text-black font-light text-sm">
                                Selecciona la especialidad que desees, selecciona la fecha y médico disponible.
                            </div>
                            <div className="flex flex-col gap-6 items-start w-full">
                                <div className="flex flex-col gap-2 items-start w-full">
                                    <label className="text-black font-semibold text-xs">*Especialidad</label>
                                    <select
                                        className="w-full bg-white border border-gray-300 rounded-lg p-3 placeholder-text"
                                        value={selectedSpecialty}
                                        onChange={handleSpecialtyChange}
                                    >
                                        <option value="">Selecciona la especialidad</option>
                                        {specialties.map((specialty) => (
                                            <option key={specialty.id} value={specialty.id}>
                                                {specialty.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-row justify-end w-full mt-6 gap-4">
                                <button
                                    onClick={() => setStep(1)}
                                    className="bg-white border border-gray-300 rounded-lg px-6 py-3 text-black font-bold text-sm"
                                >
                                    Volver
                                </button>
                                <button
                                    onClick={handleSearchAvailability}
                                    className="bg-[#2393e3] rounded-lg px-6 py-3 text-white font-bold text-sm"
                                >
                                    Buscar disponibilidad
                                </button>
                            </div>
                        </>
                    )}

                    {step === 3 && (
                        <div className="mt-6 w-full">
                            <h2 className="text-lg font-bold mb-4">Fechas Disponibles</h2>
                            {availableDates && availableDates.length > 0 ? (
                                <table className="table-auto w-full border border-gray-200">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="border px-4 py-2">Fecha</th>
                                            <th className="border px-4 py-2">Día</th>
                                            <th className="border px-4 py-2">Horario</th>
                                            <th className="border px-4 py-2">Médico</th>
                                            <th className="border px-4 py-2">Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {availableDates.map((date, index) => (
                                            <tr key={index}>
                                                <td className="border px-4 py-2">{date.fecha}</td>
                                                <td className="border px-4 py-2">{date.dia_semana}</td>
                                                <td className="border px-4 py-2">
                                                    {date.hora_inicio} - {date.hora_fin}
                                                </td>
                                                <td className="border px-4 py-2">{date.medico}</td>
                                                <td className="border px-4 py-2">
                                                    <button
                                                        onClick={() => handleSelectDate(date)} // Envía la fecha seleccionada al modal
                                                        className="bg-green-500 text-white px-3 py-1 rounded"
                                                    >
                                                        Seleccionar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-gray-500">No hay fechas disponibles.</p>
                            )}
                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={() => handleSearchAvailability(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    Anterior
                                </button>
                                <span>
                                    Página {currentPage} de {totalPages}
                                </span>
                                <button
                                    onClick={() => handleSearchAvailability(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    Siguiente
                                </button>
                            </div>
                        </div>
                    )}


                    {isModalOpen && selectedDate && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                                <h2 className="text-xl font-bold mb-4">Horas disponibles</h2>
                                <p className="text-gray-600 mb-4">
                                    Selecciona la hora disponible para agendar tu cita
                                </p>
                                <div className="grid grid-cols-3 gap-4">
                                    {generateHoursInRange(selectedDate.hora_inicio, selectedDate.hora_fin).map((hour) => (
                                        <button
                                            key={hour}
                                            onClick={() => handleSelectHour(hour, selectedDate)}
                                            className="bg-green-500 text-white px-3 py-1 rounded"
                                        >
                                            {hour}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
                                    onClick={handleCloseModal}
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    )}


                    {step === 4 && selectedAppointment && (
                        <div className="mt-6 w-full">
                            <h2 className="text-lg font-bold mb-4">Confirma los datos para tu cita</h2>
                            <p className="text-gray-600 mb-4">
                                Confirma la información de tu cita para proceder con el pago.
                            </p>
                            <div className="bg-white p-6 rounded-lg  ">
                                <div className="flex justify-between items-center mb-4 ">
                                    <div>
                                        <p className="text-sm text-gray-500">Costo</p>
                                        <p className="text-2xl font-bold">${selectedAppointment.costo.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Fecha y hora</p>
                                        <p className="text-lg font-bold">
                                            {selectedAppointment.fecha} / {selectedAppointment.hora}
                                        </p>
                                    </div>
                                </div>
                                <hr className="my-4" />
                                <div className="mb-4">
                                    <p className="text-sm text-blue-600">Especialidad</p>
                                    <p className="text-lg font-semibold">
                                        {getSpecialtyName(selectedAppointment.especialidad)}
                                    </p>
                                </div>
                                <div className="mb-4">
                                    <p className="text-sm text-blue-600">Médico</p>
                                    <p className="text-lg font-semibold">
                                        {getMedicoName(selectedAppointment.medico)}
                                    </p>
                                </div>
                                <div className="mb-4">
                                    <p className="text-sm text-blue-600">Dirección</p>
                                    <p className="text-lg font-semibold">{selectedAppointment.direccion}</p>
                                </div>
                                <div className="flex justify-between mt-4">
                                    <button
                                        onClick={() => setStep(3)} // Regresar al paso anterior
                                        className="bg-gray-300 text-black px-4 py-2 rounded"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={handleConfirmAppointment}
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        Confirmar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}



                </div>
            </div>
        </div>
    );
};

export default AppointmentProcess;
