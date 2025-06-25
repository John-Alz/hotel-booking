import { Link } from 'react-router-dom'
import imageRoom from '../../../../public/images/img-room.jpeg'
import { RoomCard } from './RoomCard'
// import { rooms } from './roomsMock'
import useRoomStore from '../store/useRoomStore'
import { useEffect } from 'react'
import { useDateFormat } from '../helpers/DateFormat'

export const RoomList = () => {

    const rooms = useRoomStore(state => state.rooms);
    const fetchRooms = useRoomStore(state => state.fetchRooms);
    const filters = useRoomStore(state => state.filters);

    const dateCheckin = useDateFormat(filters.checkin, false)
    const dateCheckout = useDateFormat(filters.checkout, false)

    useEffect(() => {
        fetchRooms(0, 20, filters);
    }, [filters])

    console.log(rooms);



    return (
        <section className='w-[95%] m-auto py-8'>
            <div className='mb-8'>
                {
                    Object.keys(filters).length === 0 ?
                        <h2 className='font-bold text-4xl'>Habitaciones disponibles</h2> :
                        <div>
                            <p>Los resultados para la busqueda</p>
                            <h2 className='font-bold text-4xl'>{dateCheckin} - {dateCheckout}, {filters.capacity} huespedes</h2>
                        </div>
                }

            </div>
            <div className='flex flex-col gap-6 mb-8'>
                {
                    rooms?.content?.map((item) => (
                        <Link key={item.id} to={`/rooms/room/${item.id}`}>
                            <RoomCard item={item} />
                        </Link>
                    ))
                }
            </div>
        </section>
    )
}
