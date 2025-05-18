import { ArrowLeft, ArrowRight } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

export const FormSearchList = () => {
    return (
        <section className='pr-5 m-auto py-7 flex flex-col bg-gray-custom'>
            <div className='w-[80%] m-auto'>
                <div className='flex flex-col gap-5'>
                    <Link to={'/'}><ArrowLeft size={30} /></Link>
                    <h2 className='font-bold text-2xl'>Tu busqueda</h2>
                </div>
                <form className='flex flex-col gap-4 mt-5'>
                    <div className='flex flex-col gap-2'>
                        <label>Entrada</label>
                        <input type='date' className='bg-primary rounded-full py-3 px-8' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label>Salida</label>
                        <input type='date' className='bg-primary rounded-full py-3 px-8' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label>Huespedes</label>
                        <select className='bg-primary rounded-full py-3 px-8'>
                            <option>1</option>
                            <option>1</option>
                            <option>1</option>
                        </select>
                    </div>
                    <div className='flex'>
                        <button className='w-full border border-primary bg-secondary py-2 px-8 mb-3 rounded-full text-primary cursor-pointer hover:bg-primary hover:border hover:border-secondary hover:text-secondary'>Buscar</button>
                    </div>
                </form>
            </div>
        </section>
    )
}
