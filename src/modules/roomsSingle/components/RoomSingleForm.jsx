import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom';
import useRoomStore from '../../rooms/store/useRoomStore';

export const RoomSingleForm = ({ onSubmitData, initialState = null }) => {
    console.log(initialState);


    const rooms = useRoomStore(state => state.rooms);
    const fetchRooms = useRoomStore(state => state.fetchRooms);

    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        fetchRooms();
    }, [])

    useEffect(() => {
        if (initialState) {
            reset({
                room_number: initialState.room_number,
                room_type_id: initialState.room_type.id,
                status: initialState.status,
                lastMaintenance: initialState.lastMaintenance,
                notes: initialState.notes,
            });
        }
    }, [initialState, reset])


    const onSubmit = handleSubmit((data) => {
        onSubmitData(data)
        fetchRooms()
    })


    return (
        <form className='flex flex-col gap-3' onSubmit={onSubmit}>
            <fieldset className='flex gap-10'>
                <div className='w-full flex flex-col gap-1' >
                    <label>No. de habitacion *</label>
                    <input type='text' name='room_number' placeholder='Escribe el nombre de la habitacion' className='border-2 border-border py-2 px-3 rounded-3xl'
                        {...register('room_number')}
                    />
                </div>
                <div className='w-full flex flex-col gap-1' >
                    <label>Tipo de habitacion *</label>
                    <select name='room_type_id' className='border-2 border-border py-2.5 px-3 rounded-3xl'
                        {...register('room_type_id')}
                    >
                        <option selected disabled>Seleccione una habitacion</option>
                        {
                            rooms?.content?.map(item => (
                                <option key={item.id} value={item.id}>
                                    {/* <img src={item.images[0]} /> */}
                                    {item.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset className='flex gap-10'>
                <div className='w-full flex flex-col gap-1' >
                    <label>Ultima limpieza *</label>
                    <input type='date' name='lastMaintenance' placeholder='Escribe el nombre de la habitacion' className='border-2 border-border py-2 px-3 rounded-3xl'
                        {...register('lastMaintenance')}
                    />
                </div>
                <div className='w-full flex flex-col gap-1' >
                    <label>Notas *</label>
                    <select name='status' className='border-2 border-border py-2.5 px-3 rounded-3xl'
                        {...register('status')}
                    >
                        <option value='DISPONIBLE'>Disponible</option>
                        <option value='OCUPADA'>Ocuapada</option>
                    </select>
                </div>
            </fieldset>
            <fieldset className='w-full flex justify-between gap-10'>
                <div className='w-full flex flex-col gap-1'>
                    <label>Notas *</label>
                    <textarea name='notes' placeholder='Ingresa la nota' className='border-2 border-border py-2 px-3 rounded-3xl h-[100px] resize-none'
                        {...register('notes')}
                    />
                </div>
            </fieldset>
            <div className='flex gap-5 pt-4 justify-end'>
                <button className='py-2 px-8 border bg-secondary rounded-4xl border-secondary text-primary cursor-pointer hover:bg-secondary/90'>Guardar</button>
                <Link to={'/admin/habitaciones'}><button className='py-2 px-8 border bg-primary rounded-4xl border-secondary text-secondary cursor-pointer'>Cancelar</button></Link>
            </div>
        </form>
    )
}
