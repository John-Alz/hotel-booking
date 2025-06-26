import React, { useEffect } from 'react'
import useRoomStore from '../store/useRoomStore';
import { Bed, Edit3, Filter, Plus, Search, Trash2, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form';
import { FiltersTable } from './FiltersTable';
import { api } from '../../../shared/api/apiClient';

import { RoomList } from './RoomList';

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
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { RoomCardAdmin } from './RoomCardAdmin';
import { ToastContainer } from 'react-toastify';
import { notifyService } from '../../core/services/notifyService';
import { FilterOrderTableRoomType } from './FilterOrderTableRoomType';
import { Pagination } from '../../core/components/Pagination';
import usePagination from '../../core/store/userPagination';
import { hasRole } from '../../core/utils/auth';




export const RoomTableTwo = () => {

    const fetchRooms = useRoomStore(state => state.fetchRooms);
    const rooms = useRoomStore(state => state.rooms);
    const { page } = usePagination();

    const { register, handleSubmit } = useForm();

    const filters = useRoomStore(state => state.filters)

    useEffect(() => {
        fetchRooms(page, 2, filters);
    }, [page, filters])

    const handleDelete = async (id) => {
        console.log("CLICCCK");

        try {
            let response = await api.delete(`/api/v1/rooms/types/${id}`)
            console.log(response);
            if (response.status === 200) {
                fetchRooms();
                notifyService.success("Se elimino la habitacion.")
            }
            if (response.status === 400) {
                notifyService.error(response.data.message)
            }
        } catch (error) {
            console.log(error);

        }
    }

    console.log(rooms);
    console.log(filters);

    const onChange = (e) => {
        console.log(e.target.value);
        const value = e.target.value;
        fetchRooms(page, 2, filters, value);
    }

    return (
        <div className='flex flex-col gap-7' >
            <ToastContainer />
            <div className='flex justify-between'>
                <div className='w-[40%]  relative'>
                    {/* <input type='text' placeholder='Busca aqui' className='bg-[#F2F2F2] py-2 px-2 rounded-lg w-100' /> */}
                    <Input className="bg-primary rounded-lg h-[40px]" onChange={onChange} placeholder='Busca aqui' />
                    <Search color='#737373' className='absolute right-0 top-1.5 mx-2' />
                </div>
                <div className='flex gap-8'>
                    <FiltersTable />
                    <FilterOrderTableRoomType />

                    <Tooltip>
                        <TooltipTrigger>
                            <Link to={hasRole(['ADMINISTRADOR']) ? '/admin/tipos-habitacion/crear-tipo-habitacion' : null}><Button disabled={!hasRole(['ADMINISTRADOR'])} ><Plus /> Crear una habitacion</Button></Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className='text-primary'>Solo para administradores</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>
            <div className='flex flex-col gap-6 mb-8'>
                {
                    rooms?.content?.map((item) => (
                        <div id='card' className='bg-primary shadow-md inset-shadow-2xs flex rounded-4xl '>
                            <div className='w-full p-4 flex justify-between '>
                                <div className='flex gap-4'>
                                    <img src={item.images[0]} width={250} className='rounded-4xl' alt='ImgAlt' />
                                    <div>
                                        <div className='flex flex-col gap-1'>
                                            <h2 className='font-bold text-xl'>{item.name}</h2>
                                            <div className='text-black-opacity flex flex-col'>
                                                <span >{item.meters} mts cuadrados</span>
                                                <span>{item.description.slice(0, 55)}...</span>
                                            </div>
                                        </div>
                                        <div className='flex flex-col mt-4'>
                                            <h2 className='font-bold'>Confort de la habitacion</h2>
                                            <div className='flex flex-col'>
                                                <span>{item.capacity}X Capacidad</span>
                                                <span>{item.beds}X Camas</span>
                                                <span>{item.bathRooms} Banios</span>
                                            </div>
                                            <div className='flex gap-3 mt-3'>
                                                {
                                                    item?.tags?.map(tag => (
                                                        <p className='border border-secondary py-1 px-3 rounded-full text-secondary'>#{tag}</p>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-col justify-between'>
                                    <div className='flex justify-end gap-3 text-[#009D52] items-center '>
                                        <p className=''>Excelente</p>
                                        <span className='bg-green-custom py-1 px-4 rounded-4xl'>9.6</span>
                                    </div>
                                    <div className='text-right flex flex-col gap-3'>
                                        <div>
                                            <p className='font-bold'>${item.price}</p>
                                        </div>
                                        <div className='flex justify-end gap-8 text-sm bg-trasnparent   cursor-pointer  '>


                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Link to={hasRole(['ADMINISTRADOR']) ? `/admin/tipos-habitacion/tipo-habitacion/${item.id}` : null}><button
                                                        disabled={!hasRole(['ADMINISTRADOR'])} className="text-blue-500 cursor-pointer"><Edit3 /></button></Link>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p className='text-primary'>Solo para administradores</p>
                                                </TooltipContent>
                                            </Tooltip>

                                            <AlertDialog>
                                                <AlertDialogTrigger>
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <button disabled={!hasRole(['ADMINISTRADOR'])} className="text-red-500 cursor-pointer"><Trash2 /></button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p className='text-primary'>Solo para administradores</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Estas seguro que quieres eliminar la habitacion?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Esta acción no se puede deshacer.
                                                            Toda la información relacionada con esta habitación se perderá permanentemente.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDelete(item.id)}>Confirmar</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
                <Pagination data={rooms} />
            </div>
            {/* <table className='min-w-full  text-base font-light text-surface bg-gray rounded-xl bg-primary'>
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
            </table> */}
        </div>
    )
}
