import React, { useEffect, useState } from 'react'
import useBookingStore from '../store/useBookingStore'
import { Link, useParams } from 'react-router-dom'
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
import useRoomSingleStore from '../../roomsSingle/store/userRoomSingleStore';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { api } from '../../../shared/api/apiClient';
import { notifyService } from '../../core/services/notifyService';
import { ToastContainer } from 'react-toastify';

export const BookingForm = ({ onSubmitData, initialState = null, bookingId, roomTypeId, flag }) => {

    console.log("ROOMTYPEID PARA EL FETCH ROOMS: " + roomTypeId);

    const [roomsByBooking, setRoomsByBooking] = useState([]);


    const [dateCheckin, setDateCheckin] = useState(initialState?.checkInDate);
    const [dateCheckout, setDateCheckout] = useState(initialState?.checkOutDate);


    const fetchRooms = useRoomStore(state => state.fetchRooms);
    const rooms = useRoomStore(state => state.rooms);
    const fetchRoomAssignment = useBookingStore(state => state.fetchRoomAssignment);
    const roomAssigment = useBookingStore(state => state.roomAssigment);
    const fetchRoomsSingle = useRoomSingleStore(state => state.fetchRoomsSingle);
    const roomsSingle = useRoomSingleStore(state => state.roomsSingle);


    useEffect(() => {
        fetchRooms();
        fetchRoomAssignment(bookingId);
        fetchRoomsSingle(0, 10, roomTypeId)
    }, [roomTypeId]);

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm()

    useEffect(() => {
        if (initialState) {
            reset({
                name: initialState.client.name,
                lastName: initialState.client.name,
                email: initialState.client.email,
                phoneNumber: initialState.client.name,
                roomTypeId: initialState.RoomType.id,
                status: initialState.status,
                checkin: initialState.checkInDate,
                checkout: initialState.checkOutDate,
                numberOfRoom: initialState.numberOfRoom
            });
        }
    }, [initialState, reset, dateCheckin, dateCheckout])

    const onSubmit = handleSubmit((data) => {
        console.log(data);
        const bookingCreated = {
            name: data.name,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            roomTypeId: parseInt(data.roomTypeId),
            // status: "CONFIRMADA",
            checkInDate: data.checkin,
            checkOutDate: data.checkout,
            numberOfRoom: parseInt(data.numberOfRoom)
        }
        console.log(bookingCreated);

        onSubmitData(bookingCreated)

    })
    console.log(roomsSingle);

    const handleChange = (e) => {
        console.log(e.target.value);
        let value = parseInt(e.target.value);
        setRoomsByBooking([...roomsByBooking, value])
    }

    const assigmentRoomsPost = async () => {
        const data = {
            bookingId: bookingId,
            roomsIds: roomsByBooking
        }
        console.log(bookingId);
        console.log(roomsByBooking);
        console.log(data);
        try {
            const response = await api.post('/api/v1/room_assigment', data);

            switch (response.status) {
                case 201:
                    notifyService.success(response.data.message)
                    fetchRoomAssignment(bookingId);
                    break;
                case 400:
                    notifyService.error(response.data.message)
                    break;
                default:
                    break;
            }

            console.log(response);
            // if (response.status === 400) {
            //     notifyService.error(response.data.message)
            // }
        } catch (error) {
            console.log(error);

        }
    }



    return (
        <form className='bg-primary border border-border shadow-md inset-shadow-2xs px-5 py-10 rounded-2xl flex flex-col' >
            <ToastContainer />
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
                        <label>No. de Habitaciones</label>
                        <input type='text' name='numberOfRoom' placeholder='Escribe el nombre de la habitacion' className={`${errors.numberOfRoom ? "border-red-400 border-1" : null} border-2 border-border py-2 px-3 rounded-3xl`}
                            {...register('numberOfRoom', {
                                required: {
                                    value: true,
                                    message: 'Numero de habitaciones es requerido '
                                }
                            })}
                        />
                        {
                            errors.numberOfRoom && <span className='text-red-400 text-xs'>{errors.numberOfRoom.message}</span>
                        }
                    </div>
                    <div className='w-full flex flex-col gap-1' >
                        <label>Tipo de habitacion</label>
                        <select name='roomTypeId' className={`${errors.roomTypeId ? "border-red-400 border-1" : null} border-2 border-border py-2.5 px-3 rounded-3xl`}
                            {...register('roomTypeId', {
                                required: {
                                    value: true,
                                    message: 'El tipo de habitacion es requerido.'
                                }
                            })}
                        >
                            <option selected disabled value="">Seleccione una habitacion</option>
                            {
                                rooms?.content?.map(item => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))
                            }
                        </select>
                        {
                            errors.roomTypeId && <span className='text-red-400 text-xs'>{errors.roomTypeId.message}</span>
                        }
                    </div>
                </fieldset>
            </div>
            <div className='my-6'>
                <h2 className='text-xl font-bold mb-4'>Detalles de contacto</h2>
                <div className='flex flex-col gap-5'>
                    <fieldset className='flex gap-10'>
                        <div className='w-full flex flex-col gap-1' >
                            <label>Nombre</label>
                            <input type='text' name='name' placeholder='Escribe el nombre del cliente' className={`${errors.name ? "border-red-400 border-1" : null} border-2 border-border py-2 px-3 rounded-3xl`}
                                {...register('name', {
                                    required: {
                                        value: true,
                                        message: 'El nombre es requerido.'
                                    }
                                })}
                            />
                            {
                                errors.name && <span className='text-red-400 text-xs'>{errors.name.message}</span>
                            }
                        </div>
                        <div className='w-full flex flex-col gap-1' >
                            <label>Apellido</label>
                            <input type='text' name='lastName' placeholder='Escribe el apellido del cliente' className={`${errors.lastName ? "border-red-400 border-1" : null} border-2 border-border py-2 px-3 rounded-3xl`}
                                {...register('lastName', {
                                    required: {
                                        value: true,
                                        message: 'El apellido es requerido.'
                                    }
                                })}
                            />
                            {
                                errors.lastName && <span className='text-red-400 text-xs'>{errors.lastName.message}</span>
                            }
                        </div>
                    </fieldset>
                    <fieldset className='flex gap-10'>
                        <div className='w-full flex flex-col gap-1' >
                            <label>Numero de telefono</label>
                            <input type='text' name='phoneNumber' placeholder='Escribe el numero de telefono del cliente' className={`${errors.phoneNumber ? "border-red-400 border-1" : null} border-2 border-border py-2 px-3 rounded-3xl`}
                                {...register('phoneNumber', {
                                    required: {
                                        value: true,
                                        message: 'El numero de telefono es requerido.'
                                    }
                                })}
                            />
                            {
                                errors.phoneNumber && <span className='text-red-400 text-xs'>{errors.phoneNumber.message}</span>
                            }
                        </div>
                        <div className='w-full flex flex-col gap-1' >
                            <label>Correo electrónico</label>
                            <input type='email' name='email' placeholder='Escribe el correo electrocico del cliente' className={`${errors.email ? "border-red-400 border-1" : null} border-2 border-border py-2 px-3 rounded-3xl`}
                                {...register('email', {
                                    required: {
                                        value: true,
                                        message: 'El email es requerido.'
                                    }
                                })}
                            />
                            {
                                errors.email && <span className='text-red-400 text-xs'>{errors.email.message}</span>
                            }
                        </div>
                    </fieldset>
                </div>
            </div>
            {
                flag ?
                    <>
                        <div >
                            <h2 className='text-xl font-bold mb-4'>Habitaciones disponibles para asignar</h2>
                            <div className='flex gap-8 '>
                                <Carousel>
                                    <CarouselPrevious type="button" />
                                    <CarouselContent>
                                        {
                                            roomsSingle?.content?.length > 0 ? roomsSingle?.content?.map(item => (
                                                <CarouselItem className="basis-1/6">
                                                    <article className='bg-primary border p-2 rounded-3xl not-only:inset-shadow-2xs shadow-md'>
                                                        <img className='w-[250px] rounded-2xl' src={item.room_type.images[0]} alt={item.room_type.name} />
                                                        <div className='flex flex-col gap-1 mt-2'>
                                                            <h2 className='text-3xl font-bold'>No.{item.room_number}</h2>
                                                            <h4 className='text-black-opacity'>{item.room_type.name} </h4>
                                                            <div className='flex gap-2 bg-secondary py-1 px-2 rounded-2xl text-white w-24'>
                                                                <input onChange={handleChange} type='checkbox' value={item.id} />
                                                                <label>Asignar</label>
                                                            </div>
                                                        </div>
                                                    </article>
                                                </CarouselItem>

                                            )) :
                                                <h2 className='text-center text-3xl'>No hay habitaciones asignadas para esta reserva aun.</h2>
                                        }
                                    </CarouselContent>

                                    <CarouselNext type="button" />
                                </Carousel>

                            </div>
                            <div className='mt-6 flex justify-end'>
                                <button className='py-2 px-8 border bg-secondary rounded-4xl border-secondary text-primary cursor-pointer hover:bg-secondary/90' onClick={assigmentRoomsPost} type="button">Asignar habitaciones</button>
                            </div>
                        </div>
                        <div className='my-6'>
                            <h2 className='text-xl font-bold mb-4'>Habitaciones asignadas</h2>
                            <div className='flex gap-8 '>

                                {
                                    roomAssigment?.rooms.length > 0 ? roomAssigment?.rooms.map(item => (
                                        <article className='bg-primary border p-2 rounded-3xl not-only:inset-shadow-2xs shadow-md'>
                                            <img className='w-[250px] rounded-2xl' src={item.room_type.images[0]} alt={item.room_type.name} />
                                            <div className='flex flex-col gap-1 mt-2'>
                                                <h2 className='text-3xl font-bold'>No.{item.room_number}</h2>
                                                <h4 className='text-black-opacity'>{item.room_type.name} </h4>
                                            </div>
                                        </article>

                                    )) :
                                        <h2 className='text-center text-3xl'>No hay habitaciones asignadas para esta reserva aun.</h2>
                                }
                            </div>

                        </div>
                    </> : null
            }

            <div className='flex gap-5 pt-4 justify-end'>
                <button type='button' className='py-2 px-8 border bg-secondary rounded-4xl border-secondary text-primary cursor-pointer hover:bg-secondary/90' onClick={onSubmit}>Guardar</button>
                <Link to={'/admin/reservas'}><button className='py-2 px-8 border bg-primary rounded-4xl border-secondary text-secondary cursor-pointer'>Cancelar</button></Link>
            </div>
        </form >
    )
}
