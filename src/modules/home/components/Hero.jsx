import React from 'react'
import { FormFiltersHome } from './FormFiltersHome'

export const Hero = () => {
    return (
        <div className='w-[95%] m-auto relative '>
            <section
                className="w-full h-[300px] bg-[url('/public/images/hero-img.avif')]  bg-no-repeat object-cover bg-center rounded-3xl flex justify-center"
            >
                <div className=' flex flex-col self-center w-[80%] m-auto text-center'>
                    <h1 className='text-primary z-10 font-bold text-4xl'>Reserva tu estadía con Tripster</h1>
                    <p className='text-primary z-10'>¡+50 habitaciones diseñadas para tu comodidad!</p>
                </div>
            </section>
            <div className='absolute  top-0 inset-0 bg-black/50 h-[300px] w-full rounded-3xl'></div>
            <div className='flex justify-center -translate-y-10'>
                <FormFiltersHome />
            </div>
        </div>
    )
}
