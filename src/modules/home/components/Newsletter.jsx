import { CircleDollarSign, Mailbox } from 'lucide-react'

export const Newsletter = () => {
    return (
        <article className='w-[95%] m-auto bg-primary not-only:inset-shadow-2xs shadow-md rounded-2xl flex justify-between flex-wrap items-center px-4 py-3 my-14'>
            <div className='flex gap-5 '>
                <div className='flex flex-col justify-center'><CircleDollarSign size={50} /></div>
                <div>
                    <p className='font-bold'>Pssst!</p>
                    <div className='flex flex-col'>
                        <span>¿Buscas ofertas secretas y los mejores precios para estancias increíbles?</span>
                        <span>Regístrate para unirte a nuestro Travel Club!</span>
                    </div>
                </div>
            </div>
            <div className='w-full flex  mt-2'>
                <button className='border border-secondary py-2 px-8 rounded-full text-secondary cursor-pointer hover:bg-secondary hover:text-primary'>Registrate gratis</button>
            </div>
        </article>
    )
}
