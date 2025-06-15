import React from 'react'
import { BookingForm } from '../components/BookingForm'
import { ToastContainer } from 'react-toastify'
import { ArrowLeft } from 'lucide-react'
import { api } from '../../../shared/api/apiClient'
import { notifyService } from '../../core/services/notifyService'

export const BookingCreatePage = () => {


    const createBooking = async (data) => {
        try {
            const response = await api.post('/api/v1/booking', data)
            console.log(response);
            if (response.status === 201) notifyService.success(response.data.message)

        } catch (error) {
            console.log(error);

        }
    }


    return (
        <div className='w-[95%] m-auto flex flex-col gap-6 mb-20'>
            <ToastContainer />
            <div className='flex gap-3 mt-6'>
                <ArrowLeft size={35} />
                <h2 className='text-3xl font-bold'> Crea una nueva reserva</h2>
            </div>
            <BookingForm onSubmitData={createBooking} />
        </div>
    )
}
