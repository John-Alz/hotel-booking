import React from 'react'
import { BookingTable } from '../../booking/components/BookingTable'
import { RoomsSingleTable } from '../components/RoomsSingleTable'

export const RoomsSingleTablePage = () => {


    return (
        <div className='w-11/12 m-auto mt-6'>
            <div>
                <h2 className='text-3xl font-bold'>Lista de habitaciones</h2>
            </div>
            <RoomsSingleTable />
        </div>
    )
}
