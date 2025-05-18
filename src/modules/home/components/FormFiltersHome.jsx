import { ArrowRight } from 'lucide-react'
import React from 'react'

export const FormFiltersHome = () => {
    return (
        <form className='bg-primary w-[700px] flex justify-between px-4 py-2 rounded-full shadow-md'>
            <div className='flex flex-col border-r-1 border-border px-8 gap-1'>
                <label className='font-bold'>Entrada</label>
                <input type='date' />
            </div>
            <div className='flex flex-col border-r-1 border-border px-8 gap-1'>
                <label className='font-bold'>Salida</label>
                <input type='date' />
            </div>
            <div className='flex flex-col gap-1'>
                <label className='font-bold'>Huespedes</label>
                <select>
                    <option>1</option>
                    <option>1</option>
                    <option>1</option>
                </select>
            </div>
            <div>
                <button className='bg-secondary p-2 rounded-full cursor-pointer'><ArrowRight color='#FFF' size={30} /></button>
            </div>
        </form>
    )
}
