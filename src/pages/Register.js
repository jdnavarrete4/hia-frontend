import React, { useState, useEffect } from 'react';

import LogoHospital from '../assets/LogoHospital.png';
import banner1 from '../assets/banner1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faHome, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Swal from 'sweetalert2';

const Register = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        correo_electronico: '',
        telefono: '',
        numero_cedula: '',
        fecha_nacimiento: '',
        provincia: '',
        canton: '',
        genero: '',
        contrasena: '',
        contrasena_confirmacion: '',
    });

    const [provincias, setProvincias] = useState([]);
    const [cantones, setCantones] = useState([]);

    useEffect(() => {
        const fetchProvincias = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/provincias-cantones/');
                setProvincias(response.data);
            } catch (error) {
                console.error('Error al cargar provincias:', error);
            }
        };

        fetchProvincias();
    }, []);

    const handleProvinciaChange = (e) => {
        const selectedProvinciaId = e.target.value;
        setFormData({ ...formData, provincia: selectedProvinciaId, canton: '' });

        // Encontrar la provincia seleccionada y establecer los cantones
        const selectedProvincia = provincias.find((provincia) => provincia.id.toString() === selectedProvinciaId);
        setCantones(selectedProvincia ? selectedProvincia.cantones : []);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };




    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.contrasena !== formData.contrasena_confirmacion) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Las contraseñas no coinciden.',
            });
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/register/', formData);

            if (response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Registro exitoso',
                    text: 'Tu usuario fue registrado exitosamente! Inicia sesión para continuar.',
                    confirmButtonText: 'Iniciar sesión',
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/login';
                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al registrar el paciente.',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al registrar!',
            });
            console.log(error.response.data);
        }
    };


    return (
        <div className="register-page flex flex-col h-screen bg-white overflow-auto">
            <img className="background-image w-1/2 h-full absolute right-0 top-0 object-cover" src={banner1} alt="Background" />
            <div className="register-header flex items-center pl-12 pt-8">
                <img className="hospital-logo w-30 h-10" src={LogoHospital} alt="Hospital Logo" />
            </div>
            <div className="register-form-container flex flex-col items-start justify-center p-12 w-2/5 ">
                <div className="registext-xs font-medium text-gray-600">Crear Nueva Cuenta</div>
                <div className="register-subtitle text-base font-normal mt-2">
                    Regístrate para acceder a todos nuestros servicios.
                </div>
                <form className="register-form-container flex flex-col items-start justify-center p-4 w-full" onSubmit={handleSubmit}>

                    <div className="register-form grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 w-full">
                        {/* Nombres y Apellidos */}
                        <div className="form-group flex flex-col">
                            <label className="text-xs font-medium text-gray-600">*Nombres</label>
                            <input
                                type="text"
                                name="nombre"
                                className="form-input w-full bg-white border border-gray-300 rounded-lg p-3 mt-2 placeholder-text"
                                placeholder="Ingresa tus nombres"
                                value={formData.nombre}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group flex flex-col">
                            <label className="text-xs font-medium text-gray-600">*Apellidos</label>
                            <input
                                type="text"
                                name="apellido"
                                className="form-input w-full bg-white border border-gray-300 rounded-lg p-3 mt-2 placeholder-text"
                                placeholder="Ingresa tus apellidos"
                                value={formData.apellido}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Correo Electrónico y Número de Contacto */}
                        <div className="form-group flex flex-col">
                            <label className="text-xs font-medium text-gray-600">*Correo electrónico</label>
                            <input
                                type="email"
                                name="correo_electronico"
                                className="form-input w-full bg-white border border-gray-300 rounded-lg p-3 mt-2 placeholder-text"
                                placeholder="Ingresa tu correo electrónico"
                                value={formData.correo_electronico}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group flex flex-col">
                            <label className="text-xs font-medium text-gray-600">*Número de contacto</label>
                            <input
                                type="number"
                                name="telefono"
                                className="form-input w-full bg-white border border-gray-300 rounded-lg p-3 mt-2 placeholder-text"
                                placeholder="Ingresa tu número de contacto"
                                value={formData.telefono}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Número de Cédula y Fecha de Nacimiento */}
                        <div className="form-group flex flex-col">
                            <label className="text-xs font-medium text-gray-600">*Número de cédula</label>
                            <input
                                type="number"
                                name="numero_cedula"
                                className="form-input w-full bg-white border border-gray-300 rounded-lg p-3 mt-2 placeholder-text"
                                placeholder="Ingresa tu número de cédula"
                                value={formData.numero_cedula}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group flex flex-col">
                            <label className="text-xs font-medium text-gray-600">*Fecha de nacimiento</label>
                            <input
                                type="date"
                                name="fecha_nacimiento"
                                className="form-input w-full bg-white border border-gray-300 rounded-lg p-3 mt-2 placeholder-text"
                                placeholder="dd/mm/yy"
                                value={formData.fecha_nacimiento}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Provincia y Cantón */}
                        <div className="form-group flex flex-col">
                            <label className="text-xs font-medium text-gray-600">*Provincia</label>
                            <select
                                name="provincia"
                                value={formData.provincia}
                                onChange={handleProvinciaChange}
                                className="form-select w-full bg-white border border-gray-300 rounded-lg p-2 mt-2"
                            >
                                <option value="">Selecciona tu provincia</option>
                                {provincias.map((provincia) => (
                                    <option key={provincia.id} value={provincia.id}>
                                        {provincia.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group flex flex-col">
                            <label className="text-xs font-medium text-gray-600">*Cantón</label>
                            <select
                                name="canton"
                                value={formData.canton}
                                onChange={handleChange}
                                className="form-select w-full bg-white border border-gray-300 rounded-lg p-2 mt-2"
                                disabled={!formData.provincia}
                            >
                                <option value="">Selecciona tu cantón</option>
                                {cantones.map((canton) => (
                                    <option key={canton.id} value={canton.id}>
                                        {canton.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>



                    <div className="form-group flex flex-col mt-8">
                        <label className="text-xs font-medium text-gray-600">*Género</label>
                        <div className="flex items-center mt-2">
                            <label className="flex items-center mr-4">
                                <input
                                    type="radio"
                                    name="genero"
                                    value="Masculino"
                                    checked={formData.genero === 'Masculino'}
                                    onChange={handleChange}
                                    className="form-radio"
                                />
                                <span className="ml-2">Masculino</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="genero"
                                    value="Femenino"
                                    checked={formData.genero === 'Femenino'}
                                    onChange={handleChange}
                                    className="form-radio"
                                />
                                <span className="ml-2">Femenino</span>
                            </label>
                        </div>
                    </div>
                    <div className="w-full py-6">
                        <hr className="border-dashed border-gray-300 my-4" />
                    </div>

                    {/* <div className="form-group flex flex-col">
                        <label className="text-xs font-medium text-gray-600">*Dirección</label>
                        <input
                            type="text"
                            name="direccion"
                            className="form-input w-full bg-white border border-gray-300 rounded-lg p-3 mt-2 placeholder-text"
                            placeholder="Ingresa tu dirección"
                            value={formData.direccion}
                            onChange={handleChange}
                        />
                    </div> */}
                    <div className="form-group flex flex-col md:w-1/2">
                        <label className="text-xs font-medium text-gray-600">*Contraseña</label>
                        <input
                            type="password"
                            name="contrasena"
                            className="form-input w-full bg-white border border-gray-300 rounded-lg p-3 mt-2 placeholder-text"
                            placeholder="Ingresa tu contraseña"
                            value={formData.contrasena}
                            onChange={handleChange}
                            autoComplete="new-password"
                        />
                        <label className="text-xs font-medium text-gray-600 mt-7">*Confirma contraseña</label>
                        <input
                            type="password"
                            name="contrasena_confirmacion"
                            className="form-input w-full bg-white border border-gray-300 rounded-lg p-3 mt-2 placeholder-text"
                            placeholder="Ingresa tu contraseña"
                            value={formData.contrasena_confirmacion}
                            onChange={handleChange}
                        />
                    </div>


                    <div className="form-group flex flex-col">

                    </div>

                    <button type="submit" className="login-button bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center relative cursor-pointer border-none mt-8">
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </form>
                <div className="login-social mt-4">
                    <div className="login-social-title text-gray-600 text-base font-semibold">Puedes iniciar con</div>
                    <button className="google-login flex items-center bg-white rounded-full mt-2 px-6 py-3 shadow-custom">
                        <FontAwesomeIcon className="mr-2" icon={faGoogle} />
                        <span className="google-text">Cuenta de Google</span>
                    </button>
                </div>
                <div className="login-link mt-24 text-base font-semibold">
                    Ya tienes una cuenta?
                    <a href="/login" className="text-blue-600"> Inicia sesión aquí</a>
                </div>
            </div>

        </div>
    );
};

export default Register;