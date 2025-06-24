import { BedDouble, Bookmark, BookmarkX, Receipt } from 'lucide-react';
import { Users } from 'lucide-react';
import { BookDown } from 'lucide-react';
import { Bolt } from 'lucide-react';
import { NotebookTabs } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { NotepadText } from 'lucide-react';
import { Home } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom';

export const SideBar = () => {

    const navLinks = [
        {
            id: 1,
            icon: <Home />,
            text: 'Dashboard',
            link: '/admin/dashboard'
        },
        {
            id: 2,
            icon: <NotebookTabs />,
            text: 'T. habitaciones',
            link: '/admin/tipos-habitacion'
        },
        {
            id: 3,
            icon: <BookDown />,
            text: 'Reservas',
            link: '/admin/reservas'
        },
        {
            id: 5,
            icon: <BedDouble />,
            text: 'Habitaciones',
            link: '/admin/habitaciones'
        },
        // {
        //     id: 6,
        //     icon: <NotepadText />,
        //     text: 'Amenidades',
        //     link: '/admin/amenidades'
        // },
        {
            id: 4,
            icon: <Users />,
            text: 'Usuarios',
            link: '/admin/usuarios'
        },
        {
            id: 10,
            icon: <BookmarkX />,
            text: 'Cancelaciones',
            link: '/admin/cancelaciones'
        },
        {
            id: 10,
            icon: <Receipt />,
            text: 'Pagos',
            link: '/admin/pagos'
        }
    ];

    return (
        <nav className='bg-white h-screen w-58 flex flex-col gap-8 pb-8 border'>
            <div className='mt-3 flex '>
                <div className='ml-3'>
                    <Link to={'/'}><h1 className='font-bold text-4xl'>Roomify</h1></Link>
                </div>
            </div>
            <div className='h-screen flex flex-col justify-between'>
                <ul className='flex flex-col gap-5'>
                    {navLinks.map((item) => (
                        <NavLink key={item.link} to={`${item.link}`}>
                            {({ isActive }) => (
                                <div className={`flex gap-2 items-center group h-[56px]`}>
                                    <div className={`w-1 h-full rounded-tr-2xl rounded-br-2xl group-hover:bg-btn-admin ${isActive ? 'bg-btn-admin' : 'bg-transparent'}`}></div>
                                    <li className={`flex gap-2 py-4 px-4 rounded-2xl w-full mr-5 group-hover:bg-btn-admin  hover:text-white ${isActive ? 'bg-btn-admin text-white' : 'bg-transparent'}`}>
                                        {item.icon}
                                        {item.text}
                                    </li>
                                </div>
                            )}
                        </NavLink>
                    ))}

                </ul>
                <div className={`flex gap-2 items-center group h-[56px] cursor-pointer`}>
                    <div className={`w-1 h-full rounded-tr-2xl rounded-br-2xl group-hover:bg-btn-admin `}></div>
                    <li className={`flex gap-2 py-4 px-4 rounded-2xl w-full mr-5 group-hover:bg-btn-admin  hover:text-white `}>
                        <LogOut /> Cerrar sesion
                    </li>
                </div>
            </div>

        </nav >
    )
}
