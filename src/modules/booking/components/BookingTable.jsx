import { useEffect } from 'react'

import { Bed, BedDouble, DoorOpen, Edit3, Filter, Plus, Search, Trash2, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
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
import useBookingStore from '../store/useBookingStore';
import { FiltersTable } from '../../rooms/components/FiltersTable';
import { api } from '../../../shared/api/apiClient';



export const BookingTable = () => {

    const fetchBookings = useBookingStore(state => state.fetchBookings);
    const bookings = useBookingStore(state => state.bookings);

    useEffect(() => {
        fetchBookings();
    }, [])

    const onChange = (e) => {
        console.log(e.target.value);
    }

    console.log(bookings);

    const deleteBooking = async (id) => {
        try {
            const response = await api.delete(`/api/v1/booking/${id}`)
            console.log(response);
            if (response.status === 200) {
                fetchBookings();
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
                    <Link to={'/admin/crear-reserva'}><Button ><Plus /> Crear una reserva</Button></Link>
                </div>
            </div>
            <table className='min-w-full  text-base font-light text-surface bg-gray rounded-xl bg-primary table-auto w-full'>
                <thead className=" border-b border-[#ced4da] bg-[#ced4da]/35 rounded-xl">
                    <tr>
                        {/* <th className="px-6 py-3 text-start text-sm font-bold ">ID</th> */}
                        <th className="px-6 py-3 text-start text-sm font-bold ">No. Reserva</th>
                        <th className="px-6 py-3 text-start text-sm font-bold ">Cliente</th>
                        <th className="px-6 py-3 text-start text-sm font-bold ">Email</th>
                        <th className="px-6 py-3 text-start text-sm font-bold ">Habitacion</th>
                        <th className="px-6 py-3 text-start text-sm font-bold ">Fecha reserva</th>
                        <th className="px-6 py-3 text-start text-sm font-bold ">Ceck-in</th>
                        <th className="px-6 py-3 text-start text-sm font-bold ">Check-out</th>
                        <th className="px-6 py-3 text-start text-sm font-bold ">Precio total</th>
                        <th className="px-6 py-3 text-start text-sm font-bold ">Habitaciones</th>
                        <th className="px-6 py-3 text-start text-sm font-bold ">Acciones</th>
                    </tr>
                </thead>
                <tbody className='font-medium'>
                    {
                        bookings?.content?.map(item => (
                            <tr className='hover:bg-grayDark border-b border-[#ced4da]'>
                                {/* <td className='px-6 py-4 text-sm'>{item.id}</td> */}
                                <td className='px-6 py-4 text-sm'>R-223971</td>
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
                                <td className='px-6 py-4 text-sm'>{item.bookingDate.slice(0, 10)}</td>
                                <td className='px-6 py-4 text-sm'>
                                    <p className=' bg-green-400 py-1 px-1.5 rounded-3xl'>{item.checkInDate}</p>
                                </td>
                                <td className='px-6 py-4 text-sm'>
                                    <p className=' bg-red-400 py-1 px-1.5 rounded-3xl'>{item.checkInDate}</p>
                                </td>
                                <td className='px-6 py-4 text-sm'>${item.totalPrice}</td>
                                <td className='px-6 py-4 text-sm'>
                                    <div className='flex gap-3 items-center'>
                                        <DoorOpen />
                                        {item.numberOfRoom}
                                    </div>
                                </td>
                                <td className='px-6 py-4 text-sm'>
                                    <div className='flex items-center gap-4  text-sm'>
                                        <Link to={`/admin/reservas/${item.id}`}><button className="text-blue-500 cursor-pointer"><Edit3 /></button></Link>

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
                                                    <AlertDialogAction onClick={() => deleteBooking(item.id)}>Confirmar</AlertDialogAction>
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
