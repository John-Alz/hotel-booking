import React, { useEffect } from 'react'
import { api } from '../../../shared/api/apiClient'
import { notifyService } from '../../core/services/notifyService'
import useRoomSingleStore from '../store/userRoomSingleStore'
import { RoomSingleForm } from '../components/RoomSingleForm'

export const RoomsSingleEditPage = ({ roomId }) => {
    console.log("ID A MODIFICAR: " + roomId);


    const fetchRoomsSingle = useRoomSingleStore(state => state.fetchRoomSingle);
    const roomSingleSelected = useRoomSingleStore(state => state.roomSingleSelected);

    useEffect(() => {
        fetchRoomsSingle(roomId)
    }, [])

    const updateRoomSingle = async (data) => {
        try {
            const response = await api.put(`/api/v1/rooms/${roomId}`, data)
            console.log(response);
            if (response.status === 200) notifyService.success("Se actualizo la habitacion")
        } catch (error) {
            notifyService.error(error)
        }
    }

    console.log(roomSingleSelected);


    return (
        <div>
            <RoomSingleForm onSubmitData={updateRoomSingle} initialState={roomSingleSelected} />
        </div>
    )
}
