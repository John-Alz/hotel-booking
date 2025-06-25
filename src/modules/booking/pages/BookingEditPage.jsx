import { ArrowLeft } from 'lucide-react';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import useBookingStore from '../store/useBookingStore';
import { BookingForm } from '../components/BookingForm';
import { api } from '../../../shared/api/apiClient';
import { notifyService } from '../../core/services/notifyService';

export const BookingEditPage = () => {

    const params = useParams();
    const fetchBooking = useBookingStore(state => state.fetchBooking);
    const booking = useBookingStore(state => state.booking)

    useEffect(() => {
        fetchBooking(params.id)
    }, [])

    console.log(params.id);

    console.log(booking);

    const updateBooking = async (data) => {
        console.log(data);

        console.log("LEGUEE");
        try {
            const response = await api.put(`/api/v1/booking/${params.id}`, data)
            console.log(response);
            if (response.status === 200) notifyService.success("Se ha actualizado la reserva.")
        } catch (error) {
            console.log(error);
        }
    }




    return (
        <div className='w-[95%] m-auto flex flex-col gap-6 mb-20'>
            <ToastContainer />
            <div className='flex gap-3 mt-6'>
                <ArrowLeft size={35} />
                <h2 className='text-3xl font-bold'>Editar la reserva</h2>
            </div>
            <BookingForm initialState={booking} onSubmitData={updateBooking} bookingId={params.id} roomTypeId={booking?.RoomType?.id} flag={true} />
        </div>
    )
}
