import React, { useEffect, useState } from 'react'
import useRoomSingleStore from '../store/userRoomSingleStore'
import { Bed, BedDouble, ChevronLeft, ChevronRight, Edit3, Ghost, Plus, Search, Trash2, Users } from 'lucide-react';
import { FiltersTable } from '../../rooms/components/FiltersTable';
import { Button } from '../../../components/ui/button';
import { Input } from "@/components/ui/input"
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
import { Link } from 'react-router-dom';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { RoomSingleForm } from './RoomSingleForm';
import { RoomsSingleCreate } from '../pages/RoomsSingleCreate';
import { ToastContainer } from 'react-toastify';
import { notifyService } from '../../core/services/notifyService';
import { api } from '../../../shared/api/apiClient';
import { RoomsSingleEditPage } from '../pages/RoomsSingleEditPage';
import { Pagination } from '../../core/components/Pagination';
import usePagination from '../../core/store/userPagination';

export const RoomsSingleTable = () => {
    const [roomTypeId, setRoomTypeId] = useState("");


    const roomsSingle = useRoomSingleStore(state => state.roomsSingle);
    const fetchRoomsSingle = useRoomSingleStore(state => state.fetchRoomsSingle);
    const { page } = usePagination();

    useEffect(() => {
        fetchRoomsSingle(page, 5, roomTypeId);
    }, [page, roomTypeId])

    console.log(roomsSingle);

    const onChange = (e) => {
        console.log(e.target.value);
    }

    const prevPage = () => {
        setPage(page - 1)
    }

    const nextPage = () => {
        setPage(page + 1)
    }

    const deleteRoomSingle = async (id) => {
        console.log("ID A ELIMINAR: " + id);

        try {
            const response = await api.delete(`/api/v1/rooms/${id}`)
            console.log(response);
            if (response.status === 200) {
                notifyService.success(response.data.message)
                setPage(0)
                fetchRoomsSingle(page)
            }
        } catch (error) {
            notifyService.error(error)
        }
    }


    const handleRoomTypeFilter = (id) => {
        setRoomTypeId(id)
        fetchRoomsSingle(page, roomTypeId)
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
                    {/* <Link to={'/admin/crear-habitacion'}><Button ><Plus /> Crear una habitacion</Button></Link> */}
                    <Dialog>
                        <DialogTrigger><Button ><Plus /> Crear una habitacion</Button></DialogTrigger>
                        <DialogContent className="left-[50%]">
                            <DialogHeader>
                                <DialogTitle>Crea una habitacion.</DialogTitle>
                            </DialogHeader>
                            <RoomsSingleCreate />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div>
                {/* <h2>Tipos de habitacion</h2> */}
                <div className='w-[60%] flex justify-around bg-primary shadow-sm py-3 gap-2 rounded-2xl text-[14px]'>
                    <Button variant={roomTypeId === "" ? 'default' : 'filters'} onClick={() => handleRoomTypeFilter("")}>
                        Ver todas
                    </Button>
                    <Button variant={roomTypeId === 1 ? 'default' : 'filters'} onClick={() => handleRoomTypeFilter(1)}>
                        Hab. estandar sencilla
                    </Button>
                    <Button variant={roomTypeId === 2 ? 'default' : 'filters'} onClick={() => handleRoomTypeFilter(2)}>
                        Hab. estandar doble
                    </Button>
                    <Button variant={roomTypeId === 3 ? 'default' : 'filters'} onClick={() => handleRoomTypeFilter(3)}>
                        Hab. familiar
                    </Button>
                    <Button variant={roomTypeId === 4 ? 'default' : 'filters'} onClick={() => handleRoomTypeFilter(4)}>
                        Hab. suite
                    </Button>
                </div>
            </div>
            <table className='min-w-full  text-base font-light text-surface bg-gray rounded-xl bg-primary mb-4'>
                <thead className=" border-b border-[#ced4da] bg-[#ced4da]/35 rounded-xl">
                    <tr>
                        {/* <th className="px-6 py-3 text-start text-sm font-bold ">ID</th> */}
                        <th className="px-6 py-3 text-start text-sm font-bold ">N° Habitación</th>
                        <th className="px-6 py-3 text-start text-sm font-bold ">Imagen</th>
                        <th className="px-6 py-3 text-start text-sm font-bold ">Tipo</th>
                        <th className="px-6 py-3 text-start text-sm font-bold ">Capacidad</th>
                        <th className="px-6 py-3 text-start text-sm font-bold ">Último Mantenimiento</th>
                        <th className="px-6 py-3 text-start text-sm font-bold ">Precio/Noche</th>
                        <th className="px-6 py-3 text-start text-sm font-bold ">Estado</th>
                        <th className="px-6 py-3 text-start text-sm font-bold ">Acciones</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <td colSpan="8">
                            <Pagination data={roomsSingle} />
                        </td>
                    </tr>
                </tfoot>

                <tbody className='font-medium'>
                    {
                        roomsSingle?.content?.map(item => (
                            <tr className='hover:bg-grayDark border-b border-[#ced4da]'>
                                <td className='px-6 py-4 text-sm'>{item.room_number}</td>
                                <td className='px-6 py-4 text-sm'>
                                    <div>
                                        <img src={item.room_type.images[0]} alt={item.room_type.name} className='w-[112px] h-[75px] rounded-2xl' />
                                    </div>
                                </td>
                                <td className='px-6 py-4 text-sm'>{item.room_type.name}</td>
                                {/* <td className='px-6 py-4 text-sm'>${item.room_type.capacity}</td> */}
                                {/* <td className='px-6 py-4 text-sm'>{item.room_type.beds} camas</td> */}
                                <td className='px-6 py-4 text-sm'>
                                    <div className='flex flex-col gap-4 text-sm'>
                                        <div>
                                            <p className='flex gap-2 text-[#6C6C6C]'>Capacidad:<span className='flex gap-2 text-black'> <Users size={20} /> {item.room_type.capacity}</span></p>
                                        </div>
                                        <div>
                                            <p className='flex gap-2 text-[#6C6C6C]'>No camas:<span className='flex gap-2 text-black'> <Bed /> {item.room_type.beds}</span></p>

                                        </div>
                                    </div>
                                </td>
                                <td className='px-6 py-4 text-sm'>{item.lastMaintenance}</td>
                                <td className='px-6 py-4 text-sm'>${item.room_type.price}</td>
                                <td>
                                    <p className={` ${item.status === "OCUPADA" ? "bg-red-400" : " bg-[#10A760]"} py-1.5 px-3 rounded-xl text-center text-primary`}>{item.status}</p>
                                </td>
                                <td className='px-6 py-4 text-sm'>
                                    <div className='flex items-center gap-4  text-sm'>
                                        <Dialog>
                                            <DialogTrigger><button className="text-blue-500 cursor-pointer"><Edit3 /></button></DialogTrigger>
                                            <DialogContent className="left-[50%]">
                                                <DialogHeader >
                                                    <DialogTitle>Edita una habitacion.</DialogTitle>
                                                </DialogHeader>
                                                <RoomsSingleEditPage roomId={item.id} />
                                            </DialogContent>
                                        </Dialog>
                                        {/* <Link to={`/admin/tipo-habitacion/${item.id}`}><button className="text-blue-500 cursor-pointer"><Edit3 /></button></Link> */}

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
                                                    <AlertDialogAction onClick={() => deleteRoomSingle(item.id)}>Confirmar</AlertDialogAction>
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
