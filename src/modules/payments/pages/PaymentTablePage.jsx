import React from 'react'
import { PaymentTable } from '../components/PaymentTable'

export const PaymentTablePage = () => {
    return (
        <div className='w-11/12 m-auto mt-6'>
            <div>
                <h2 className='text-3xl font-bold'>Lista de pagos</h2>
            </div>
            <PaymentTable />
        </div>
    )
}
