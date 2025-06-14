import React from 'react'
import { RoomTableTwo } from '../components/RoomTableTwo'
import { RoomTable } from '../components/RoomTable'

export const RoomTablePage = () => {
    return (
        <div className='w-11/12 m-auto mt-6'>
            <div>
                <h2 className='text-3xl font-bold'>Tipos de habitaciones</h2>
            </div>
            {/* <RoomTable /> */}
            <RoomTableTwo />
        </div>
    )
}
