import { AirVent, ArrowLeft, IdCard, ParkingCircle, Wifi } from 'lucide-react';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom'
import { PersonalData } from './PersonalData';
import { Rules } from './Rules';
import { PaymentData } from './PaymentData';
import useRoomStore from '../store/useRoomStore';
import { useDateFormat } from '../helpers/DateFormat';
import dayjs from 'dayjs';
import { totalPrice } from '../helpers/totalPrice';


export const RoomDetail = () => {


    const params = useParams();

    const id = params.id;

    const roomSelected = useRoomStore(state => state.roomSelected)
    const fetchRoom = useRoomStore(state => state.fetchRoom)
    const filters = useRoomStore(state => state.filters);

    const dateCheckin = useDateFormat(filters.checkin, true)
    const dateCheckout = useDateFormat(filters.checkout, true)

    useEffect(() => {
        fetchRoom(id);
    }, [])


    const { nights, total, totalWithoutService } = totalPrice(filters.checkin, filters.checkout, roomSelected?.price)


    return (
        <section className='flex border-t-2 border-border'>
            <div id='right' className='w-[50%] py-8 border-r-2 border-border'>

                <section className='flex flex-col gap-5 pl-10 pr-40 pb-10'>
                    <ArrowLeft />
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
                        <p>Seleccione opcion de cama</p>
                        <select className='w-[406px] border border-border py-2 px-3 rounded-4xl'>
                            <option>2 camas separadas</option>
                            <option>Option 2</option>
                            <option>Option 3</option>
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
                    <button className='w-full bg-secondary border border-secondary py-2 px-8 rounded-full text-primary cursor-pointer hover:bg-transparent hover:text-secondary '>Pagar ahora</button>
                </div>
            </div>
        </section>
    )
}
