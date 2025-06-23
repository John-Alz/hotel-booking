import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useAuthStore from '../../auth/store/useAuthStore';
import { useToggle } from '../hooks/useToggle';
import { authService } from '../../auth/services/authservice';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export const Header = () => {

    const profile = useAuthStore(state => state.profile);
    const logOut = useAuthStore(state => state.logOut);
    const { toggle, handleToggle } = useToggle(false);

    console.log(profile);

    const handleLogOut = async () => {
        try {
            authService.logOut();
        } catch (error) {
            console.log(error);
        }
        logOut();
    }

    return (
        <header className=' w-[95%] m-auto flex justify-between  py-5 '>
            <section className='flex items-center gap-15'>
                <div>
                    <Link to={'/'}><h1 className='font-bold text-3xl'>Tripster</h1></Link>
                </div>
                <nav className='flex'>
                    <ul className='flex gap-10'>
                        <NavLink className={({ isActive }) => (isActive ? "cursor-pointer border-b-2 border-black" : null)} to={'/'}><li className='cursor-pointer '>Home</li></NavLink>
                        <NavLink className={({ isActive }) => (isActive ? "cursor-pointer border-b-2 border-black" : null)} to={'/rooms/list'}><li className='cursor-pointer '>Habitaciones</li></NavLink>
                        <Link ><li className='cursor-pointer'>Eventos</li></Link>
                        <Link ><li className='cursor-pointer'>Popular</li></Link>
                    </ul>
                </nav>
            </section>

            {
                !profile ?
                    <div className="flex gap-4">
                        <Link to={'/auth/sign-up'}><button className='border border-secondary py-2 px-8 rounded-full text-secondary cursor-pointer hover:bg-secondary hover:text-primary'>Sign up</button></Link>
                        <Link to={'/auth/login'}><button className='bg-secondary border border-secondary py-2 px-8 rounded-full text-primary cursor-pointer hover:bg-transparent hover:text-secondary '>Log in</button></Link>
                    </div> :
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <div className='w-[150px] flex gap-3 items-center justify-end'>
                                <p>{profile.name}</p>
                                <button onClick={() => handleToggle()} className='border bg-black border-black py-2 px-4.5 rounded-full text-white cursor-pointer hover:bg-transparent hover:text-black'>{profile.name.slice(0, 1)}</button>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem><button className='cursor-pointer hover:text-secondary'>Mi perfil</button></DropdownMenuItem>
                            {
                                profile.role.roleEnum === "ADMINISTRADOR" || "RECEPCIONISTA" ?
                                    <Link to={'/admin'}>
                                        <DropdownMenuItem><button className='cursor-pointer hover:text-secondary'>Dashboard</button></DropdownMenuItem>
                                    </Link> :
                                    null
                            }

                            <DropdownMenuItem><button className='cursor-pointer hover:text-secondary' onClick={handleLogOut}>Cerrar sesion</button></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
            }

        </header>
    )
}
