import React from 'react'

export const Footer = () => {
    return (
        <footer className=' bg-[#F8F8F8] flex justify-between p-10'>
            <section className='flex flex-col justify-between'>
                <div>
                    <h3 className='text-xl font-bold'>Tripster</h3>
                    <p>Your favorite hotel booking experience <br /> since 1997!</p>
                </div>
                <p className='text-[#858585]'>Conexa © 2025</p>
            </section>
            <section>
                <ul className='text-right flex flex-col gap-2'>
                    <li>Ayuda</li>
                    <li>PQR</li>
                    <li>Servicio al cliente</li>
                    <li>How to guide</li>
                    <li>Contactanos</li>
                </ul>
            </section>
        </footer>
    )
}
