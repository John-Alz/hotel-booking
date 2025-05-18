import { CircleDollarSign, Mailbox } from 'lucide-react'

export const Newsletter = () => {
    return (
        <article className='w-[95%] m-auto bg-primary inset-shadow-2xs shadow-md h-[75px] rounded-2xl flex justify-between items-center px-4 my-14'>
            <div className='flex gap-5'>
                <div><CircleDollarSign size={50} /></div>
                <div>
                    <p className='font-bold'>Pssst!</p>
                    <span>¿Buscas ofertas secretas y los mejores precios para estancias increíbles?</span>
                </div>
            </div>
            <div>
                <button className='border border-secondary py-2 px-8 rounded-full text-secondary cursor-pointer hover:bg-secondary hover:text-primary'>Registrate gratis</button>
            </div>
        </article>
    )
}
