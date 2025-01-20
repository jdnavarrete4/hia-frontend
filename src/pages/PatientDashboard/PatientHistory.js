import React, { useEffect, useState } from "react";
import axios from "axios";

const PatientHistory = () => {
    const [appointments, setAppointments] = useState([]); // Lista de citas
    const [loading, setLoading] = useState(true); // Indicador de carga
    const [showOverlay, setShowOverlay] = useState(false); // Control del overlay
    const [currentAppointment, setCurrentAppointment] = useState(null); // Cita seleccionada
    const [selectedRating, setSelectedRating] = useState(null); // Calificación seleccionada

    // Obtener el token de `localStorage`
    const token = localStorage.getItem("token");

    // Obtener el historial de citas al cargar el componente
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/historial-paciente/", {
                    headers: {
                        Authorization: `Token ${token}`, // Enviar el token de autenticación
                    },
                });
                setAppointments(response.data); // Guardar las citas en el estado
                setLoading(false);
            } catch (error) {
                console.error("Error al obtener las citas:", error);
                setLoading(false);
            }
        };

        fetchAppointments();
    }, [token]);

    // Manejar la apertura del overlay para calificar
    const handleOpenOverlay = (appointment) => {
        setCurrentAppointment(appointment);
        setShowOverlay(true);
    };

    // Guardar la calificación
    const handleSaveRating = async () => {
        try {
            if (!currentAppointment || !selectedRating) return;

            // Enviar la calificación al backend
            await axios.post(
                `http://localhost:8000/api/citas/${currentAppointment.id}/calificar/`,
                { calificacion: selectedRating },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );

            // Actualizar el estado de las citas
            setAppointments((prevAppointments) =>
                prevAppointments.map((appt) =>
                    appt.id === currentAppointment.id
                        ? { ...appt, calificacion: selectedRating }
                        : appt
                )
            );

            // Cerrar el overlay
            setShowOverlay(false);
            setSelectedRating(null);
            setCurrentAppointment(null);
        } catch (error) {
            console.error("Error al calificar la cita:", error);
        }
    };


    // Alternar la visualización de detalles
    const handleToggleInfo = (appointmentId) => {
        setAppointments((prev) =>
            prev.map((appt) =>
                appt.id === appointmentId
                    ? { ...appt, showDetails: !appt.showDetails }
                    : appt
            )
        );
    };

    // Renderizar
    if (loading) return <p className="text-center py-10">Cargando historial de citas...</p>;

    return (



        <div className="lg:pl-[289px] pb-[100px] flex flex-col items-center  overflow-auto  gap-7 pt-10 bg-[#f9faff] min-h-screen">

            <div className="flex flex-col gap-8 items-start w-[1080px]">

                {/* Encabezado */}
                <div className="w-3/4 flex flex-col items-start">
                    <h1 className="text-2xl font-bold text-gray-800">Historial de citas</h1>
                    <p className="text-gray-600">Utiliza las opciones disponibles en nuestro sistema</p>
                </div>
                {/* Tabla */}
                <div className="bg-white shadow-md rounded-lg w-3/4 p-4">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="border-b p-3 text-left text-gray-700">Fecha / Hora</th>
                                <th className="border-b p-3 text-left text-gray-700">Médico</th>
                                <th className="border-b p-3 text-left text-gray-700">Especialidad</th>
                                <th className="border-b p-3 text-left text-gray-700">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appt) => (
                                <React.Fragment key={appt.id}>
                                    <tr>
                                        <td className="p-3">{`${appt.fecha} / ${appt.hora}`}</td>
                                        <td className="p-3">{appt.medico}</td>
                                        <td className="p-3">{appt.especialidad}</td>
                                        <td className="p-3 flex items-center gap-3">
                                            <span
                                                className={`px-2 py-1 rounded text-sm ${appt.estado === "Reservada"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-blue-100 text-blue-700"
                                                    }`}
                                            >
                                                {appt.estado}
                                            </span>
                                            {appt.estado === "finalizada" && (
                                                <>
                                                    {appt.calificacion ? (
                                                        // Mostrar botón "Abrir" si la cita ya está calificada
                                                        <button
                                                            onClick={() => handleToggleInfo(appt.id)}
                                                            className="ml-2 text-blue-500 hover:underline"
                                                        >
                                                            Abrir
                                                        </button>
                                                    ) : (
                                                        // Mostrar botón "Calificar" si la cita no está calificada
                                                        <button
                                                            onClick={() => handleOpenOverlay(appt)}
                                                            className="ml-2 text-blue-500 hover:underline"
                                                        >
                                                            Calificar
                                                        </button>
                                                    )}
                                                </>
                                            )}
                                        </td>

                                    </tr>

                                    {/* Detalles de diagnóstico y receta */}
                                    {appt.showDetails && appt.estado === "finalizada" && (
                                        <tr>
                                            <td colSpan="4" className="p-3 bg-gray-50">
                                                {/* Diagnóstico */}
                                                {appt.diagnostico && (
                                                    <div className="mb-4 ">
                                                        <p className="font-semibold text-gray-800 text-xl">Informacion de cita</p>
                                                        <p className="font-semibold text-gray-800 text-lg">Diagnóstico</p>
                                                        <p>
                                                            <strong>Tipo enfermedad:</strong> <br></br> {appt.diagnostico.enfermedad}
                                                        </p>

                                                        <p>
                                                            <strong>Descripción:</strong> <br></br> {appt.diagnostico.descripcion}
                                                        </p>


                                                        <p>
                                                            <strong>Es COVID:</strong> {appt.diagnostico.es_covid ? "Sí" : "No"}
                                                        </p>
                                                        <hr className="border-t-1 border-blue-300 my-4" />
                                                    </div>
                                                )}

                                                {/* Receta */}
                                                <p className="font-semibold text-gray-800 text-lg">Receta</p>
                                                {appt.recetas?.map((receta, index) => (
                                                    <div key={index} className="mb-2">


                                                        <div className="flex justify-between items-center">
                                                            <p>
                                                                <strong>Medicamento:</strong> {receta.nombre_medicamento}
                                                            </p>
                                                            <p>
                                                                <strong>Dosis:</strong> {receta.dosis}
                                                            </p>
                                                            <p>
                                                                <strong>Duración:</strong> {receta.duracion}
                                                            </p>
                                                        </div>

                                                        <p>
                                                            <strong>Prescripción:</strong> <br></br> {receta.prescripcion}
                                                        </p>
                                                        <hr className="border-t-[1px] border-blue-300 my-4" />

                                                    </div>

                                                ))}
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}

                        </tbody>
                    </table>
                </div>

                {/* Overlay de calificación */}
                {showOverlay && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                            <h2 className="text-lg font-bold mb-4">Califica tu experiencia</h2>
                            <p className="mb-4 text-gray-700">
                                Ayúdanos a mejorar la calidad de nuestro servicio calificando tu
                                experiencia de 1 a 5 estrellas.
                            </p>
                            <div className="flex justify-center mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        className={`text-2xl ${selectedRating >= star ? "text-blue-500" : "text-gray-300"
                                            }`}
                                        onClick={() => setSelectedRating(star)}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={handleSaveRating}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientHistory;
