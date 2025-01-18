import React, { useState } from "react";
import MenuAdmin from "./MenuAdmin";
import CovidStats from "./CovidStats";
import ProvinciaStats from "./ProvinciaStats";
import EspecialidadStats from "./EspecialidadStats";
import EnfermedadStats from "./EnfermedadStats";
import EfficiencyStats from "./EficiencyStats";

const AdminDashboard = () => {
    const [selectedTab, setSelectedTab] = useState("general");

    return (
        <div className="bg-[#f9faff] min-h-screen">
            <MenuAdmin />

            <div className="lg:pl-[289px] pb-[100px] flex flex-col items-center min-h-screen overflow-auto gap-7 pt-5">
                {/* Encabezado */}
                <div className="pt-16  flex flex-col gap-8 items-start justify-start self-stretch relative">
                    {/* <div className="pr-8 pl-8 flex flex-col gap-2.5 items-start justify-start self-stretch relative">
                        <div className="flex flex-col gap-[22px] items-start justify-start self-stretch relative"> */}
                    {/* <h1 className="text-black text-2xl font-semibold">
                                Estadisticas
                            </h1> */}
                    {/* <p className="text-black text-base font-light">
                                Mira todas las actualizaciones y reportes estadísticos médicos disponibles
                            </p> */}
                    {/* </div>
                    </div> */}

                    {/* Botones */}
                    <div className="flex gap-4 px-8">
                        <button
                            onClick={() => setSelectedTab("general")}
                            className={`px-6 py-2 rounded-3xl transition-colors duration-200 ${selectedTab === "general"
                                ? "bg-[#9dd4fc]  bg-opacity-50 font-semibold "
                                : "bg-gray-100 text-gray-600 "
                                }`}
                        >
                            Enfermedades
                        </button>
                        <button
                            onClick={() => setSelectedTab("ubicacion")}
                            className={`px-6 py-2 rounded-3xl  transition-colors duration-200 ${selectedTab === "ubicacion"
                                ? "bg-[#9dd4fc]  bg-opacity-50 font-semibold "
                                : "bg-gray-100 text-gray-600"
                                }`}
                        >
                            Servicios
                        </button>
                        <button
                            onClick={() => setSelectedTab("eficiencia")}
                            className={`px-6 py-2 rounded-3xl transition-colors duration-200 ${selectedTab === "eficiencia"
                                ? "bg-[#9dd4fc]  bg-opacity-50 font-semibold "
                                : "bg-gray-100 text-gray-600 "
                                }`}
                        >
                            Eficiencia
                        </button>
                    </div>
                </div>

                {/* Contenido dinámico */}
                <div className="pr-8 pl-8 flex flex-col gap-8 items-start justify-center w-full">
                    {selectedTab === "general" && (
                        <div className="w-full">
                            <p className="text-black text-base font-light pb-8">
                                Explora las estadísticas sobre las enfermedades más comunes reportadas.
                            </p>
                            <div className="flex flex-col md:flex-row gap-8 items-stretch justify-center w-full">

                                {/* Contenedor de estadísticas de Covid */}
                                <div className="w-full md:w-2/3 flex items-stretch">

                                    <div className="bg-white flex-1 rounded-xl">
                                        <CovidStats />
                                    </div>
                                </div>

                                {/* Contenedor de estadísticas de Enfermedades */}
                                <div className="w-full md:w-2/4 flex items-stretch">
                                    <div className="bg-white flex-1  rounded-xl">
                                        <EnfermedadStats />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedTab === "ubicacion" && (
                        <div className="w-full">
                            <p className="text-black text-base font-light pb-8">
                                Consulta datos relevantes sobre la distribución de pacientes por provincia y género, así como la asistencia por especialidad
                            </p>
                            <div className="flex flex-col md:flex-row gap-8 items-stretch justify-center w-full">
                                {/* Contenedor de estadísticas de Covid */}
                                <div className="w-full md:w-2/3 flex items-stretch">
                                    <div className="bg-white flex-1 rounded-xl">
                                        <ProvinciaStats />
                                    </div>
                                </div>

                                {/* Contenedor de estadísticas de Enfermedades */}
                                <div className="w-full md:w-2/4 flex items-stretch">
                                    <div className="bg-white flex-1  rounded-xl">
                                        <EspecialidadStats />
                                    </div>
                                </div>
                            </div>
                        </div>

                    )}

                    {selectedTab === "eficiencia" && (
                        <div className="w-full">
                            <p className="text-black text-base font-light pb-8">
                                Analiza el desempeño de las especialidades y médicos a través de las calificaciones recibidas.
                            </p>
                            <div className="lg:pr-[289px] w-full">

                                <EfficiencyStats />
                            </div>
                        </div>




                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
