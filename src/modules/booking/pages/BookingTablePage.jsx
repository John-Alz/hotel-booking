import React from 'react'
import { BookingTable } from '../components/BookingTable'

export const BookingTablePage = () => {
    return (
        <div className='w-[95%] m-auto mt-6'>
            <div>
                <h2 className='text-3xl font-bold'>Reservas</h2>
            </div>
            <BookingTable />
        </div>
    )
}
