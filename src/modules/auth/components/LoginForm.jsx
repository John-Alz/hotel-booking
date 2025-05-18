import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'
import { AuthLayout } from '../layouts/AuthLayout'
import { authService } from '../services/authservice'
import { ArrowLeft } from 'lucide-react'

export const LoginForm = () => {


    const { register, reset, handleSubmit,
        formState: { errors }
    } = useForm();

    console.log(errors);

    const userLogin = async (user) => {
        try {
            let response = await authService.login(user, { withCredentials: true },)
            console.log(response);
            if (response.status === 200) toast.success(`Bienvenido`);
        } catch (error) {
            if (error) toast.error(`Credenciales invalidas`)
        }

    }
    const onSubmit = handleSubmit((data) => {
        console.log(data)
        userLogin(data);
        reset();
    })


    return (
        <AuthLayout>
            <ToastContainer />
            <form className='mt-40' onSubmit={onSubmit}>
                <div className='flex flex-col gap-5'>
                    <div className='flex gap-2'>
                        <ArrowLeft />
                        <p>Volver</p>
                    </div>
                    <h2 className='text-5xl'>Iniciar sesión en en Tripster</h2>
                    <p>¿No tienes una cuenta? <Link to={'/auth/sign-up'}><span className='underline'>Regístrate</span></Link></p>
                </div>
                <fieldset className='my-10 flex flex-col gap-5'>
                    <div className='flex flex-col gap-1'>
                        <label>Correo electrónico</label>
                        <input type='text' name='email' placeholder='Correo electrónico' className='p-4 border rounded-2xl'
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
                    <div className='flex flex-col gap-1'>
                        <label>Contraseña</label>
                        <input type='password' name='password' placeholder='Contraseña' className='p-4 border rounded-2xl'
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: 'Contraseña es requerida'
                                },
                                minLength: {
                                    value: 6,
                                    message: 'La contraseña debe tener minimo 6 caracteres'
                                }
                            })}
                        />
                        {
                            errors.password && <span className='text-red-400 text-xs h-[1px]'>{errors.password.message}</span>
                        }
                    </div>
                    <p className='flex justify-end underline my-2 cursor-pointer'>Todavía no tengo contraseña / He olvidado mi contraseña</p>
                    <div className='flex flex-col gap-1 mb-20'>
                        <button className='p-4 border bg-secondary rounded-2xl border-secondary text-primary cursor-pointer'>Enviar</button>
                    </div>
                </fieldset>
            </form>
        </AuthLayout>
    )
}