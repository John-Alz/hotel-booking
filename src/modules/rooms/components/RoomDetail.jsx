import { AirVent, ArrowLeft, IdCard, ParkingCircle, Wifi } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom'
import { PersonalData } from './PersonalData';
import { Rules } from './Rules';
import { PaymentData } from './PaymentData';
import useRoomStore from '../store/useRoomStore';
import { useDateFormat } from '../helpers/DateFormat';
import dayjs from 'dayjs';
import { totalPrice } from '../helpers/totalPrice';
import { api } from '../../../shared/api/apiClient';
import { notifyService } from '../../core/services/notifyService';
import { ToastContainer } from 'react-toastify';
import useAuthStore from '../../auth/store/useAuthStore';


export const RoomDetail = () => {
    const filters = useRoomStore(state => state.filters);
    const params = useParams();

    const id = params.id;

    const roomSelected = useRoomStore(state => state.roomSelected)
    const fetchRoom = useRoomStore(state => state.fetchRoom)

    const profile = useAuthStore(state => state.profile);

    const dateCheckin = useDateFormat(filters.checkin, true)
    const dateCheckout = useDateFormat(filters.checkout, true)

    console.log(filters);
    console.log("Profile.id: " + profile?.id);


    const [booking, setBooking] = useState({
        clientId: profile?.id,
        roomTypeId: parseInt(id),
        status: 'CONFIRMADA',
        checkInDate: filters.checkin,
        checkOutDate: filters.checkout,
        numberOfRoom: 1
    });



    useEffect(() => {
        fetchRoom(id);
    }, [])


    const { nights, total, totalWithoutService } = totalPrice(filters.checkin, filters.checkout, roomSelected?.price, booking.numberOfRoom)

    console.log(roomSelected);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = parseInt(e.target.value);
        console.log(value);
        console.log(typeof value);

        setBooking({
            ...booking,
            [name]: value
        });
        console.log(booking);
    }

    console.log("checkin: " + booking.checkin);
    console.log("checkout: " + booking.checkout);
    console.log("rooms: " + booking.numberOfRoom);
    console.log(booking);



    const bookingSubmit = async () => {
        if (!profile) {
            notifyService.error("Debes iniciar sesion para completar tu reserva.")
            return;
        }
        console.log(booking);

        try {
            const response = await api.post('/api/v1/booking', booking);
            console.log(response);
            if (response.status === 201) notifyService.success(response.data.message)
        } catch (error) {
            notifyService.error("No se pude Crear la reserva.")
        }
    }


    return (
        <section className='flex border-t-2 border-border'>
            <ToastContainer />
            <div id='right' className='w-[50%] py-8 border-r-2 border-border'>

                <section className='flex flex-col gap-5 pl-10 pr-40 pb-10'>
                    <Link to={'/rooms/list'}><ArrowLeft /></Link>
                    <h2 className='text-2xl font-bold'>Reserva {roomSelected?.name}</h2>
                    <h2 className='text-xl font-semibold'>Paso 1:</h2>
                    <div className='flex flex-col gap-2'>
                        <p className='font-semibold'>Servicios de la habitacion</p>
                        <div className='flex gap-4 flex-wrap'>
                            {
                                roomSelected?.amenities.map((item) => (
                                    <div className='flex gap-1'>
                                        <img src={item.image} width={25} />
                                        <span>{item.name}</span>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                    <div className='flex flex-col gap-2 mt-3'>
                        <p>Seleccione opcion de habitaciones</p>
                        <select name='numberOfRoom' className='w-[406px] border border-border py-2 px-3 rounded-4xl' onChange={handleChange}>
                            <option value='1'>1 habitacion</option>
                            <option value='2'>2 Habitaciones</option>
                            <option value='3'>3 Habitaciones</option>
                            <option value='4'>4Habitaciones</option>
                        </select>
                    </div>
                </section>

                {/* Siguiente seccion */}

                <article className='pl-10 pr-40 border-y-2 border-border'>
                    <PersonalData />
                </article>

                <article className='pl-10 pr-40 border-b-2 border-border '>
                    <PaymentData />
                </article>

                <article className='pl-10 pr-40  border-border '>
                    <Rules />
                </article>

            </div>


            <div id='left' className='w-[50%] py-8 relative'>
                <section className='w-[80%] m-auto shadow-md inset-shadow-2xs rounded-4xl text-[14px]'>
                    <article className='p-6'>
                        <img src={roomSelected?.images[0]} height={373} alt='imgRoomDetail' className='rounded-4xl h-[373px] w-full object-cover' />
                        <div className=' mt-3'>
                            <h2 className='text-xl font-bold'>{roomSelected?.name}</h2>
                            <p>{roomSelected?.description}</p>
                        </div>
                        <div className='py-5'>
                            <div className='flex gap-5'>
                                <p className='font-bold'>Check in</p>
                                <span>{dateCheckin}</span>

                            </div>
                            <div className='flex gap-5'>
                                <p className='font-bold'>Check out</p>
                                <span>{dateCheckout}</span>
                            </div>
                        </div>
                        <div className='py-5 border-y-2 border-border'>
                            <h2 className='font-bold'>Habitacion doble estandar</h2>
                            <div className='w-[200px] flex justify-between'>
                                <p>Precio por noche</p>
                                <span>${roomSelected?.price}</span>
                            </div>
                            <div className='w-[200px] flex justify-between'>
                                <p>{nights} Noches</p>
                                <span>${totalWithoutService}</span>
                            </div>
                            <div className='w-[200px] flex justify-between'>
                                <p>Habitaciones</p>
                                <span>x{booking.numberOfRoom}</span>
                            </div>
                            <div className='w-[200px] flex justify-between mt-5 '>
                                <p>Tarifa de servicio</p>
                                <span className='text-left'>$20</span>
                            </div>
                        </div>
                        <div className='font-bold w-[200px] flex justify-between my-5'>
                            <p>TOTAL</p>
                            <span>${total}</span>
                        </div>
                    </article>
                </section>
                <div className='flex w-[80%] m-auto absolute bottom-0 right-0 left-0 py-20'>
                    <button className='w-full bg-secondary border border-secondary py-2 px-8 rounded-full text-primary cursor-pointer hover:bg-transparent hover:text-secondary ' onClick={bookingSubmit}>Pagar ahora</button>
                </div>
            </div>
        </section>
    )
}
