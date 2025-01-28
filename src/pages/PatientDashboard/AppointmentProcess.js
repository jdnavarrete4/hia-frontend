import LogoHospital from '../../assets/LogoHospital.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendarAlt, faHistory, faNotesMedical, faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MenuPatient from './MenuPatient';
import Swal from 'sweetalert2';
import MyCalendar from './MyCalendar';
import { parse, format } from 'date-fns';
import { enUS } from 'date-fns/locale';


const AppointmentProcess = () => {

    const [selectedSpecialty, setSelectedSpecialty] = useState(''); // Especialidad seleccionada
    const [availableDates, setAvailableDates] = useState([]); // Fechas disponibles
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
    const [activeStartDate, setActiveStartDate] = useState(new Date());


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
    const handleSearchAvailability = async (startDate, endDate, setFirstDateCallback) => {
        if (!selectedSpecialty) {
            alert('Por favor selecciona una especialidad.');
            return;
        }

        setAvailableDates([]); // Limpia las fechas anteriores

        try {
            let allDates = [];
            let currentPage = 1;

            while (true) {
                const response = await axios.get(
                    `http://localhost:8000/api/fechas-disponibles/${selectedSpecialty}/`,
                    { params: { start_date: startDate, end_date: endDate, page: currentPage } }
                );

                const mappedDates = response.data.results.map((date) => ({
                    ...date,
                    horarios: date.horarios || [],
                    medico_id: date.medico_id || null,
                    medico: date.medico || 'Sin asignar',
                }));

                allDates = [...allDates, ...mappedDates];

                if (!response.data.next) break;
                currentPage++;
            }

            const sortedDates = allDates
                .filter((d) => {
                    const parsedDate = parse(d.fecha, 'dd-MMMM-yyyy', new Date());
                    return parsedDate >= new Date(); // Excluir fechas pasadas
                })
                .sort((a, b) => {
                    const dateA = parse(a.fecha, 'dd-MMMM-yyyy', new Date());
                    const dateB = parse(b.fecha, 'dd-MMMM-yyyy', new Date());
                    return dateA - dateB;
                });

            setAvailableDates(sortedDates);

            // Actualiza el mes inicial del calendario al mes de la primera fecha disponible
            if (sortedDates.length > 0) {
                const firstAvailableDate = parse(sortedDates[0].fecha, 'dd-MMMM-yyyy', new Date());
                setActiveStartDate(new Date(firstAvailableDate.getFullYear(), firstAvailableDate.getMonth(), 1));
            } else {
                // Si no hay fechas disponibles, muestra el mes actual
                setActiveStartDate(new Date());
            }
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
            paciente: patientData.id,
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
        // Verifica que 'date.horarios' exista (pero en teoría ya existe)
        setSelectedDate(date);
        setIsModalOpen(true);
        console.log("Fecha recibida:", date);
    };
    const handleConfirmAppointment = async () => {
        try {
            // Validar que selectedAppointment tenga una fecha válida
            if (!selectedAppointment || !selectedAppointment.fecha) {
                throw new Error("No se ha seleccionado una fecha válida.");
            }

            console.log("Fecha recibida:", selectedAppointment.fecha);

            // Parsear y formatear la fecha
            const cleanedDate = selectedAppointment.fecha.trim(); // Elimina espacios extra
            const parsedDate = parse(cleanedDate, 'dd-MMMM-yyyy', new Date()); // Parsear

            if (isNaN(parsedDate)) {
                throw new Error("El formato de la fecha es inválido.");
            }

            const formattedDate = format(parsedDate, 'yyyy-MM-dd'); // Formatear para la API

            console.log("Fecha formateada para la API:", formattedDate);

            // Crear el payload para la API
            const payload = {
                paciente: patientData.id,
                especialidad: selectedAppointment.especialidad,
                medico: selectedAppointment.medico,
                fecha: formattedDate,
                hora: selectedAppointment.hora,
                direccion: selectedAppointment.direccion,
                estado: "Reservada",
            };

            console.log("Payload enviado a la API:", payload);

            // Enviar la solicitud a la API
            const response = await axios.post("http://localhost:8000/api/crear-cita/", payload);

            console.log("Cita creada exitosamente:", response.data);

            Swal.fire({
                icon: "success",
                title: "Cita creada exitosamente",
                text: "No olvides asistir 10 minutos antes con tu identificación.",
            });

            setStep(1); // Resetear el flujo
        } catch (error) {
            console.error("Error al crear la cita:", error.message);
            Swal.fire({
                icon: "error",
                title: "Error al crear la cita",
                text: error.message || "Revisa los datos e inténtalo nuevamente.",
            });
        }
    };





    const formatDateToISO = (dateString) => {
        if (dateString.includes("-") && dateString.split("-").length === 3) {
            return dateString; // Ya está en formato ISO
        }

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




    const getSpecialtyName = (id) => {
        const specialty = specialties.find((spec) => spec.id === id);
        return specialty ? specialty.nombre : "Especialidad no encontrada";
    };

    const getMedicoName = (id) => {
        const dateWithMedico = availableDates.find((date) => date.medico_id === id);
        return dateWithMedico ? dateWithMedico.medico : "Médico no encontrado";
    };

    return (
        <div className="bg-[#f9faff] min-h-screen pb-12">

            <MenuPatient />




            <div className="lg:pl-[289px] pb-[100px] md:max-w-full flex flex-col 
            items-center min-h-screen overflow-auto  gap-7 md:pt-10 pt-[120px] p-6 md:p-0">

                <div className="flex flex-col gap-8 items-start md:w-[880px] ">
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
                    className="bg-white rounded-3xl p-8 flex flex-col gap-8 items-start w-full max-w-[880px]"
                    style={{ boxShadow: '0px 20px 20px 0px rgba(0, 0, 0, 0.01)' }}
                >
                    <div className="text-black font-semibold text-xl">Datos del paciente</div>

                    {/* Primera fila */}
                    <div className="flex md:flex-row flex-col flex-wrap gap-6 md:items-center items-start w-full">
                        <div className="flex flex-col gap-1 items-start flex-1 min-w-[250px]">
                            <div className="text-[#0080c8] font-medium text-xs capitalize">{patientData.tipo_identificacion}</div>
                            <div className="text-black font-normal text-base">
                                {patientData.numero_identificacion}
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 items-start flex-1 min-w-[250px]">
                            <div className="text-[#0080c8] font-medium text-xs">Nombre</div>
                            <div className="text-black font-normal text-base">
                                {patientData.nombre} {patientData.apellido}
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 items-start flex-1 min-w-[250px]">
                            <div className="text-[#0080c8] font-medium text-xs">Teléfono</div>
                            <div className="text-black font-normal text-base">
                                {patientData.telefono}
                            </div>
                        </div>
                    </div>

                    {/* Segunda fila */}
                    <div className="flex md:flex-row flex-col flex-wrap gap-6 md:items-center items-start w-full">
                        <div className="flex flex-col gap-1 items-start flex-1 min-w-[250px]">
                            <div className="text-[#0080c8] font-medium text-xs">Edad</div>
                            <div className="text-black font-normal text-base">{patientData.edad} años</div>
                        </div>
                        <div className="flex flex-col gap-1 items-start flex-1 min-w-[250px]">
                            <div className="text-[#0080c8] font-medium text-xs">Correo</div>
                            <div className="text-black font-normal text-base">
                                {patientData.correo_electronico || 'No proporcionado'}
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 items-start flex-1 min-w-[250px]">
                            <div className="text-[#0080c8] font-medium text-xs">Genero</div>
                            <div className="text-black font-normal text-base">
                                {patientData.genero || 'No proporcionado'}
                            </div>
                        </div>
                    </div>
                </div>



                <div className=" flex flex-col gap-6  w-full max-w-[880px] mx-auto">

                    {step === 1 && (
                        <>
                            <button
                                onClick={handleContinue}
                                className="
        self-start
        relative
        inline-flex
        items-center 
        gap-2
        text-xl 
        font-semibold 
        text-black
        bg-transparent
        border-none
        p-0
        cursor-pointer

        after:content-['']
        after:absolute
        after:left-0
        after:-bottom-2
        after:w-0
        after:h-[3px]
        after:rounded-full
        after:bg-[#0080c8]
        after:transition-all
        after:duration-300
        hover:after:w-full
      "
                            >
                                <span className="text-lgt">Iniciar agendamiento de cita</span>
                                <span className="text-2xl font-bold leading-none">+</span>
                            </button>
                        </>
                    )}


                    {step === 2 && (
                        <>
                            <div className='bg-white rounded-3xl p-6 flex flex-col gap-4'>
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
                                <div className="flex md:flex-row flex-col justify-end w-full  gap-4 mt-10">
                                    <button
                                        onClick={() => setStep(1)}
                                        className="bg-white border border-gray-300 
                                        rounded-lg px-6 py-3 text-black font-normal text-sm order-2 md:order-1"
                                    >
                                        Regresar
                                    </button>
                                    <button
                                        onClick={async () => {
                                            if (!selectedSpecialty) return; // Validación de especialidad

                                            const today = new Date();
                                            const startDate = format(today, 'yyyy-MM-dd');
                                            const endDate = format(new Date(today.getFullYear(), today.getMonth() + 3, today.getDate()), 'yyyy-MM-dd');

                                            await handleSearchAvailability(startDate, endDate); // Llama a la función de búsqueda
                                            setStep(3); // Avanza al paso 3
                                        }}
                                        className={`bg-[#0080c8] text-white px-4 md:py-2 py-3 rounded order-1 ${!selectedSpecialty ? 'opacity-50 cursor-not-allowed' : ''
                                            }`}
                                        disabled={!selectedSpecialty}
                                    >
                                        Buscar disponibilidad
                                    </button>









                                </div>
                            </div>

                        </>
                    )}

                    {step === 3 && (
                        <div className="w-full bg-transparent md:bg-white rounded-3xl md:p-3 p-0">
                            <MyCalendar
                                availableDates={availableDates}
                                activeStartDate={activeStartDate}
                                setActiveStartDate={setActiveStartDate}
                                handleSelectDate={handleSelectDate}
                                handleSearchAvailability={handleSearchAvailability}
                                handleBack={() => setStep(2)}
                            />
                        </div>
                    )}



                    {isModalOpen && selectedDate && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg md:w-1/3 w-1/1">
                                <h2 className="text-xl font-bold mb-4">Horas disponibles</h2>
                                <p className="text-gray-600 mb-4">
                                    Selecciona la hora disponible para agendar tu cita
                                </p>
                                <div className="grid grid-cols-3 gap-4">
                                    {selectedDate.horarios.map((hour) => (
                                        <button
                                            key={hour}
                                            onClick={() => handleSelectHour(hour, selectedDate)}
                                            className="bg-white text-black px-3 py-2 rounded shadow-[0px_20px_20px_0px_rgba(0,0,0,0.05)] hover:bg-gray-100 focus:outline-none"
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
                        <div className=" w-full bg-white rounded-3xl p-6">
                            <h2 className="text-lg font-bold mb-4">Confirma los datos para tu cita</h2>
                            <p className="text-gray-600 mb-4">
                                Confirma la información de tu cita para proceder con el pago.
                            </p>
                            <div className=" p-2 rounded-lg ">
                                {/* Primera fila: Costo */}
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <p className="text-sm text-[#0080c8] ">Costo</p>
                                        <p className="text-2xl font-bold mt-0">${selectedAppointment.costo.toFixed(2)}</p>
                                    </div>
                                </div>

                                {/* Segunda fila: Médico y Fecha */}
                                <div className="flex md:flex-row flex-col justify-between md:items-center mb-4 gap-4 md:gap-0">
                                    <div>
                                        <p className="text-sm text-[#0080c8]">Médico</p>
                                        <p className="text-lg  mt-0">
                                            {getMedicoName(selectedAppointment.medico) || "Médico no asignado"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-[#0080c8]">Fecha y hora</p>
                                        <p className="text-lg  mt-0">
                                            {selectedAppointment.fecha} / {selectedAppointment.hora}
                                        </p>
                                    </div>
                                </div>

                                {/* Línea divisora */}
                                <hr className="my-4 border-dashed border-gray-300" />

                                {/* Cuarta fila: Especialidad */}
                                <div className="mb-4">
                                    <p className="text-sm text-[#0080c8]">Especialidad</p>
                                    <p className="text-lg  mt-0">
                                        {getSpecialtyName(selectedAppointment.especialidad)}
                                    </p>
                                </div>

                                {/* Quinta fila: Dirección */}
                                <div className="mb-4">
                                    <p className="text-sm text-[#0080c8]">Dirección</p>
                                    <p className="text-lg  mt-0">{selectedAppointment.direccion}</p>
                                </div>

                                {/* Botones */}
                                <div className="flex flex-col  md:flex-row justify-end mt-16 md:space-x-2 gap-4 ">
                                    <button
                                        onClick={() => setStep(3)} // Regresar al paso anterior
                                        className="text-black px-4 py-2 rounded border border-gray-400 hover:bg-gray-200 md:order-2 order-1"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={handleConfirmAppointment}
                                        className="bg-[#0080c8] text-white px-4 py-2 rounded hover:bg-blue-600 font-medium md:order-2 "
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
