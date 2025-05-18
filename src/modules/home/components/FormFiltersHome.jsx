import { ArrowRight } from 'lucide-react'
import React from 'react'

export const FormFiltersHome = () => {
    return (
        <form className='bg-primary w-[600px] flex justify-between px-4 py-2 rounded-full shadow-md'>
            <div className='flex flex-col border-r-1 border-border px-6 gap-1'>
                <label>Entrada</label>
                <input type='date' />
            </div>
            <div className='flex flex-col border-r-1 border-border px-6 gap-1'>
                <label>Salida</label>
                <input type='date' />
            </div>
            <div className='flex flex-col gap-1'>
                <label>Huespedes</label>
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
