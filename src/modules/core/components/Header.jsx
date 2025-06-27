import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useAuthStore from '../../auth/store/useAuthStore';
import { useToggle } from '../hooks/useToggle';
import { authService } from '../../auth/services/authservice';
import { Menu, X } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { hasRole } from '../utils/auth';

export const Header = () => {
    const profile = useAuthStore(state => state.profile);
    const logOut = useAuthStore(state => state.logOut);
    const { toggle, handleToggle } = useToggle(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogOut = async () => {
        try {
            authService.logOut();
        } catch (error) {
            console.log(error);
        }
        logOut();
    };

    const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

    return (
        <header className="w-[95%] mx-auto py-5 flex items-center justify-between relative">
            {/* Logo */}
            <section className="flex items-center gap-8">
                <Link to={'/'}><h1 className='font-bold text-3xl'>SanDiego</h1></Link>

                {/* Menu en escritorio */}
                <nav className="hidden lg:flex">
                    <ul className="flex gap-10">
                        <NavLink to={'/'} className={({ isActive }) => isActive ? 'border-b-2 border-black' : ''}><li>Home</li></NavLink>
                        <NavLink to={'/rooms/list'} className={({ isActive }) => isActive ? 'border-b-2 border-black' : ''}><li>Habitaciones</li></NavLink>
                        <Link><li>Eventos</li></Link>
                        <Link><li>Popular</li></Link>
                    </ul>
                </nav>
            </section>

            {/* Botón hamburguesa móvil */}
            <button onClick={toggleMobileMenu} className="lg:hidden">
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Área de perfil o botones (escritorio) */}
            <div className="hidden lg:flex gap-4">
                {
                    !profile ? (
                        <>
                            <Link to={'/auth/sign-up'}>
                                <button className='border border-secondary py-2 px-8 rounded-full text-secondary hover:bg-secondary hover:text-primary cursor-pointer'>Sign up</button>
                            </Link>
                            <Link to={'/auth/login'}>
                                <button className='bg-secondary py-2 px-8 rounded-full text-primary hover:bg-transparent hover:text-secondary border border-secondary cursor-pointer'>Log in</button>
                            </Link>
                        </>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <div className='w-[150px] flex gap-3 items-center justify-end'>
                                    <div className='text-right'>
                                        <p>{profile.name} {profile.lastName}</p>
                                        <p className='text-black-opacity'>{profile.email}</p>
                                    </div>
                                    <button onClick={handleToggle} className='border bg-black border-black py-2.5 px-4 rounded-full text-white'>{profile.name.slice(0, 1)}</button>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {
                                    hasRole(["ADMINISTRADOR", "RECEPCIONISTA"]) ?
                                        <Link to={'/admin'}>
                                            <DropdownMenuItem>Dashboard</DropdownMenuItem>
                                        </Link> :
                                        <DropdownMenuItem>Mi perfil</DropdownMenuItem>
                                }
                                <DropdownMenuItem onClick={handleLogOut}>Cerrar sesión</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )
                }
            </div>

            {/* Menú móvil desplegable */}
            {
                isMobileMenuOpen && (
                    <div className="absolute top-[100%] left-0 w-full bg-white shadow-md lg:hidden px-6 py-4 space-y-4 z-50">
                        <nav>
                            <ul className="flex flex-col gap-4 text-gray-700">
                                <NavLink to={'/'} onClick={toggleMobileMenu}><li>Home</li></NavLink>
                                <NavLink to={'/rooms/list'} onClick={toggleMobileMenu}><li>Habitaciones</li></NavLink>
                                <Link onClick={toggleMobileMenu}><li>Eventos</li></Link>
                                <Link onClick={toggleMobileMenu}><li>Popular</li></Link>
                            </ul>
                        </nav>
                        <div className="border-t pt-4">
                            {
                                !profile ? (
                                    <div className="flex flex-col gap-3">
                                        <Link to={'/auth/sign-up'}>
                                            <button className='border border-secondary py-2 rounded-full text-secondary w-full'>Sign up</button>
                                        </Link>
                                        <Link to={'/auth/login'}>
                                            <button className='bg-secondary py-2 rounded-full text-primary w-full'>Log in</button>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-3 text-sm">
                                        <p className='font-semibold'>{profile.name} {profile.lastName}</p>
                                        <p className='text-black-opacity'>{profile.email}</p>
                                        {
                                            hasRole(["ADMINISTRADOR", "RECEPCIONISTA"]) ?
                                                <Link to={'/admin'} onClick={toggleMobileMenu}><p className='mb-2'>Dashboard</p></Link> :
                                                <p>Mi perfil</p>
                                        }
                                        <button onClick={() => { handleLogOut(); toggleMobileMenu(); }} className='text-red-500'>Cerrar sesión</button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )
            }
        </header>
    );
};
