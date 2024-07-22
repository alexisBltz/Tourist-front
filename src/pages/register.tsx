import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "../styles/Login.css"

export default function Register() {
    const formik = useFormik({
        initialValues: {
            nombres: '',
            apellidoPaterno: '',
            apellidoMaterno: '',
            direccion: '',
            fechaNacimiento: '',
            dni: '',
            nacionalidad: '',
            celular: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            nombres: Yup.string()
                .required('Required'),
            apellidoPaterno: Yup.string()
                .required('Required'),
            apellidoMaterno: Yup.string()
                .required('Required'),
            direccion: Yup.string()
                .required('Required'),
            fechaNacimiento: Yup.date()
                .required('Required'),
            dni: Yup.string()
                .required('Required'),
            nacionalidad: Yup.string()
                .required('Required'),
            celular: Yup.string()
                .required('Required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            password: Yup.string()
                .required('Required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Required')
        }),
        onSubmit: values => {
            console.log(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div className="login-page z-10">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black">
                        Registra tu cuenta
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={formik.handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="nombres" className="block text-sm font-medium leading-6 text-gray-900">
                                Nombres
                            </label>
                            <div className="mt-2">
                                <input
                                    id="nombres"
                                    name="nombres"
                                    type="text"
                                    required
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.nombres}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                                    ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                    focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {formik.touched.nombres && formik.errors.nombres ? (
                                    <div className="text-red-500 text-sm">{formik.errors.nombres}</div>
                                ) : null}
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <label htmlFor="apellidoPaterno"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    Apellido Paterno
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="apellidoPaterno"
                                        name="apellidoPaterno"
                                        type="text"
                                        required
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.apellidoPaterno}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                                        ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                        focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {formik.touched.apellidoPaterno && formik.errors.apellidoPaterno ? (
                                        <div className="text-red-500 text-sm">{formik.errors.apellidoPaterno}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="apellidoMaterno"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    Apellido Materno
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="apellidoMaterno"
                                        name="apellidoMaterno"
                                        type="text"
                                        required
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.apellidoMaterno}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                                        ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                        focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {formik.touched.apellidoMaterno && formik.errors.apellidoMaterno ? (
                                        <div className="text-red-500 text-sm">{formik.errors.apellidoMaterno}</div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="direccion" className="block text-sm font-medium leading-6 text-gray-900">
                                Dirección
                            </label>
                            <div className="mt-2">
                                <input
                                    id="direccion"
                                    name="direccion"
                                    type="text"
                                    required
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.direccion}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                                    ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                    focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {formik.touched.direccion && formik.errors.direccion ? (
                                    <div className="text-red-500 text-sm">{formik.errors.direccion}</div>
                                ) : null}
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <label htmlFor="fechaNacimiento"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    Fecha de Nacimiento
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="fechaNacimiento"
                                        name="fechaNacimiento"
                                        type="date"
                                        required
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.fechaNacimiento}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                                        ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                        focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {formik.touched.fechaNacimiento && formik.errors.fechaNacimiento ? (
                                        <div className="text-red-500 text-sm">{formik.errors.fechaNacimiento}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="dni"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    DNI
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="dni"
                                        name="dni"
                                        type="text"
                                        required
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.dni}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                                        ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                        focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {formik.touched.dni && formik.errors.dni ? (
                                        <div className="text-red-500 text-sm">{formik.errors.dni}</div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <label htmlFor="nacionalidad"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    Nacionalidad
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="nacionalidad"
                                        name="nacionalidad"
                                        type="text"
                                        required
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.nacionalidad}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                                        ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                        focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {formik.touched.nacionalidad && formik.errors.nacionalidad ? (
                                        <div className="text-red-500 text-sm">{formik.errors.nacionalidad}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="celular"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    Celular
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="celular"
                                        name="celular"
                                        type="text"
                                        required
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.celular}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                                        ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                        focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {formik.touched.celular && formik.errors.celular ? (
                                        <div className="text-red-500 text-sm">{formik.errors.celular}</div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Correo Electrónico
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                                    ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                    focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className="text-red-500 text-sm">{formik.errors.email}</div>
                                ) : null}
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Contraseña
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                                        ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                        focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {formik.touched.password && formik.errors.password ? (
                                        <div className="text-red-500 text-sm">{formik.errors.password}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                                    Repetir contraseña
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        required
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.confirmPassword}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                                        ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                        focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                        <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm
                                font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline
                                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Registrarse
                            </button>
                        </div>
                    </form>
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Te encanta viajar{' '}
                        <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            ¡Bienvenido a Maria Belen!
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
