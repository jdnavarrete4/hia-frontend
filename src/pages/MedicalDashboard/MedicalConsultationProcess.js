import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MenuDoctor from "./MenuDoctor";
import "rsuite/dist/rsuite.min.css";
import { Steps } from "rsuite";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faPrint } from '@fortawesome/free-solid-svg-icons';



const MedicalConsultationProcess = () => {
    const { citaId } = useParams();
    const navigate = useNavigate();
    const [appointment, setAppointment] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [step, setStep] = useState(1);

    const [enfermedades, setEnfermedades] = useState([]);
    const [selectedEnfermedad, setSelectedEnfermedad] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const [diagnosis, setDiagnosis] = useState("");
    const [isCovid, setIsCovid] = useState(false);
    const [medicamentos, setMedicamentos] = useState([
        { nombre: "", dosis: "", duracion: "", sugerencias: "" },
    ]);

    useEffect(() => {
        const fetchAppointment = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`http://127.0.0.1:8000/api/citas/${citaId}/`, {
                    headers: { Authorization: `Token ${localStorage.getItem("token")}` },
                });
                setAppointment(response.data);
            } catch (error) {
                console.error("Error al obtener los datos de la cita:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAppointment();
    }, [citaId]);

    useEffect(() => {
        const fetchEnfermedades = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/enfermedades/");
                setEnfermedades(response.data);
            } catch (error) {
                console.error("Error al obtener las enfermedades:", error);
            }
        };

        fetchEnfermedades();
    }, []);

    const handleNextStep = () => {
        if (step < 3) setStep(step + 1);
    };

    const handlePreviousStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleAddMedicamento = () => {
        setMedicamentos([
            ...medicamentos,
            { nombre: "", dosis: "", duracion: "", sugerencias: "" },
        ]);
    };

    const handleMedicamentoChange = (index, field, value) => {
        const nuevosMedicamentos = [...medicamentos];
        nuevosMedicamentos[index][field] = value;
        setMedicamentos(nuevosMedicamentos);
    };

    const handleRemoveMedicamento = (index) => {
        setMedicamentos((prevMedicamentos) =>
            prevMedicamentos.filter((_, i) => i !== index)
        );
    };
    const handleFinalize = async () => {
        if (!appointment || !appointment.medico_id || !appointment.paciente.id) {
            Swal.fire("Error", "Información incompleta de la cita.", "error");
            console.error("appointment:", appointment);
            return;
        }

        try {
            // Crear Diagnóstico
            const diagnosticoPayload = {
                descripcion: diagnosis,
                es_covid: isCovid,
                medico_id: appointment.medico_id,
                paciente_id: appointment.paciente.id,
                enfermedad: selectedEnfermedad,
            };
            const diagnosticoResponse = await axios.post(
                `http://127.0.0.1:8000/api/diagnosticos/${citaId}/`,
                diagnosticoPayload,
                {
                    headers: { Authorization: `Token ${localStorage.getItem("token")}` },
                }
            );
            const diagnosticoId = diagnosticoResponse.data.id;

            // Crear Receta
            const recetaPayload = {
                diagnostico_id: diagnosticoId,
                medicamentos: medicamentos.map((medicamento) => ({
                    nombre_medicamento: medicamento.nombre,
                    dosis: medicamento.dosis,
                    duracion: medicamento.duracion,
                    prescripcion: medicamento.sugerencias,
                })),
                notas: "Receta generada automáticamente",
            };
            const recetaResponse = await axios.post(
                "http://127.0.0.1:8000/api/recetas/",
                recetaPayload,
                {
                    headers: { Authorization: `Token ${localStorage.getItem("token")}` },
                }
            );
            console.log("Respuesta de la API de recetas:", recetaResponse.data);

            const recetaId = recetaResponse.data[0].id;

            // * antes de crear la ficha médica**
            console.log("Datos que se enviarán:", {
                cita_id: parseInt(citaId, 10),
                diagnostico_id: diagnosticoId,
                receta_id: recetaId,
            });

            // Crear Ficha Médica
            const fichaPayload = {
                cita_id: parseInt(citaId, 10),
                diagnostico_id: diagnosticoId,
                receta_id: recetaId,
            };
            await axios.post(
                "http://127.0.0.1:8000/api/fichas-medicas/",
                fichaPayload,
                {
                    headers: { Authorization: `Token ${localStorage.getItem("token")}` },
                }
            );

            Swal.fire("Éxito", "Ficha médica creada correctamente", "success");
            navigate("/medicodashboard");
        } catch (error) {
            console.error("Error al crear la ficha médica:", error);
            Swal.fire("Error", "Ocurrió un problema al crear la ficha médica", "error");
        }
    };




    if (isLoading) return <div className="text-center text-blue-600">Cargando datos de la cita...</div>;

    if (!appointment) return <div className="text-center text-red-600">No se encontraron datos de la cita.</div>;

    const { paciente } = appointment;


    return (
        <div className="flex min-h-screen bg-[#f9faff]">
            {/* Menú lateral con un ancho fijo */}
            <MenuDoctor />

            {/* Contenido principal */}
            <div className="flex-1 ml-[240px] px-56 py-8">
                {/* Título y botón */}
                <div className="flex items-center justify-between mb-12">
                    <h1 className="text-2xl font-bold text-[#000000]">Gestión de Cita</h1>
                    <button
                        className={`px-4 py-2 rounded-md ${step < 3 ? "bg-[#2393E3] hover:bg-blue-700" : "bg-[#2393E3] hover:bg-blue-700"
                            } text-white`}
                        onClick={step < 3 ? handleNextStep : handleFinalize}

                    >
                        {step < 3 ? "Siguiente" : "Finalizar"}
                    </button>
                </div>

                {/* Indicador de pasos */}
                <Steps current={step - 1}>
                    <Steps.Item title="Diagnóstico" />
                    <Steps.Item title="Receta" />
                    <Steps.Item title="Confirmación" />
                </Steps>

                {/* Contenedor de datos del paciente */}
                <div className="bg-white p-6 rounded-2xl  mt-12"
                    style={{ boxShadow: '0px 20px 20px 0px rgba(0, 0, 0, 0.01)' }}
                >
                    <h2 className="text-lg font-semibold text-[#000000] mb-4">Datos del paciente</h2>
                    <div className="grid grid-cols-3 gap-y-6 gap-x-4">
                        <div>
                            <p className="text-sm font-bold text-gray-400">Nombre completo</p>
                            <p className="text-gray-600">{`${paciente.first_name} ${paciente.last_name}`}</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-400 capitalize">{paciente.tipo_identificacion}</p>
                            <p className="text-gray-600">{paciente.numero_identificacion}</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-400">Dirección</p>
                            <p className="text-gray-600">{paciente.pais || "Sin dirección"}</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-400">Celular</p>
                            <p className="text-gray-600">{paciente.telefono}</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-400">Correo electrónico</p>
                            <p className="text-gray-600">{paciente.email}</p>
                        </div>
                    </div>
                </div>

                {/* Contenido dinámico según el paso */}
                {step === 1 && (
                    <div className="bg-white p-6 rounded-2xl  mt-8">
                        <h2 className="text-lg font-semibold text-[#000000] mb-4">Diagnóstico</h2>
                        <p className="text-sm text-gray-500 mb-6">
                            Selecciona el tipo de enfermedad y escribe el diagnóstico del paciente
                        </p>
                        <div className="mb-6">
                            <label
                                htmlFor="diseaseType"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                *Tipo de enfermedad
                            </label>
                            <div className="relative">
                                {/* Input con ícono */}
                                <div className="flex items-center border border-gray-300 rounded-md p-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                                    <input
                                        type="text"
                                        placeholder="Escribe para buscar..."
                                        className="w-full focus:outline-none"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        onFocus={() => setDropdownVisible(true)} // Mostrar dropdown al enfocar
                                    />
                                    {/* Ícono para abrir el dropdown */}
                                    <button
                                        onClick={() => setDropdownVisible(!dropdownVisible)}
                                        type="button"
                                        className="focus:outline-none"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-gray-400"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.707a1 1 0 011.414 0L10 11l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </div>

                                {/* Lista desplegable con coincidencias */}
                                {dropdownVisible && (
                                    <ul className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg w-full max-h-48 overflow-y-auto mt-1">
                                        {enfermedades
                                            .filter((enfermedad) =>
                                                enfermedad.nombre.toLowerCase().includes(searchTerm.toLowerCase())
                                            )
                                            .map((enfermedad) => (
                                                <li
                                                    key={enfermedad.id}
                                                    className="p-2 cursor-pointer hover:bg-blue-100"
                                                    onClick={() => {
                                                        setSelectedEnfermedad(enfermedad.id); // Establecer el ID en lugar del nombre
                                                        setSearchTerm(enfermedad.nombre); // Mostrar el nombre en el input
                                                        setDropdownVisible(false); // Ocultar dropdown después de seleccionar
                                                    }}
                                                >
                                                    {enfermedad.nombre}
                                                </li>
                                            ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="diagnosis"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Escribe el diagnóstico
                            </label>
                            <textarea
                                id="diagnosis"
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                rows={4}
                                value={diagnosis}
                                onChange={(e) => setDiagnosis(e.target.value)}
                                placeholder="Describe el diagnóstico del paciente..."
                            ></textarea>
                        </div>
                        <div className="flex items-center mt-4">
                            <label htmlFor="isCovid" className="mr-2 text-sm font-medium text-gray-700">
                                Paciente con Covid
                            </label>
                            <input
                                type="checkbox"
                                id="isCovid"
                                checked={isCovid}
                                onChange={(e) => setIsCovid(e.target.checked)}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="bg-white p-6 rounded-2xl  mt-4">
                        <h2 className="text-lg font-semibold text-[#000000] mb-4">Receta</h2>
                        <p className="text-sm text-gray-500 mb-6">
                            Genera la receta del paciente agregando medicamentos
                        </p>

                        {medicamentos.map((medicamento, index) => (
                            <div key={index} className="mb-6 border border-gray-300 p-4 rounded-md relative">
                                <h3 className="text-sm font-medium text-[#2c7fff] mb-4">Medicamento</h3>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            *Nombre
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Nombre del medicamento"
                                            value={medicamento.nombre}
                                            onChange={(e) =>
                                                handleMedicamentoChange(index, "nombre", e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            *Dosis
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Dosis"
                                            value={medicamento.dosis}
                                            onChange={(e) =>
                                                handleMedicamentoChange(index, "dosis", e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            *Duración
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Duración"
                                            value={medicamento.duracion}
                                            onChange={(e) =>
                                                handleMedicamentoChange(index, "duracion", e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <textarea
                                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    rows={2}
                                    placeholder="Escribir sugerencia o método de aplicación..."
                                    value={medicamento.sugerencias}
                                    onChange={(e) =>
                                        handleMedicamentoChange(index, "sugerencias", e.target.value)
                                    }
                                ></textarea>
                                {/* Botón para eliminar medicamento */}
                                <button
                                    type="button"
                                    className="absolute top-4 right-4 text-gray-500 hover:text-red-600"
                                    onClick={() => handleRemoveMedicamento(index)}
                                >
                                    <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
                                </button>
                            </div>
                        ))}

                        {/* Botón para agregar nuevo medicamento */}
                        <div className="flex gap-4 items-center ">
                            <p className="font-bold">Agregar Medicamento</p>
                            <button
                                type="button"
                                className="flex items-center gap-2 px-2 py-2 bg-blue-100 text-black rounded-md hover:bg-blue-200"
                                onClick={handleAddMedicamento}
                            >

                                <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />

                            </button></div>


                    </div>
                )}

                {step === 3 && (
                    <div className="bg-white p-6 rounded-2xl  mt-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold text-black mb-4">
                                Confirma los datos de la consulta
                            </h2>
                            {/* Botón para imprimir */}
                            <button
                                type="button"
                                className="text-gray-500 hover:text-blue-600"
                                onClick={() => window.print()}
                            >
                                <FontAwesomeIcon icon={faPrint} className="h-5 w-5" />
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 mb-6">
                            Revisa los datos de la consulta del paciente para generar el historial
                        </p>

                        {/* Diagnóstico */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-[#2c7fff] mb-6">Diagnóstico</h3>
                            <div className="mb-2">
                                <p className="text-sm font-bold text-gray-400">Tipo de enfermedad</p>
                                <p className="text-gray-600 mt-[1px]">
                                    {enfermedades?.find((e) => e.id === parseInt(selectedEnfermedad))?.nombre || "No especificado"}

                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-400">Descripción</p>
                                <p className="text-gray-600 mt-[1px]">{diagnosis || "No especificado"}</p>
                            </div>
                        </div>

                        {/* Receta */}
                        <div>
                            <h3 className="text-lg font-semibold text-[#2c7fff] mb-4">Receta</h3>
                            {medicamentos.length > 0 ? (
                                <div>
                                    <table className="w-full text-sm border-collapse mb-4">
                                        <thead>
                                            <tr>
                                                <th className="text-left text-sm font-bold text-gray-400 border-b py-2">Nombre</th>
                                                <th className="text-left text-sm font-bold text-gray-400 border-b py-2">Dosis</th>
                                                <th className="text-left text-sm font-bold text-gray-400 border-b py-2">Duración</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {medicamentos.map((medicamento, index) => (
                                                <tr key={index} className="border-b">
                                                    <td className="py-2">{medicamento.nombre}</td>
                                                    <td className="py-2">{medicamento.dosis}</td>
                                                    <td className="py-2">{medicamento.duracion}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div>
                                        <p className="text-sm font-bold text-gray-400">Nota</p>
                                        <p className="text-gray-600">
                                            {medicamentos[0]?.sugerencias || "No se ingresaron sugerencias."}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-600">No se han agregado medicamentos.</p>
                            )}
                        </div>
                    </div>
                )}


            </div>
        </div>

    );
};

export default MedicalConsultationProcess;
