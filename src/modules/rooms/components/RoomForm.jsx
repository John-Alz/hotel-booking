import React, { useEffect, useState } from 'react'
import useAmenityStore from '../../amenities/store/useAmenityStore'
import axios from 'axios'
import { ImagePlus } from 'lucide-react'
import { useUpLoadImage } from '../hooks/useUploadImage'
import { useForm } from 'react-hook-form'
import { api } from '../../../shared/api/apiClient'
import { notifyService } from '../../core/services/notifyService'
import { ToastContainer } from 'react-toastify'

export const RoomForm = () => {

    const [amenityId, setAmenityId] = useState([])

    const fetchAmenities = useAmenityStore(state => state.fetchAmenities);
    const amenities = useAmenityStore(state => state.amenities);

    const { loading, image, uploadImage } = useUpLoadImage();

    const { register, reset, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        fetchAmenities();
    }, [])

    console.log(amenities);

    const handleChangeAmenity = (e) => {
        const value = e.target.value;
        console.log(value);
        setAmenityId(prev => [...prev, ...value])
    }

    const createRoom = async (data) => {
        console.log("LEGUEE");
        try {
            const response = await api.post('/api/v1/rooms/types', data)
            console.log(response);

            if (response.status === 201) notifyService.success("Se creo la habitacion")
        } catch (error) {
            console.log(error);
        }
    }

    const onSubmit = handleSubmit((data) => {
        console.log(data);
        let roomCreated = {
            name: data.name,
            description: data.description,
            beds: data.beds,
            bathRooms: data.bathRooms,
            meters: data.meters,
            images: image,
            quantity_available: data.quantity_available,
            capacity: data.capacity,
            price: data.price,
            amenities_id: amenityId
        }

        console.log(roomCreated);

        createRoom(roomCreated)

    })

    console.log(amenityId);




    return (
        <form className='bg-primary border border-border shadow-md inset-shadow-2xs p-5 rounded-2xl flex flex-col' onSubmit={onSubmit}>
            <ToastContainer />
            <div className='flex flex-col gap-4  pb-6 border-b-2 border-border'>
                <h2 className='text-lg font-bold'>Fotos de la habitacion</h2>
                <div className='flex gap-2'>
                    {
                        image.map(item => (
                            <img src={item} alt='img' className='h-[120px] w-[200px] rounded-2xl' />
                        ))
                    }
                    <input type='file' multiple name='file' id='fileInput' placeholder='Upload an image' className="hidden" onChange={(e) => uploadImage(e)} />
                    <label htmlFor='fileInput' className='border border-dashed h-[120px] w-[200px] rounded-2xl flex justify-between text-black-opacity cursor-pointer'><span className='w-full text-center self-center'><p className='flex justify-center'><ImagePlus /> </p>Agregar imagen</span></label>
                </div>

            </div>
            <div className='flex flex-col gap-4  py-6 border-b-2 border-border'>
                <h2 className='text-lg font-bold'>Detalles de la habitacion</h2>
                <fieldset className='w-full flex justify-between gap-10'>

                    <div className='w-full flex flex-col gap-1' >
                        <label>Nombre</label>
                        <input type='text' name='name' placeholder='Escribe el nombre de la habitacion' className='border-2 border-border py-2 px-3 rounded-3xl'
                            {...register('name')}
                        />
                    </div>
                    <div className='w-full flex flex-col gap-1'>
                        <label>Estado*</label>
                        <select className='border-2 border-border py-2 px-3 rounded-3xl' >
                            <option>Activa</option>
                            <option>Inactiva</option>
                        </select>
                    </div>
                    <div className='w-full flex flex-col gap-1'>
                        <label>Precio *</label>
                        <input type='text' name='price' placeholder='Ingresa el precio por noche' className='border-2 border-border py-2 px-3 rounded-3xl'
                            {...register('price')}
                        />
                    </div>
                    <div className='w-full flex flex-col gap-1'>
                        <label>Stock *</label>
                        <input type='text' name='quantity_available' placeholder='Ingresa el stock' className='border-2 border-border py-2 px-3 rounded-3xl'
                            {...register('quantity_available')}
                        />
                    </div>
                </fieldset>
                <fieldset className='w-full flex justify-between gap-10'>
                    <div className='w-full flex flex-col gap-1'>
                        <label>Camas *</label>
                        <input type='text' name='beds' placeholder='Ingresa el numero de camas' className='border-2 border-border py-2 px-3 rounded-3xl'
                            {...register('beds')}
                        />
                    </div>
                    <div className='w-full flex flex-col gap-1'>
                        <label>Banios *</label>
                        <input type='text' name='bathRooms' placeholder='Ingresa el numero de bamios' className='border-2 border-border py-2 px-3 rounded-3xl'
                            {...register('bathRooms')}
                        />
                    </div>
                    <div className='w-full flex flex-col gap-1'>
                        <label>Capacidad *</label>
                        <input type='text' name='capacity' placeholder='Ingresa la capacidad' className='border-2 border-border py-2 px-3 rounded-3xl'
                            {...register('capacity')}
                        />
                    </div>
                    <div className='w-full flex flex-col gap-1'>
                        <label>Metros *</label>
                        <input type='text' name='meters' placeholder='Ingresa el numero de metros cuadrados' className='border-2 border-border py-2 px-3 rounded-3xl'
                            {...register('meters')}
                        />
                    </div>
                </fieldset>
                <fieldset className='w-full flex justify-between gap-10 mt-5'>
                    <div className='w-full flex flex-col gap-1'>
                        <label>Descripcion *</label>
                        <textarea name='description' placeholder='Ingresa la descripcion' className='border-2 border-border py-2 px-3 rounded-3xl h-[200px] resize-none'
                            {...register('description')}
                        />
                    </div>
                </fieldset>
            </div>


            <div className='flex flex-col gap-4 py-6 border-b-2 border-border'>
                <h2 className='text-lg font-bold'>Amenidades</h2>
                <fieldset className='flex flex-wrap justify-between'>
                    {
                        amenities?.content?.map(item => (
                            <div className='flex gap-2'>
                                <input type='checkbox' value={item.id} onChange={handleChangeAmenity} />
                                <label>{item.name}</label>
                            </div>
                        ))
                    }
                </fieldset>
            </div>
            <div className='flex gap-5 pt-6'>
                <button className='py-2 px-8 border bg-secondary rounded-4xl border-secondary text-primary cursor-pointer'>Guardar</button>
                <button className='py-2 px-8 border bg-primary rounded-4xl border-secondary text-secondary cursor-pointer'>Cancelar</button>
            </div>
        </form>
    )
}
