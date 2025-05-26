import React from 'react'
import { RoomForm } from '../components/RoomForm'
import { ArrowBigLeft, ArrowLeft } from 'lucide-react'

export const RoomCreatePage = () => {
    return (
        <div className='w-[95%] m-auto flex flex-col gap-6 mb-20'>
            <div className='flex gap-3 mt-6'>
                <ArrowLeft size={35} />
                <h2 className='text-3xl font-bold'> Agregar nueva habitación</h2>
            </div>
            <RoomForm />
        </div>
    )
}
