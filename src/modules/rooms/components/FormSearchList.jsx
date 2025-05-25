import { ArrowLeft, ArrowRight } from 'lucide-react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useRoomStore from '../store/useRoomStore'
import { useForm } from 'react-hook-form'
import dayjs from 'dayjs'

export const FormSearchList = () => {

    const filters = useRoomStore(state => state.filters)
    const setFilter = useRoomStore(state => state.setFilter)
    const fetchRooms = useRoomStore(state => state.fetchRooms)

    const { register, reset, handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            checkin: filters.checkin ? filters.checkin : dayjs().add(1, 'day').format('YYYY-MM-DD'),
            checkout: filters.checkout ? filters.checkout : dayjs().add(2, 'day').format('YYYY-MM-DD'),
            capacity: filters.capacity ? filters.capacity : 2,
        }
    });

    useEffect(() => {
        fetchRooms(filters)
    }, [filters])

    const onSubmit = handleSubmit((data) => {
        console.log(data);
        setFilter(data)
    })

    // const handleChange = (e) => {
    //     console.log(e.target.value);

    // }

    console.log(JSON.stringify(filters));




    return (
        <section className='pr-5 m-auto py-7 flex flex-col bg-gray-custom'>
            <div className='w-[80%] m-auto'>
                <div className='flex flex-col gap-5'>
                    <Link to={'/'}><ArrowLeft size={30} /></Link>
                    <h2 className='font-bold text-2xl'>Tu busqueda</h2>
                </div>
                <form className='flex flex-col gap-4 mt-5' onSubmit={onSubmit}>
                    <div className='flex flex-col gap-2'>
                        <label>Entrada</label>
                        <input type='date' className='bg-primary rounded-full py-3 px-8'
                            {...register('checkin')}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label>Salida</label>
                        <input type='date' className='bg-primary rounded-full py-3 px-8'
                            {...register('checkout')} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label>Huespedes</label>
                        <select className='bg-primary rounded-full py-3 px-8'
                            {...register('capacity')}
                        >
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>+5</option>
                        </select>
                    </div>
                    <div className='flex'>
                        <button className='w-full border border-primary bg-secondary py-2 px-8 mb-3 rounded-full text-primary cursor-pointer hover:bg-primary hover:border hover:border-secondary hover:text-secondary'>Buscar</button>
                    </div>
                </form>
            </div>
        </section>
    )
}
