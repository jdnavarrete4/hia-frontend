import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import LogoHospital from '../assets/LogoHospital.png';
import banner1 from '../assets/banner1.png';
import Swal from 'sweetalert2';

const Login = () => {
    const [correoElectronico, setCorreoElectronico] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (correoElectronico && contrasena) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [correoElectronico, contrasena]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/login/', {
                correo_electronico: correoElectronico,
                contrasena: contrasena,
            });

            if (response.status === 200) {
                const { token, rol, medico_id, paciente_id } = response.data;

                // Guardar el token y rol en el almacenamiento local
                localStorage.setItem('token', token);
                localStorage.setItem('rol', rol);

                // Guardar IDs específicos según el rol
                if (rol === 'medico') {
                    localStorage.setItem('medico_id', medico_id);
                } else if (rol === 'paciente') {
                    localStorage.setItem('paciente_id', paciente_id);
                }

                Swal.fire({
                    icon: 'success',
                    title: 'Inicio de sesión exitoso',
                    showConfirmButton: false,
                    timer: 1500,
                });

                // Redirigir al dashboard correspondiente según el rol
                navigate(`/${rol}dashboard`);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al iniciar sesión',
                    text: 'Credenciales inválidas',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al iniciar sesión',
                text: error.response?.data?.mensaje || 'Ocurrió un error inesperado',
            });
        }
    };

    return (
        <div className="login-page flex flex-col h-screen bg-white overflow-hidden">
            {/* Imagen de fondo: Visible solo en web */}
            <img
                className="background-image hidden md:block w-1/2 h-full absolute right-0 top-0 object-cover"
                src={banner1}
                alt="Background"
            />

            {/* Contenedor del formulario */}
            <div className="login-header flex items-center pl-6 pt-8">
                <img className="hospital-logo w-30 h-10" src={LogoHospital} alt="Hospital Logo" />
            </div>
            <div className="login-form-container flex flex-col items-start justify-center p-6 w-full md:w-1/3">
                <div className="login-title text-4xl font-semibold">Iniciar Sesión</div>
                <div className="login-subtitle text-base font-normal mt-2">
                    Inicia sesión y accede a tus servicios disponibles.
                </div>
                <form className="login-form grid grid-cols-1 gap-6 mt-6 w-full" onSubmit={handleSubmit}>
                    <div className="form-group flex flex-col">
                        <label className=" text-xs font-medium text-gray-600">*Correo electrónico</label>
                        <input
                            type="email"
                            className="form-input w-full bg-white border border-gray-300 rounded-lg p-3 mt-2 placeholder-text"
                            placeholder="Ingresa tu correo electrónico"
                            value={correoElectronico}
                            onChange={(e) => setCorreoElectronico(e.target.value)}
                        />
                    </div>
                    <div className="form-group flex flex-col">
                        <label className="text-xs font-medium text-gray-600">*Contraseña</label>
                        <input
                            type="password"
                            className="form-input w-full bg-white border border-gray-300 rounded-lg p-3 mt-2 placeholder-text"
                            placeholder="Ingresa tu contraseña"
                            autoComplete="new-password"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="login-button bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center relative cursor-pointer border-none"
                        disabled={!isFormValid}
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </form>
                <div className="login-social mt-24">
                    <div className="login-social-title text-gray-600 text-base font-semibold">Puedes iniciar con</div>
                    <button className="google-login flex items-center bg-white rounded-full mt-2 px-6 py-3 shadow-custom">
                        <FontAwesomeIcon className="mr-2" icon={faGoogle} />
                        <span className="google-text">Cuenta de Google</span>
                    </button>
                    <div className="signup-link mt-8 text-base font-semibold">
                        No tienes una cuenta disponible?
                        <Link to="/register" className="text-blue-600"> Crea una nueva cuenta</Link>
                    </div>
                </div>

            </div>
        </div>

    );
};

export default Login;
