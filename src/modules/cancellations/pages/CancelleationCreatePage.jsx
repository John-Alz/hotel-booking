import React from 'react'
import { CancellationForm } from '../components/CancellationForm'
import { api } from '../../../shared/api/apiClient'
import { notifyService } from '../../core/services/notifyService'

export const CancelleationCreatePage = ({ bookingId }) => {

    const postCancellation = async (data) => {
        try {
            const response = await api.post(`/api/v1/cancellations`, data);
            console.log(response.data.message);

            switch (response.status) {
                case 201:
                    notifyService.success(response.data.message)
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error(error);

        }
    }

    return (
        <article>
            <CancellationForm onSubmitData={postCancellation} bookingId={bookingId} />
        </article>
    )
}
