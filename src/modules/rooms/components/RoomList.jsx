import imageRoom from '../../../../public/images/img-room.jpeg'
import { RoomCard } from './RoomCard'
import { rooms } from './roomsMock'

export const RoomList = () => {
    return (
        <section className='w-[95%] m-auto py-8'>
            <div className='mb-8'>
                <p>140 resultados para la busqueda</p>
                <h2 className='font-bold text-4xl'>Copenhagen, Dec 9 - 12, 2 guests, 1 room</h2>
            </div>
            <div className='flex flex-col gap-6 mb-8'>
                {
                    rooms.map((item) => (
                        <RoomCard item={item} />
                    ))
                }
            </div>
        </section>
    )
}
