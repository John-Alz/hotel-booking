import React from 'react'
import { CancellationsTable } from '../components/CancellationsTable'

export const CancellationsTablePage = () => {
    return (
        <div className='w-11/12 m-auto mt-6'>
            <div>
                <h2 className='text-3xl font-bold'>Lista de cancelaciones</h2>
            </div>
            <CancellationsTable />
        </div>
    )
}
