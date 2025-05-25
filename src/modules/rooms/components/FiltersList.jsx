import React, { useEffect } from 'react'
import useRoomStore from '../store/useRoomStore';
import { useForm } from 'react-hook-form';
import useAmenityStore from '../../amenities/store/useAmenityStore';

export const FiltersList = () => {

    const fetchRooms = useRoomStore(state => state.fetchRooms);
    const setFilter = useRoomStore(state => state.setFilter);
    const filters = useRoomStore(state => state.filters)
    const clearFilters = useRoomStore(state => state.clearFilters)
    const fetchAmenities = useAmenityStore(state => state.fetchAmenities);
    const amenities = useAmenityStore(state => state.amenities);

    useEffect(() => {
        fetchRooms(filters)
        fetchAmenities();
    }, [filters])


    function handleChange(e) {

        const name = e.target.name;
        const value = e.target.value;
        const newFilters = {
            ...filters,
            [name === 'typeRoom' ? 'type' : 'amenity']: value
        };
        setFilter(newFilters);
    }

    const handleReset = () => {
        clearFilters();
    }


    return (
        <section className=' pr-10  py-7 flex flex-col gap-5 bg-primary border-t-2 border-border'>
            <div className='w-[80%] m-auto'>
                <div className='flex flex-col gap-2'>
                    <div className='flex justify-between'>
                        <h3 className='font-bold mb-1 text-xl'>Tipos de habitacion</h3>
                        <button className='text-[#858585] cursor-pointer hover:text-secondary' onClick={handleReset}>Reiniciar</button>
                    </div>
                    <form className="flex flex-col gap-2">
                        <div className='flex gap-1'>
                            <input type='radio' name='typeRoom' value="Habitacion estandar sencilla" onChange={handleChange}
                                checked={filters.type === "Habitacion estandar sencilla"}
                            />
                            <label>Estandar sencilla</label>
                        </div>
                        <div className='flex gap-1'>
                            <input type='radio' name='typeRoom' value="Habitacion suite" onChange={handleChange}
                                checked={filters.type === "Habitacion suite"}
                            />
                            <label>Suite</label>
                        </div>
                        <div className='flex gap-1'>
                            <input type='radio' name='typeRoom' value="Habitacion estandar doble" onChange={handleChange}
                                checked={filters.type === "Habitacion estandar doble"}
                            />
                            <label>Estandar doble</label>
                        </div>
                        <div className='flex gap-1'>
                            <input type='radio' name='typeRoom' value="Habitacion familiar" onChange={handleChange}
                                checked={filters.type === "Habitacion familiar"}
                            />
                            <label>Familiar</label>
                        </div>

                    </form>

                </div>
                <div className='flex flex-col gap-2 mt-8 '>
                    <h3 className='font-bold mb-1 text-xl'>Servicios</h3>
                    <form className="flex flex-col gap-2">
                        {
                            amenities?.content?.map((item) => (
                                <div className='flex gap-1'>
                                    <input type='radio' name='amenity' value={item.id} onChange={handleChange}
                                        checked={filters.amenity == item.id}
                                    />
                                    <label>{item.name}</label>
                                </div>
                            ))
                        }
                    </form>
                </div>
            </div>
        </section>
    )
}
