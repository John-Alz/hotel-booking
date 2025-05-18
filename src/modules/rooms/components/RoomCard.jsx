import React from 'react'

export const RoomCard = ({ item }) => {
    return (
        <div id='card' className='bg-primary shadow-md inset-shadow-2xs flex rounded-4xl '>
            <div className='w-full p-4 flex justify-between '>
                <div className='flex gap-4'>
                    <img src={item.images} width={250} className='rounded-4xl' alt='ImgAlt' />
                    <div>
                        <div className='flex flex-col gap-1'>
                            <h2 className='font-bold text-xl'>{item.name}</h2>
                            <div className='text-black-opacity flex flex-col'>
                                <span >{item.meters} mts cuadrados</span>
                                <span>Free cancelation . Breakfast included</span>
                            </div>
                        </div>
                        <div className='flex flex-col mt-4'>
                            <h2 className='font-bold'>Confort de la habitacion</h2>
                            <div className='flex flex-col'>
                                <span>{item.beds}</span>
                                <span>{item.bath} Banios</span>
                            </div>
                            <div className='flex gap-3 mt-3'>
                                <p className='border border-secondary py-1 px-3 rounded-full text-secondary'>#Hot sale</p>
                                <p className='border border-secondary py-1 px-3 rounded-full text-secondary'>#Popular</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col justify-between'>
                    <div className='flex justify-end gap-3 text-[#009D52] items-center '>
                        <p className=''>Excelente</p>
                        <span className='bg-green-custom py-1 px-4 rounded-4xl'>9.6</span>
                    </div>
                    <div className='text-right flex flex-col gap-3'>
                        <div>
                            <p className='font-bold'>${item.price}</p>
                            <p>3 noches, 2 huespedes</p>
                        </div>
                        <button className='bg-secondary border border-secondary py-2 px-8 rounded-full text-primary cursor-pointer hover:bg-transparent hover:text-secondary '>Reservalo ahora</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
