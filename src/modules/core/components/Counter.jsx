import { Minus, MinusCircle, Plus } from 'lucide-react';
import React, { useState } from 'react'

export const Counter = ({ title }) => {

    const [count, setCount] = useState(0);

    const handleIncrement = () => {
        setCount(count + 1)
    }

    const handleDecrement = () => {
        setCount(count - 1)
    }

    return (
        <div className='flex justify-between w-full items-center'>
            <p>{title}</p>
            <div className='flex gap-3 items-center'>
                <button onClick={handleDecrement} disabled={count === 0 ?? true} className='border rounded-full border-black/25  cursor-pointer'><Minus /></button>
                <p className='text-lg'>{count}</p>
                <button onClick={handleIncrement} className='border rounded-full border-black/25 cursor-pointer'><Plus /></button>
            </div>
        </div>
    )
}
