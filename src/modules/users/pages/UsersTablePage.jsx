import React from 'react'
import { BookingTable } from '../../booking/components/BookingTable'
import { UsersTable } from '../components/UsersTable'

export const UsersTablePage = () => {
    return (
        <div className='w-11/12 m-auto mt-6'>
            <div>
                <h2 className='text-3xl font-bold'>Lista de usuarios</h2>
            </div>
            <UsersTable />
        </div>
    )
}
