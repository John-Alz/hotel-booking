import React from 'react'
import { RoomSingleForm } from '../components/RoomSingleForm'
import { api } from '../../../shared/api/apiClient';
import { ToastContainer } from 'react-toastify';
import { notifyService } from '../../core/services/notifyService';

export const RoomsSingleCreate = () => {

    const createRoomSingle = async (data) => {
        console.log(data);

        console.log("LEGUEE");
        try {
            const response = await api.post('/api/v1/rooms', data)
            console.log(response);

            if (response.status === 201) notifyService.success("Se creo la habitacion")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <RoomSingleForm onSubmitData={createRoomSingle} />
        </div>
    )
}
