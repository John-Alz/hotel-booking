import { useEffect, useState } from 'react'

import { Bed, BedDouble, ChevronLeft, ChevronRight, CircleX, DoorOpen, Edit3, Filter, Plus, Search, Trash2, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Input } from "@/components/ui/input"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import useBookingStore from '../store/useBookingStore';
import { FiltersTable } from '../../rooms/components/FiltersTable';
import { api } from '../../../shared/api/apiClient';
import { CancelleationCreatePage } from '../../cancellations/pages/CancelleationCreatePage';
import { ToastContainer } from 'react-toastify';
import { FiltersTableBooking } from './FiltersTableBooking';
import { Pagination } from '../../core/components/Pagination';
import usePagination from '../../core/store/userPagination';
import { FilterOrderTableRoomType } from '../../rooms/components/FilterOrderTableRoomType';



export const BookingTable = () => {


    const fetchBookings = useBookingStore(state => state.fetchBookings);
    const bookings = useBookingStore(state => state.bookings);
    const filtersBooking = useBookingStore(state => state.filtersBooking);
    const setFiltersBooking = useBookingStore(state => state.setFiltersBooking);
    const { page } = usePagination();

    useEffect(() => {
        fetchBookings(page, filtersBooking);
    }, [page, filtersBooking])

    const onChange = (e) => {
        console.log(e.target.value);
        const value = e.target.value;
        fetchBookings(filtersBooking, value)
    }

    const prevPage = () => {
        setPage(page - 1)
    }

    const nextPage = () => {
        setPage(page + 1)
    }

    return (
        <div className='flex flex-col gap-7 mb-18' >
            <ToastContainer />
            <div className='flex justify-between  rounded-2xl '>
                <div className='w-[40%] relative'>
                    {/* <input type='text' placeholder='Busca aqui' className='bg-[#F2F2F2] py-2 px-2 rounded-lg w-100' /> */}
                    <Input className="bg-primary rounded-lg h-[40px] w-full" onChange={onChange} placeholder='Busca aqui' />
                    <Search color='#737373' className='absolute right-0 top-1.5 mx-2' />
                </div>
                <div className='flex gap-8 '>
                    <FiltersTableBooking />
                    <FilterOrderTableRoomType />
                    <Link to={'/admin/crear-reserva'}><Button ><Plus /> Crear una reserva</Button></Link>
                </div>
            </div>
            <table className='min-w-full  text-base font-light text-surface bg-gray rounded-2xl bg-primary table-auto w-full'>
                <thead className=" border-b border-[#ced4da] bg-[#ced4da]/35 rounded-xl">
                    <tr>
                        {/* <th className="px-6 py-3 text-start text-sm font-bold ">ID</th> */}
                        <th className="px-6 py-3 text-start text-sm font-bold ">No. Reserva</th>
                        <th className="px-6 py-3 text-start text-sm font-bold ">Cliente</th>
                        <th className="px-6 py-3 text-start text-sm font-bold ">Email</th>
                        <th className="px-6 py-3 text-start text-sm font-bold ">Habitacion</th>
                        {/* <th className="px-6 py-3 text-start text-sm font-bold ">Fecha reserva</th> */}
                        <th className="px-6 py-3 text-start text-sm font-bold ">Ceck-in</th>
                        <th className="px-6 py-3 text-start text-sm font-bold ">Check-out</th>
                        <th className="px-6 py-3 text-start text-sm font-bold ">Precio total</th>
                        {/* <th className="px-6 py-3 text-start text-sm font-bold ">Habitaciones</th> */}
                        <th className="px-6 py-3 text-start text-sm font-bold ">Estado</th>
                        <th className="px-6 py-3 text-start text-sm font-bold ">Acciones</th>
                    </tr>
                </thead>

                <tfoot>
                    <tr>
                        <td colSpan="8">
                            <Pagination data={bookings} />
                        </td>
                    </tr>
                </tfoot>

                <tbody className='font-medium'>
                    {
                        bookings?.content?.map(item => (
                            <tr className='hover:bg-grayDark border-b border-[#ced4da]'>
                                {/* <td className='px-6 py-4 text-sm'>{item.id}</td> */}
                                <td className='px-6 py-4 text-sm'>{item.bookingNumber}</td>
                                {/* <td className='px-6 py-4 text-sm'>
                                    <div>
                                        <img src={item.images[0]} alt={item.name} className='w-[112px] h-[75px] rounded-2xl' />
                                    </div>
                                </td> */}
                                <td className='px-6 py-4 text-sm'>
                                    <div className='flex gap-3 items-center'>
                                        <p className='border bg-black border-black px-4 py-2.5 rounded-full text-white text-center'>
                                            {item.client.name != null ? item.client.name.slice(0, 1) : item.name.slice(0, 1)}</p>
                                        {item.client.name != null ? item.client.name : item.name}
                                    </div>
                                </td>
                                <td className='px-6 py-4 text-sm'>{item.client.email != null ? item.client.email : item.email}</td>
                                <td className='px-6 py-4 text-sm'>{item.RoomType.name}</td>
                                {/* <td className='px-6 py-4 text-sm'>{item.bookingDate.slice(0, 10)}</td> */}
                                <td className='px-6 py-4 text-sm'>
                                    <p className=' bg-green-400 py-1 px-1.5 rounded-3xl'>{item.checkInDate}</p>
                                </td>
                                <td className='px-6 py-4 text-sm'>
                                    <p className=' bg-red-400 py-1 px-1.5 rounded-3xl'>{item.checkOutDate}</p>
                                </td>
                                <td className='px-6 py-4 text-sm'>${item.totalPrice}</td>
                                {/* <td className='px-6 py-4 text-sm'>
                                    <div className='flex gap-3 items-center'>
                                        <DoorOpen />
                                        {item.numberOfRoom}
                                    </div>
                                </td> */}
                                <td className='px-6 py-4 text-sm'>
                                    <p className={`${item.status === "CONFIRMADA" ? "bg-[#10A760]" : item.status === "CANCELADA" ? "bg-red-500" : item.status === "CHECK_IN" ? "bg-blue-500" : item.status === "CHECK_OUT" ? "bg-yellow-500" : item.status === "PAGADA" ? "bg-[#0EA5E9]" : item.status === "PENDIENTE" ? "bg-violet-400" : null} py-1.5 px-3 rounded-xl text-center text-primary`}>{item.status}</p>
                                </td>
                                <td className='px-6 py-4 text-sm'>
                                    <div className='flex items-center gap-4  text-sm'>
                                        <Link to={`/admin/reservas/editar-reserva/${item.id}`}><button className="text-blue-500 cursor-pointer"><Edit3 /></button></Link>
                                        <Dialog>
                                            <DialogTrigger><button className="text-red-500 cursor-pointer"><CircleX /></button></DialogTrigger>
                                            <DialogContent className="left-[50%]">
                                                <DialogHeader>
                                                    <DialogTitle>Cancelar reserva.</DialogTitle>
                                                </DialogHeader>
                                                <CancelleationCreatePage bookingId={item.id} />
                                            </DialogContent>
                                        </Dialog>

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
