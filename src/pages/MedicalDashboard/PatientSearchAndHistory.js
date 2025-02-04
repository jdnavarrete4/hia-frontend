import React, { useState } from "react";
import axios from "axios";
import MenuDoctor from './MenuDoctor';

const PatientSearchAndHistory = () => {
    const [searchQuery, setSearchQuery] = useState(""); // Input del médico para buscar al paciente
    const [appointments, setAppointments] = useState([]); // Lista de citas
    const [loading, setLoading] = useState(false); // Indicador de carga
    const [error, setError] = useState(null); // Manejo de errores
    const [showDetails, setShowDetails] = useState({}); // Control de detalles de citas
    const token = localStorage.getItem("token"); // Obtener el token del médico

    // Buscar citas del paciente
    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        setAppointments([]);
        try {
            const response = await axios.get(
                `http://localhost:8000/api/historial-doctor-paciente/?q=${searchQuery}`,
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );
            setAppointments(response.data);
        } catch (err) {
            setError(err.response?.data?.error || "Error al buscar citas");
        } finally {
            setLoading(false);
        }
    };

    // Alternar la visualización de detalles
    const toggleDetails = (id) => {
        setShowDetails((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="lg:pl-[289px] pb-[100px] flex flex-col items-center  overflow-auto  gap-7 pt-10 bg-[#f9faff] min-h-screen">
            <MenuDoctor />
            {/* Encabezado */}
            <div className="w-full max-w-4xl">
                <div className="w-3/4 flex flex-col items-start mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Historial del paciente</h1>
                    <p className="text-gray-600">Utiliza las opciones disponibles en nuestro sistema</p>
                </div>
                <div className="flex items-center gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Ingrese cédula, nombre o apellido"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border rounded-lg p-2 flex-grow"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                        Buscar
                    </button>
                </div>

                {loading && <p className="text-center">Buscando citas...</p>}
                {error && <p className="text-red-500 text-center">{error}</p>}

                {/* Resultados */}
                {!loading && !error && appointments.length > 0 && (
                    <div className="bg-white shadow rounded-lg overflow-hidden p-2">
                        <table className="w-full border-collapse ">
                            <thead >
                                <tr>
                                    <th className="border-b p-3 text-left text-gray-700">Fecha / Hora</th>
                                    <th className="border-b p-3 text-left text-gray-700">Paciente</th>
                                    <th className="border-b p-3 text-left text-gray-700">Médico</th>
                                    <th className="border-b p-3 text-left text-gray-700">Especialidad</th>
                                    <th className="border-b p-3 text-left text-gray-700">Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map((appt) => (
                                    <React.Fragment key={appt.id}>
                                        <tr>
                                            <td className="border-p p-3">
                                                {appt.fecha} / {appt.hora}
                                            </td>
                                            <td className="border-p p-3">{appt.paciente}</td>
                                            <td className="border-p p-3">{appt.medico}</td>
                                            <td className="border-p p-3">{appt.especialidad}</td>
                                            <td className="border-p p-3">
                                                <span
                                                    className={`px-2 py-1 rounded text-sm ${appt.estado === "Reservada"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-blue-100 text-blue-700"
                                                        }`}
                                                >
                                                    {appt.estado}
                                                </span>
                                                {appt.estado === "finalizada" && (
                                                    <button
                                                        onClick={() => toggleDetails(appt.id)}
                                                        className="ml-2 text-blue-500 hover:underline"
                                                    >
                                                        {showDetails[appt.id] ? "Cerrar" : "Ver"}
                                                    </button>
                                                )}
                                            </td>
                                        </tr>

                                        {/* Detalles de la cita */}
                                        {showDetails[appt.id] && (
                                            <tr>
                                                <td colSpan="5" className="p-3 bg-gray-50">
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

                                                            <p className="font-semibold text-gray-800 text-lg">Triaje </p>

                                                            <p>
                                                                <strong>Categoria:</strong> <br></br> {appt.diagnostico.triaje}
                                                            </p>



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
                )}

                {!loading && !error && appointments.length === 0 && (
                    <p className="text-center text-gray-600">No hay citas para mostrar.</p>
                )}
            </div>
        </div >
    );
};

export default PatientSearchAndHistory;
