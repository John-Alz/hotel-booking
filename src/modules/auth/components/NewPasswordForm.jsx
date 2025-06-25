import React from 'react'
import { Header } from '../../core/components/Header'
import { Footer } from '../../core/components/Footer'
import { useForm } from 'react-hook-form'
import { api } from '../../../shared/api/apiClient'
import { notifyService } from '../../core/services/notifyService'
import { useSearchParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

export const NewPasswordForm = () => {

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token")

    const { register, formState: { errors }, handleSubmit, watch } = useForm();

    const postNewPasswordReset = async (data) => {
        try {
            const response = await api.post("/auth/reset-password", data)
            console.log(response.status);
            switch (response.status) {
                case 200:
                    notifyService.success(response.data.message)
                    break;
                case 400:
                    notifyService.success("No envio el link")
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.log(error);

        }
    }

    const submitResetPassword = handleSubmit((data) => {
        console.log("CLOKC");

        console.log(data);
        const dataSubmit = {
            token: token,
            newPassword: data.confirmPassword
        }
        console.log(dataSubmit);
        postNewPasswordReset(dataSubmit)

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
                            <label>Contraseña</label>
                            <input type='password' name='password' placeholder='Contraseña' className='p-4 border rounded-4xl'
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: "La contraseña es requerida"
                                    },
                                    minLength: {
                                        value: 6,
                                        message: "La contraseña debe tener minimo 6 caracteres"
                                    }
                                })}
                            />
                            {errors.password && <span className='text-red-400 text-xs'>{errors.password.message}</span>}
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label>Confirmar contraseña</label>
                            <input type='password' name='confirmPassword' placeholder='Confirmar contraseña' className='p-4 border rounded-4xl'
                                {...register("confirmPassword", {
                                    required: {
                                        value: true,
                                        message: "Debes confirmar la contraseña"
                                    },
                                    validate: value => value === watch("password") || "Las contraseñas no coinciden"
                                })}
                            />
                            {errors.confirmPassword && <span className='text-red-400 text-xs'>{errors.confirmPassword.message}</span>}
                        </div>
                    </fieldset>
                    <div className='flex flex-col gap-1 mb-20'>
                        <button onClick={submitResetPassword} className='p-4 border bg-secondary rounded-lg border-secondary text-primary cursor-pointer'>Enviar enlace para reestablecer contraseña</button>

                    </div>
                </form>
                <Footer />
            </div>
        </>
    )
}
