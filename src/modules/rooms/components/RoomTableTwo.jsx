import React, { useEffect } from 'react'
import useRoomStore from '../store/useRoomStore';
import { Bed, Edit3, Filter, Plus, Search, Trash2, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form';
import { FiltersTable } from './FiltersTable';
import { api } from '../../../shared/api/apiClient';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"




export const RoomTableTwo = () => {

    const fetchRooms = useRoomStore(state => state.fetchRooms);
    const rooms = useRoomStore(state => state.rooms);

    const { register, handleSubmit } = useForm();

    useEffect(() => {
        fetchRooms();
    }, [])

    const onChange = (e) => {
        console.log(e.target.value);
    }

    const handleDelete = async (id) => {
        console.log("CLICCCK");

        try {
            let response = await api.delete(`/api/v1/rooms/types/${id}`)
            console.log(response);
            if (response.status === 200) {
                fetchRooms();
            }
        } catch (error) {
            console.log(error);

        }
    }


    return (
        <div className='pt-5 flex flex-col gap-7' >

            <div className='flex justify-between'>
                <div className='w-[400px] relative'>
                    {/* <input type='text' placeholder='Busca aqui' className='bg-[#F2F2F2] py-2 px-2 rounded-lg w-100' /> */}
                    <Input className="bg-[#F2F2F2] rounded-3xl" onChange={onChange} placeholder='Busca aqui' />
                    <Search color='#737373' className='absolute right-0 top-1.5 mx-2' />
                </div>
                <div className='flex gap-8'>
                    <FiltersTable />
                    <Link to={'/admin/crear-tipo-habitacion'}><Button ><Plus /> Crear una habitacion</Button></Link>
                </div>
            </div>
            <table className='min-w-full  text-base font-light text-surface bg-gray rounded-xl bg-primary'>
                <thead className=" border-b border-[#ced4da] bg-[#ced4da]/35 rounded-xl">
                    <tr>
                        <th className="px-6 py-3 text-start text-sm font-bold ">ID</th>
                        <th className="px-6 py-3 text-start text-sm font-bold ">Image</th>
                        <th className="px-6 py-3 text-start text-sm font-bold ">Nombre</th>
                        <th className="px-6 py-3 text-start text-sm font-bold ">Precio noche</th>
                        <th className="px-6 py-3 text-start text-sm font-bold ">Meter</th>
                        <th className="px-6 py-3 text-start text-sm font-bold ">Capacity</th>
                        <th className="px-6 py-3 text-start text-sm font-bold ">Stado</th>
                        <th className="px-6 py-3 text-start text-sm font-bold ">Acciones</th>
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
                                <td>
                                    <p className='bg-[#10A760] py-1.5 px-3 rounded-xl text-center text-primary'>Disponible</p>
                                </td>
                                <td className='px-6 py-4 text-sm'>
                                    <div className='flex items-center gap-4  text-sm'>
                                        <Link to={`/admin/tipo-habitacion/${item.id}`}><button className="text-blue-500 cursor-pointer"><Edit3 /></button></Link>

                                        <AlertDialog>
                                            <AlertDialogTrigger><button className="text-red-500 cursor-pointer"><Trash2 /></button></AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Estas seguro que quieres eliminar la habitacion?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. This will permanently delete your account
                                                        and remove your data from our servers.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleDelete(item.id)}>Confirmar</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>

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
