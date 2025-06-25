import React from 'react'
import { useForm } from 'react-hook-form'
import useAuthStore from '../../auth/store/useAuthStore';
import { Link } from 'react-router-dom';

export const CancellationForm = ({ onSubmitData, bookingId }) => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const profile = useAuthStore(state => state.profile);
    console.log(profile);

    const onSubmit = handleSubmit((data) => {
        const cancellationData = {
            bookingId: bookingId,
            userId: profile?.id,
            reasonForCancellation: data.reasonForCancellation
        }
        console.log(cancellationData);

        onSubmitData(cancellationData);
    })

    return (
        <form onSubmit={onSubmit}>
            <fieldset className='flex gap-10 justify-between border-t pt-4'>
                <div className='w-full flex justify-between gap-10'>
                    <div className='w-full flex flex-col gap-1' >
                        <label className='font-medium'>Razon de la cancelacion *</label>
                        <textarea name='reasonForCancellation' placeholder='Ingresa la descripcion'
                            className={`${errors.reasonForCancellation ? "border-red-400 border-1" : null} border-2 border-border py-2.5 px-3 rounded-3xl h-[200px] resize-none`}
                            {...register('reasonForCancellation', {
                                required: {
                                    value: true,
                                    message: "La razon es requerida."
                                },
                                maxLength: {
                                    value: 255,
                                    message: "La razon no puede exceder los 255 caracteres"
                                }
                            })}
                        />
                        {
                            errors.reasonForCancellation && <span className='text-red-400 text-xs'>{errors.reasonForCancellation.message}</span>
                        }
                    </div>
                </div>
            </fieldset>
            <div className='flex gap-5 pt-6 justify-end'>
                <button className='py-2 px-8 border bg-secondary rounded-4xl border-secondary text-primary cursor-pointer hover:bg-secondary/90'>Guardar</button>
                {/* <Link to={'/admin/usuarios'}><button className='py-2 px-8 border bg-primary rounded-4xl border-secondary text-secondary cursor-pointer'>Cancelar</button></Link> */}
            </div>
        </form>
    )
}
