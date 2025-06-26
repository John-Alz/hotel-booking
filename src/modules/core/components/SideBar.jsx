import { BedDouble, Bookmark, BookmarkX, Receipt } from 'lucide-react';
import { Users } from 'lucide-react';
import { BookDown } from 'lucide-react';
import { Bolt } from 'lucide-react';
import { NotebookTabs } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { NotepadText } from 'lucide-react';
import { Home } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { hasRole } from '../utils/auth';
import useAuthStore from '../../auth/store/useAuthStore';
import { useToggle } from '../hooks/useToggle';

export const SideBar = () => {

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
        <nav className='bg-white h-screen w-64 flex flex-col gap-8 pb-8 border'>
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
                    {/* <li className={`flex gap-2 py-4 px-4 rounded-2xl w-full mr-5 group-hover:bg-btn-admin  hover:text-white `}>
                        <LogOut /> Cerrar sesion
                    </li> */}
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <li className={`flex gap-2 py-4 px-4 rounded-2xl w-full mr-5 bg-btn-admin group-hover:bg-btn-admin  text-white `}>
                                <LogOut /> Cerrar sesion
                            </li>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            {
                                hasRole(["ADMINISTRADOR", "RECEPCIONISTA"]) ?
                                    <Link to={'/admin'}>
                                        <DropdownMenuItem><button className='cursor-pointer hover:text-secondary'>Dashboard</button></DropdownMenuItem>
                                    </Link> :
                                    <DropdownMenuItem><button className='cursor-pointer hover:text-secondary'>Mi perfil</button></DropdownMenuItem>
                            }

                            <DropdownMenuItem><button className='cursor-pointer hover:text-secondary' onClick={handleLogOut}>Cerrar sesion</button></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

        </nav >
    )
}
