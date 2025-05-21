import { ArrowRight } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import useRoomStore from '../../rooms/store/useRoomStore'
import dayjs from 'dayjs'

export const FormFiltersHome = () => {

    const navigate = useNavigate();

    const setFilter = useRoomStore(state => state.setFilter)

    const { register, reset, handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            checkin: dayjs().add(1, 'day').format('YYYY-MM-DD'),
            checkout: dayjs().add(2, 'day').format('YYYY-MM-DD'),
            capacity: 2,
        }
    });

    const onSubmit = handleSubmit((data) => {
        console.log(data);
        setFilter(data)
        navigate('/rooms/list');
    })



    return (
        <form onSubmit={onSubmit} className='bg-primary w-[700px] flex justify-between px-4 py-2 rounded-full shadow-md'>
            <div className='flex flex-col border-r-1 border-border px-8 gap-1'>
                <label className='font-bold'>Entrada</label>
                <input type='date' name='checkin'
                    {...register('checkin')}
                />
            </div>
            <div className='flex flex-col border-r-1 border-border px-8 gap-1'>
                <label className='font-bold'>Salida</label>
                <input type='date' name='checkout'
                    {...register('checkout')}
                />
            </div>
            <div className='flex flex-col gap-1'>
                <label className='font-bold'>Huespedes</label>
                <select name='capacity'
                    {...register("capacity")}
                >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>+4</option>
                </select>
            </div>
            <div>
                <button className='bg-secondary p-2 rounded-full cursor-pointer'><ArrowRight color='#FFF' size={30} /></button>
            </div>
        </form>
    )
}
