import { CircleArrowLeft } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

export const AuthLayout = ({ children }) => {
    return (
        <div className='w-full flex'>
            <div className='absolute'>
                <Link to={"/"}><h2 className='font-bold text-4xl p-5'>SanDiego</h2></Link>
            </div>
            <div className='w-[50%] flex justify-center items-center'>
                {children}
            </div>
            <div className='w-[50%] h-screen'>
                <img className=' h-screen object-cover fixed' src={'/public/images/hero-img.avif'} alt='img-art' />
            </div>
        </div>
    )
}