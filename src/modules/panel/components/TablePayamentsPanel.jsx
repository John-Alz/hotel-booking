import React from 'react'

export const TablePayamentsPanel = () => {
    return (
        <div className='bg-primary rounded-2xl p-4 flex flex-col gap-4 border'>
            <div>
                <h2 className='text-lg font-bold'>Pagos recientes</h2>
                <p className='text-black-opacity'>Tienes 25 pagos en el ultimo mes</p>
            </div>
            <section className='flex flex-col gap-3'>
                <article className='flex gap-2 justify-between'>
                    <div className='flex gap-3 '>
                        <div className='flex items-center'>
                            <p className='border bg-black border-black px-3 py-2.5 rounded-full text-white text-center'>
                                JA</p>
                        </div>
                        <div>
                            <p>John Angel</p>
                            <p className='text-black-opacity'>john@gmail.com</p>
                        </div>
                    </div>
                    <div>
                        <p className='font-bold'>+$250.000</p>
                    </div>
                </article>
                <article className='flex gap-2 justify-between'>
                    <div className='flex gap-3 '>
                        <div className='flex items-center'>
                            <p className='border bg-black border-black px-3 py-2.5 rounded-full text-white text-center'>
                                JA</p>
                        </div>
                        <div>
                            <p>John Angel</p>
                            <p className='text-black-opacity'>john@gmail.com</p>
                        </div>
                    </div>
                    <div>
                        <p className='font-bold'>+$250.000</p>
                    </div>
                </article>
                <article className='flex gap-2 justify-between'>
                    <div className='flex gap-3 '>
                        <div className='flex items-center'>
                            <p className='border bg-black border-black px-3 py-2.5 rounded-full text-white text-center'>
                                JA</p>
                        </div>
                        <div>
                            <p>John Angel</p>
                            <p className='text-black-opacity'>john@gmail.com</p>
                        </div>
                    </div>
                    <div>
                        <p className='font-bold'>+$250.000</p>
                    </div>
                </article>
                <article className='flex gap-2 justify-between'>
                    <div className='flex gap-3 '>
                        <div className='flex items-center'>
                            <p className='border bg-black border-black px-3 py-2.5 rounded-full text-white text-center'>
                                JA</p>
                        </div>
                        <div>
                            <p>John Angel</p>
                            <p className='text-black-opacity'>john@gmail.com</p>
                        </div>
                    </div>
                    <div>
                        <p className='font-bold'>+$250.000</p>
                    </div>
                </article>
                <article className='flex gap-2 justify-between'>
                    <div className='flex gap-3 '>
                        <div className='flex items-center'>
                            <p className='border bg-black border-black px-3 py-2.5 rounded-full text-white text-center'>
                                JA</p>
                        </div>
                        <div>
                            <p>John Angel</p>
                            <p className='text-black-opacity'>john@gmail.com</p>
                        </div>
                    </div>
                    <div>
                        <p className='font-bold'>+$250.000</p>
                    </div>
                </article>
            </section>
        </div>
    )
}
