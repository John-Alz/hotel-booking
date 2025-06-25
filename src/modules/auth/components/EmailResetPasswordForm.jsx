import React from 'react'
import { Header } from '../../core/components/Header'
import { Footer } from '../../core/components/Footer'
import { useForm } from 'react-hook-form'
import { api } from '../../../shared/api/apiClient'
import { notifyService } from '../../core/services/notifyService'
import { ToastContainer } from 'react-toastify'

export const EmailResetPasswordForm = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();

    const postEmailReset = async (data) => {
        try {
            const response = await api.post("/auth/request-password-reset", data)
            console.log(response);
            switch (response.status) {
                case 200:
                    notifyService.success(response.data.message)
                    break;
                case 400:
                    notifyService.error(response.data.message)
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.log(error);

        }
    }

    const submitEmailResetPassword = handleSubmit((data) => {
        console.log(data);
        postEmailReset(data)
    })

    return (
        <>
            <Header />

            <div className='flex flex-col justify-center h-screen '>
                <ToastContainer />

                <form className='w-[35%] m-auto self-center border rounded-2xl p-4 flex flex-col gap-10 shadow-md'>
                    <h2 className='text-center text-xl font-bold'>¿Te olvidaste la contraseña?</h2>
                    <fieldset className=' flex flex-col gap-5'>
                        <div className='flex flex-col gap-1'>
                            <label>Ingresa la dirección de correo electrónico asociada a tu cuenta y te enviaremos un enlace para restablecer tu contraseña.</label>
                            <input type='text' name='email' placeholder='Correo electrónico' className='p-4 border rounded-lg'
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: 'Correo es requerido '
                                    },
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: 'El formato del correo electrónico no es válido.'
                                    }
                                })}
                            />
                            {
                                errors.email && <span className='text-red-400 text-xs'>{errors.email.message}</span>
                            }
                        </div>
                    </fieldset>
                    <div className='flex flex-col gap-1'>
                        <button onClick={submitEmailResetPassword} className='p-4 border bg-secondary rounded-lg border-secondary text-primary cursor-pointer'>Enviar enlace para reestablecer contraseña</button>

                    </div>
                </form>
                <Footer />
            </div>
        </>
    )
}
