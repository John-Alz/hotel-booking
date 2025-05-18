import { AirVent, ArrowLeft, IdCard, ParkingCircle, Wifi } from 'lucide-react';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom'
import { PersonalData } from './PersonalData';
import { Rules } from './Rules';
import { PaymentData } from './PaymentData';


export const RoomDetail = () => {


    const params = useParams();

    const id = params.id;

    return (
        <section className='flex border-t-2 border-border'>
            <div id='right' className='w-[50%] py-8 border-r-2 border-border'>

                <section className='flex flex-col gap-5 pl-10 pr-40 pb-10'>
                    <ArrowLeft />
                    <h2 className='text-2xl font-bold'>Reserva habitacion doble estandar</h2>
                    <h2 className='text-xl font-semibold'>Paso 1:</h2>
                    <div className='flex flex-col gap-2'>
                        <p className='font-semibold'>Servicios de la habitacion</p>
                        <div className='flex gap-4'>
                            <div className='flex gap-2'>
                                <Wifi />
                                <span>Wifi gratis</span>
                            </div>
                            <div className='flex gap-2'>
                                <ParkingCircle />
                                <span>Wifi gratis</span>
                            </div>
                            <div className='flex gap-2'>
                                <AirVent />
                                <span>Wifi gratis</span>
                            </div>
                            <div className='flex gap-2'>
                                <IdCard />
                                <span>Wifi gratis</span>
                            </div>
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
                        <img src='/public/images/hero-img.avif' alt='imgRoomDetail' className='rounded-4xl' />
                        <div className=' mt-3'>
                            <h2 className='text-xl font-bold'>Habitacion doble estandar</h2>
                            <p>3-star hotel located in the heart of Copenhagen</p>
                        </div>
                        <div className='py-5'>
                            <div className='flex gap-5'>
                                <p className='font-bold'>Check in</p>
                                <span>Viernes, 09 Julio 2025</span>
                            </div>
                            <div className='flex gap-5'>
                                <p className='font-bold'>Check out</p>
                                <span>Lunes, 12 Julio 2025</span>
                            </div>
                        </div>
                        <div className='py-5 border-y-2 border-border'>
                            <h2 className='font-bold'>Habitacion doble estandar</h2>
                            <div className='w-[200px] flex justify-between'>
                                <p>Precio por noche</p>
                                <span>$180</span>
                            </div>
                            <div className='w-[200px] flex justify-between'>
                                <p>3 Noches</p>
                                <span>$540</span>
                            </div>
                            <div className='w-[200px] flex justify-between mt-5 '>
                                <p>Tarifa de servicio</p>
                                <span className='text-left'>$20</span>
                            </div>
                        </div>
                        <div className='font-bold w-[200px] flex justify-between my-5'>
                            <p>TOTAL</p>
                            <span>$600</span>
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
