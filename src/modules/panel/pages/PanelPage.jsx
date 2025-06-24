import React from 'react'
import { SectionCards } from '../components/SectionCards'
import { Chart } from '../components/Chart'
import { TablePayamentsPanel } from '../components/TablePayamentsPanel'

export const PanelPage = () => {
    return (
        <div className='w-11/12 m-auto mt-6 mb-16'>
            <div>
                <h2 className='text-3xl font-bold mb-6'>Dashboard</h2>
            </div>
            {/* <RoomTable /> */}
            <div className='flex flex-col gap-5'>
                <SectionCards />
                <div className='flex gap-5'>
                    <div className='w-[50%]'>
                        <Chart />
                    </div>
                    <div className='w-[50%]'>
                        <TablePayamentsPanel />
                    </div>
                </div>
            </div>
        </div>
    )
}
