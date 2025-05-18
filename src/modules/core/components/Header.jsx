import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export const Header = () => {
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
            <div className='flex gap-4'>
                <Link to={'/auth/sign-up'}><button className='border border-secondary py-2 px-8 rounded-full text-secondary cursor-pointer hover:bg-secondary hover:text-primary'>Sign up</button></Link>
                <Link to={'/auth/login'}><button className='bg-secondary border border-secondary py-2 px-8 rounded-full text-primary cursor-pointer hover:bg-transparent hover:text-secondary '>Log in</button></Link>
            </div>
        </header>
    )
}
