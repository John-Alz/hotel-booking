import { AlarmSmokeIcon, ArrowBigDownDash, CircleX, Clock, Cpu, CupSoda, Dog, PartyPopper, X } from 'lucide-react'
import { ArrowBigDown } from 'lucide-solid'
import React from 'react'

export const Rules = () => {
    return (
        <section className='py-10'>
            <h2 className='text-xl font-semibold mb-5'>Reglas del hotel</h2>
            <div className='w-[500px] flex justify-between'>
                <div className=''>
                    <div className='flex gap-2'>
                        <Clock />
                        <p>Hora de check-in</p>
                    </div>
                    <p className='text-right'>Desde las 3 PM</p>
                </div>
                <div className=''>
                    <div className='flex gap-2'>
                        <CircleX />
                        <p>Hora de check-out</p>
                    </div>
                    <p className='text-right'>Desde las 11 AM</p>
                </div>
            </div>
            <div className='flex flex-col gap-2 mt-6'>
                <p className=''>A tener en cuenta</p>
                <div className='flex text-[14px] text-center justify-between'>
                    <div className='flex gap-2'>
                        <Dog />
                        <span>No se permiten mascotas</span>
                    </div>
                    <div className='flex gap-2'>
                        <AlarmSmokeIcon />
                        <span>No se permiten fumar</span>
                    </div>
                    <div className='flex gap-2'>
                        <CupSoda />
                        <span>No se permiten fiestas</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
