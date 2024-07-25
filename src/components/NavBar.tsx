import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {useAuth} from "../service/authContext.tsx";




function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
export function NavBar({ initialNavigation }) {
    //login
    const { user, logout } = useAuth();
    const admin = JSON.parse(localStorage.getItem('user') || '{}').rol;
    //const [isLoggedIn, setIsLoggedIn] = useState(false);

    //Sombreado rutas
    const location = useLocation();
    const [currentNavigation, setCurrentNavigation] = useState(initialNavigation);

    useEffect(() => {
        const updatedNavigation = currentNavigation.map((item) => ({
            ...item,
            current: item.to === location.pathname,
        }));
        setCurrentNavigation(updatedNavigation);
        //console.log(updatedNavigation);
    }, [location.pathname]);


    const handleLogout = () => {
        logout();
    };

    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 0;
            setScrolled(isScrolled);
        };

        // Agregar el evento de scroll
        window.addEventListener('scroll', handleScroll);

        // Limpiar el evento al desmontar el componente
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const isHomePage =
        location.pathname === '/' ||
        location.pathname === '/login' ||
        location.pathname === '/registrarse' ||
        location.pathname === '/admin';
    //console.log(isHomePage);

    return (
        //Color principal
        <div className={`fixed z-50 w-full border-gray-50 ${isHomePage ? 'fixed' : 'relative'} ${scrolled ? 'bg-indigo-600 bg-opacity-20' : ''}`}>
            <Disclosure as="nav" className="w-full pl-2">
                {({ open }) => (
                    <>
                        <div className={`fixed z-50 border-gray-50 ${isHomePage ? 'fixed' : 'relative'} ${scrolled ? 'bg-indigo-600 bg-opacity-20' : ''}`}>
                            <div className="relative flex h-16 items-center justify-between">
                                <div className=" inset-y-0 left-0 flex items-center sm:hidden">
                                    {/* Diseño para el celular */}
                                    <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="-inset-0.5" />
                                        <span className="sr-only">Abrir menu principal</span>
                                        <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                                        <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                                    </DisclosureButton>
                                </div>

                                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
                                    <div className="flex flex-shrink-0 items-center">
                                        {/*Moficacion de tamñao para la imageeen*/}
                                        <img
                                            className="h-20 w-auto md:pl-0 pt-3 pl-20 sm:pl-0 2xl:ml-64 "
                                            src="https://maria-belen.s3.amazonaws.com/img/image+12.png"
                                            alt="Maria Belen"
                                        />
                                    </div>
                                    {/*Modificaicon de tamaño las opciones*/}
                                    <div className="hidden md:ml-20 sm:block pt-6 2xl:ml-64">
                                        <div className="flex space-x-4">
                                            {
                                                currentNavigation.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        to={item.to}
                                                        className={classNames(
                                                            item.current ? 'bg-gray-900 text-white' : 'text-gray-800 hover:bg-gray-700 hover:text-white',
                                                            'rounded-md px-3 py-2 text-sm',
                                                        )}
                                                        aria-current={item.current ? 'page' : undefined}

                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                                {/*Aca se modifica la posicion del profile*/}
                                <div className=" inset-y-0 -right-20 flex items-center pr-2 2xl:ml-96 2xl:mr-80">
                                    {
                                        user ? (
                                                /* Profile dropdown */
                                                <Menu as="div" className="relative ml-3 ">
                                                    <div>
                                                        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm ">
                                                            <span className=" -inset-1.5" />
                                                            <span className="sr-only">Open user menu</span>
                                                            <img
                                                                className="h-8 w-8 rounded-full"
                                                                src="https://maria-belen.s3.amazonaws.com/img/usr.png"
                                                                alt=""
                                                            />
                                                        </MenuButton>
                                                    </div>
                                                    <MenuItems
                                                        transition
                                                        className="right-0 z-10 mt-28 w-48 origin-top-right rounded-md bg-white py-1
                                            shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none
                                            data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0
                                            data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out
                                            data-[leave]:ease-in"
                                                    >
                                                        {/*
                                                    <MenuItem>
                                                        {({ focus }) => (
                                                            <a
                                                                href="#"
                                                                className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                            >
                                                                Tu perfil
                                                            </a>
                                                        )}
                                                    </MenuItem>
                                                    */}
                                                        {
                                                            (admin &&
                                                            (
                                                                location.pathname === "/" ||
                                                                location.pathname === "/servicios" ||
                                                                location.pathname === "/paquetes" ||
                                                                location.pathname === "/nosotros"
                                                            )
                                                            )
                                                                ?
                                                                (
                                                                <MenuItem>
                                                                    {({ focus }) => (
                                                                        <a
                                                                            href="/admin"
                                                                            className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                                        >
                                                                            Cambiar a admin
                                                                        </a>
                                                                    )}
                                                                </MenuItem>
                                                            ): null
                                                        }

                                                        <MenuItem>
                                                            {({ focus }) => (
                                                                <a
                                                                    onClick={handleLogout}
                                                                    href="/"
                                                                    className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                                >
                                                                    Salir
                                                                </a>
                                                            )}
                                                        </MenuItem>
                                                    </MenuItems>
                                                </Menu>
                                            ):
                                            /*BOTON POR DEFECTO DEL LOGIN UWU*/
                                            <Link
                                                to={"/login"}
                                                className="bg-gray-700 text-white rounded-md px-3 py-2 text-sm font-medium"

                                            >
                                                Login
                                            </Link>
                                    }

                                </div>
                            </div>
                        </div>
                        {/*Panel para el movill*/}
                        <DisclosurePanel className="sm:hidden">
                            <div className="space-y-1 px-4 pb-3 pt-20 ">
                                {currentNavigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        as="a"
                                        to={item.to}
                                        className={classNames(
                                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-500 hover:text-white',
                                            'block rounded-md px-3 py-2 text-base font-medium',
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </DisclosurePanel>
                    </>
                )}
            </Disclosure>
        </div>
    )

}
