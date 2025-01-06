import React, { useEffect, useState } from 'react';
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import axios from 'axios';

const CovidStats = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Llamada a la API para obtener datos
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/estadisticas-covid/', {
                    headers: {
                        Authorization: `Token ${localStorage.getItem('token')}`, // Reemplaza con tu método de autenticación
                    },
                });
                setData(response.data);
            } catch (err) {
                setError('Error al cargar las estadísticas.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Cargando estadísticas...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="bg-white rounded-3xl p-8 ">
            <h2 className="text-[#0080c8] font-extralight text-lg mb-4">Casos Reportados por COVID</h2>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data}>
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey="fecha" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="hombres" stroke="#7d1cfb" name="Hombres" />
                    <Line type="monotone" dataKey="mujeres" stroke="#a672eb" name="Mujeres" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CovidStats;
