import React, { useEffect } from 'react'
import useRoomStore from '../store/useRoomStore';
import { Bed, Edit3, Trash2, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export const RoomTableTwo = () => {

    const fetchRooms = useRoomStore(state => state.fetchRooms);
    const rooms = useRoomStore(state => state.rooms);

    useEffect(() => {
        fetchRooms();
    }, [])


    return (
        <div className='w-11/12 m-auto pt-10' >
            <Link to={'/admin/crear-tipo-habitacion'}><button>Crear una habitacion</button></Link>
            <table className='min-w-full  text-base font-light text-surface bg-gray rounded-xl bg-primary'>
                <thead className=" border-b border-[#ced4da] ">
                    <tr>
                        <th className="px-6 py-3 text-start text-sm font-bold opacity-50">ID</th>
                        <th className="px-6 py-3 text-start text-sm font-bold opacity-50">Image</th>
                        <th className="px-6 py-3 text-start text-sm font-bold opacity-50">Nombre</th>
                        <th className="px-6 py-3 text-start text-sm font-bold opacity-50">Precio noche</th>
                        <th className="px-6 py-3 text-start text-sm font-bold opacity-50">Meter</th>
                        <th className="px-6 py-3 text-start text-sm font-bold opacity-50">Capacity</th>
                        <th className="px-6 py-3 text-start text-sm font-bold opacity-50">Acciones</th>
                    </tr>
                </thead>
                <tbody className='font-medium'>
                    {
                        rooms?.content?.map(item => (
                            <tr className='hover:bg-grayDark border-b border-[#ced4da]'>
                                <td className='px-6 py-4 text-sm'>{item.id}</td>
                                <td className='px-6 py-4 text-sm'>
                                    <div>
                                        <img src={item.images[0]} alt={item.name} className='w-[112px] h-[75px] rounded-2xl' />
                                    </div>
                                </td>
                                <td className='px-6 py-4 text-sm'>{item.name}</td>
                                <td className='px-6 py-4 text-sm'>${item.price}</td>
                                <td className='px-6 py-4 text-sm'>{item.meters} Mts</td>
                                <td className='px-6 py-4 text-sm'>
                                    <div className='flex flex-col gap-4 text-sm'>
                                        <div>
                                            <p className='flex gap-2 text-[#6C6C6C]'>Capacidad:<span className='flex gap-2 text-black'> <Users size={20} /> {item.capacity}</span></p>
                                        </div>
                                        <div>
                                            <p className='flex gap-2 text-[#6C6C6C]'>No camas:<span className='flex gap-2 text-black'> <Bed /> {item.beds}</span></p>

                                        </div>
                                    </div>
                                </td>
                                <td className='px-6 py-4 text-sm'>
                                    <div className='flex items-center gap-4  text-sm'>
                                        <button className="text-blue-500"><Edit3 /></button>
                                        <button className="text-red-500"><Trash2 /></button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
