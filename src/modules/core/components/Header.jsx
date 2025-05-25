import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useAuthStore from '../../auth/store/useAuthStore';
import { useToggle } from '../hooks/useToggle';
import { authService } from '../../auth/services/authservice';

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
                        <NavLink className={({ isActive }) => (isActive ? "cursor-pointer border-b-2" : null)} to={'/'}><li className='cursor-pointer '>Home</li></NavLink>
                        <NavLink className={({ isActive }) => (isActive ? "cursor-pointer border-b-2" : null)} to={'/rooms/list'}><li className='cursor-pointer '>Habitaciones</li></NavLink>
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
                    <div className="flex gap-4 items-center relative">
                        <div className='w-[150px] flex gap-3 items-center justify-end'>
                            <p>{profile.name}</p>
                            <button onClick={() => handleToggle()} className='border bg-black border-black py-2 px-4.5 rounded-full text-white cursor-pointer hover:bg-transparent hover:text-black'>{profile.name.slice(0, 1)}</button>
                        </div>
                        {
                            toggle ?
                                <div className='z-10 p-4 absolute bg-primary top-12 right-0 shadow-md inset-shadow-2xs rounded-xl'>
                                    <section className='flex flex-col gap-3'>
                                        <div >
                                            <button className='cursor-pointer hover:text-secondary'>Mi perfil</button>
                                        </div>
                                        {
                                            profile.roles[0].roleEnum === "ADMIN" ?
                                                <Link to={'/admin'}>
                                                    <button className='cursor-pointer hover:text-secondary'>DashBoard</button>
                                                </Link> :
                                                null
                                        }
                                        <div className='border-b-1'></div>
                                        <div>
                                            <button className='cursor-pointer hover:text-secondary' onClick={handleLogOut}>Cerrar sesion</button>
                                        </div>
                                    </section>
                                </div> :
                                null
                        }
                    </div>
            }

        </header>
    )
}
