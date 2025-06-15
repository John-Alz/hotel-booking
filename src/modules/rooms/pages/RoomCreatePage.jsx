import React from 'react'
import { RoomForm } from '../components/RoomForm'
import { ArrowBigLeft, ArrowLeft } from 'lucide-react'
import { api } from '../../../shared/api/apiClient'
import { notifyService } from '../../core/services/notifyService'
import { ToastContainer } from 'react-toastify'



export const RoomCreatePage = () => {

    const createRoom = async (data) => {
        console.log(data);

        console.log("LEGUEE");
        try {
            const response = await api.post('/api/v1/rooms/types', data)
            console.log(response);

            if (response.status === 201) notifyService.success("Se creo la habitacion")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='w-[95%] m-auto flex flex-col gap-6 mb-20'>
            <ToastContainer />
            <div className='flex gap-3 mt-6'>
                <ArrowLeft size={35} />
                <h2 className='text-3xl font-bold'> Agregar nueva habitación</h2>
            </div>
            <RoomForm onSubmitData={createRoom} />
        </div>
    )
}
