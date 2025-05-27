import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useRoomStore from '../store/useRoomStore';
import { RoomForm } from '../components/RoomForm';
import { ToastContainer } from 'react-toastify';
import { ArrowLeft } from 'lucide-react';
import { api } from '../../../shared/api/apiClient';
import { notifyService } from '../../core/services/notifyService';

export const RoomEditPage = () => {

    const params = useParams();

    const fetchRoom = useRoomStore(state => state.fetchRoom);
    const room = useRoomStore(state => state.roomSelected);

    useEffect(() => {
        fetchRoom(params.id)
    }, [])


    const updateRoom = async (data) => {
        console.log(data);

        console.log("LEGUEE");
        try {
            const response = await api.put(`/api/v1/rooms/types/${params.id}`, data)
            console.log(response);
            if (response.status === 200) notifyService.success(response.data.message)
        } catch (error) {
            console.log(error);
        }
    }


    return (

        <div className='w-[95%] m-auto flex flex-col gap-6 mb-20'>
            <ToastContainer />
            <div className='flex gap-3 mt-6'>
                <ArrowLeft size={35} />
                <h2 className='text-3xl font-bold'>Editar la habitación</h2>
            </div>
            <RoomForm initialState={room} onSubmitData={updateRoom} />
        </div>
    )
}
