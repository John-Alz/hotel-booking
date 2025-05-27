import React, { useEffect, useState } from 'react'
import useBookingStore from '../store/useBookingStore'
import { useParams } from 'react-router-dom'
import useRoomStore from '../../rooms/store/useRoomStore'
import { format } from "date-fns";
import { da, es } from "date-fns/locale";

import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useForm } from 'react-hook-form'

export const BookingForm = ({ onSubmitData }) => {

    const [dateCheckin, setDateCheckin] = useState('');
    const [dateCheckout, setDateCheckout] = useState('');

    const fetchRooms = useRoomStore(state => state.fetchRooms);
    const rooms = useRoomStore(state => state.rooms);

    useEffect(() => {
        fetchRooms()
    }, []);

    const { register, handleSubmit, setValue } = useForm()

    const onSubmit = handleSubmit((data) => {
        console.log(data);
        const bookingCreated = {
            name: data.name,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            roomTypeId: parseInt(data.roomTypeId),
            status: "CONFIRMADA",
            checkInDate: data.checkin,
            checkOutDate: data.checkout,
            numberOfRoom: parseInt(data.numberOfRoom)
        }
        console.log(bookingCreated);

        onSubmitData(bookingCreated)

    })

    return (
        <form className='bg-primary border border-border shadow-md inset-shadow-2xs px-5 py-10 rounded-2xl flex flex-col' onSubmit={onSubmit}>
            <h2 className='text-xl font-bold mb-4'>Detalles de la reserva</h2>
            <div className='flex flex-col gap-5'>
                <fieldset className='flex gap-10'>
                    <div className='w-full flex flex-col gap-1' >
                        <label className='font-medium'>Check-in</label>
                        <Popover >
                            <PopoverTrigger asChild className='p-5 w-[100%]'>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !dateCheckin && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon />
                                    {dateCheckin ? format(dateCheckin, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 " align="start">
                                <Calendar
                                    className='w-full'
                                    mode="single"
                                    locale={es}
                                    selected={dateCheckin}
                                    onSelect={(selectedDate) => {
                                        setDateCheckin(selectedDate);
                                        if (selectedDate) {
                                            const formatted = format(selectedDate, "yyyy-MM-dd");
                                            setValue("checkin", formatted);
                                        }
                                    }}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className='w-full flex flex-col gap-1' >
                        <label>Check-out</label>
                        {/* <input type='date' name='checkout' placeholder='Escribe el nombre de la habitacion' className='border-2 border-border py-2 px-3 rounded-3xl'
                        /> */}
                        <Popover >
                            <PopoverTrigger asChild className='p-5 w-[100%]'>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !dateCheckout && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon />
                                    {dateCheckout ? format(dateCheckout, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 " align="start">
                                <Calendar
                                    className='w-full'
                                    mode="single"
                                    locale={es}
                                    selected={dateCheckout}
                                    onSelect={(selectedDate) => {
                                        setDateCheckout(selectedDate);
                                        if (selectedDate) {
                                            const formatted = format(selectedDate, "yyyy-MM-dd");
                                            setValue("checkout", formatted);
                                        }
                                    }}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </fieldset>

                <fieldset className='flex gap-10'>
                    <div className='w-full flex flex-col gap-1' >
                        <label>No. de huespedes</label>
                        <input type='text' name='numberOfRoom' placeholder='Escribe el nombre de la habitacion' className='border-2 border-border py-2 px-3 rounded-3xl'
                            {...register('numberOfRoom')}
                        />
                    </div>
                    <div className='w-full flex flex-col gap-1' >
                        <label>Tipo de habitacion</label>
                        <select name='roomTypeId' className='border-2 border-border py-2.5 px-3 rounded-3xl'
                            {...register('roomTypeId')}
                        >
                            <option selected disabled>Seleccione una habitacion</option>
                            {
                                rooms?.content?.map(item => (
                                    <option value={item.id}>{item.name}</option>
                                ))
                            }
                        </select>
                    </div>
                </fieldset>
            </div>
            <div className='my-6'>
                <h2 className='text-xl font-bold mb-4'>Detalles de contacto</h2>
                <div className='flex flex-col gap-5'>
                    <fieldset className='flex gap-10'>
                        <div className='w-full flex flex-col gap-1' >
                            <label>Nombre</label>
                            <input type='text' name='name' placeholder='Escribe el nombre del cliente' className='border-2 border-border py-2 px-3 rounded-3xl'
                                {...register('name')}
                            />
                        </div>
                        <div className='w-full flex flex-col gap-1' >
                            <label>Apellido</label>
                            <input type='text' name='lastName' placeholder='Escribe el apellido del cliente' className='border-2 border-border py-2 px-3 rounded-3xl'
                                {...register('lastName')}
                            />
                        </div>
                    </fieldset>
                    <fieldset className='flex gap-10'>
                        <div className='w-full flex flex-col gap-1' >
                            <label>Numero de telefono</label>
                            <input type='text' name='phoneNumber' placeholder='Escribe el numero de telefono del cliente' className='border-2 border-border py-2 px-3 rounded-3xl'
                                {...register('phoneNumber')}
                            />
                        </div>
                        <div className='w-full flex flex-col gap-1' >
                            <label>Correo electrónico</label>
                            <input type='email' name='email' placeholder='Escribe el correo electrocico del cliente' className='border-2 border-border py-2 px-3 rounded-3xl'
                                {...register('email')}
                            />
                        </div>
                    </fieldset>
                </div>
            </div>
            <div className='flex gap-5 pt-4 justify-end'>
                <button className='py-2 px-8 border bg-secondary rounded-4xl border-secondary text-primary cursor-pointer hover:bg-secondary/90'>Guardar</button>
                <button className='py-2 px-8 border bg-primary rounded-4xl border-secondary text-secondary cursor-pointer'>Cancelar</button>
            </div>
        </form >
    )
}
