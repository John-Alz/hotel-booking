import React from 'react'

export const FiltersList = () => {
    return (
        <section className=' pr-10  py-7 flex flex-col gap-5 bg-primary border-t-2 border-border'>
            <div className='w-[80%] m-auto'>
                <div className='flex flex-col gap-2'>
                    <div className='flex justify-between'>
                        <h3 className='font-bold mb-1'>Tipos de habitacion</h3>
                        <button className='text-[#858585] cursor-pointer hover:text-secondary'>Reiniciar</button>
                    </div>
                    <div className='flex gap-1'>
                        <input type='checkbox' />
                        <label>Suite</label>
                    </div>
                    <div className='flex gap-1'>
                        <input type='checkbox' />
                        <label>Suite Doble</label>
                    </div>
                    <div className='flex gap-1'>
                        <input type='checkbox' />
                        <label>Familiar</label>
                    </div>
                    <div className='flex gap-1'>
                        <input type='checkbox' />
                        <label>Estandar sencilla</label>
                    </div>
                </div>
                <div className='flex flex-col gap-2 mt-8 '>
                    <h3 className='font-bold mb-1'>Servicios</h3>
                    <div className='flex gap-1'>
                        <input type='checkbox' />
                        <label>Wifi gratis</label>
                    </div>
                    <div className='flex gap-1'>
                        <input type='checkbox' />
                        <label>Jacuzzi</label>
                    </div>
                    <div className='flex gap-1'>
                        <input type='checkbox' />
                        <label>Aire acondicionado</label>
                    </div>
                    <div className='flex gap-1'>
                        <input type='checkbox' />
                        <label>Gimnasio</label>
                    </div>
                    <div className='flex gap-1'>
                        <input type='checkbox' />
                        <label>Otro servicio</label>
                    </div>
                </div>
            </div>
        </section>
    )
}
