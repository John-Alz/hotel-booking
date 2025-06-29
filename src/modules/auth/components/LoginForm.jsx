import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'
import { AuthLayout } from '../layouts/AuthLayout'
import { authService } from '../services/authservice'
import { ArrowLeft } from 'lucide-react'
import useAuthStore from '../store/useAuthStore'

export const LoginForm = () => {

    const fetchProfile = useAuthStore(state => state.fetchProfile);
    const profile = useAuthStore(state => state.profile);

    const navigate = useNavigate()

    const { register, reset, handleSubmit,
        formState: { errors }
    } = useForm();

    console.log(errors);

    const userLogin = async (user) => {
        try {
            let response = await authService.login(user, { withCredentials: true })
            console.log(response);
            if (response.status === 200) {
                toast.success(`Hola, bienvendio a SanDiego`)

                fetchProfile();
                setTimeout(() => {
                    navigate('/')
                }, 2000);
            }
            // navigate('/')
        } catch (error) {
            if (error) toast.error(`Credenciales invalidas`)
        }

    }
    const onSubmit = handleSubmit((data) => {
        console.log(data)
        userLogin(data);
        if (!errors) {

            reset();
        }
    })


    console.log(profile);

    return (
        <AuthLayout>
            <ToastContainer />
            <form className='mt-40' onSubmit={onSubmit}>
                <div className='flex flex-col gap-5'>
                    <div className='flex gap-2'>
                        <ArrowLeft />
                        <p>Volver</p>
                    </div>
                    <h2 className='text-5xl'>Iniciar sesión en en SanDiego</h2>
                    <p>¿No tienes una cuenta? <Link to={'/auth/sign-up'}><span className='underline'>Regístrate</span></Link></p>
                </div>
                <fieldset className='my-10 flex flex-col gap-5'>
                    <div className='flex flex-col gap-1'>
                        <label>Correo electrónico</label>
                        <input type='text' name='email' placeholder='Correo electrónico' className={`${errors.email ? "border-red-400" : null} p-4 border rounded-4xl`}
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
                        <input type='password' name='password' placeholder='Contraseña' className={`${errors.password ? "border-red-400" : null} p-4 border rounded-4xl`}
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: 'Contraseña es requerida'
                                },
                                // minLength: {
                                //     value: 6,
                                //     message: 'La contraseña debe tener minimo 6 caracteres'
                                // }
                            })}
                        />
                        {
                            errors.password && <span className='text-red-400 text-xs h-[1px]'>{errors.password.message}</span>
                        }
                    </div>
                    <Link to={'/auth/email-request'}>
                        <p className='flex justify-end underline my-2 cursor-pointer'>He olvidado mi contraseña</p>
                    </Link>
                    <div className='flex flex-col gap-1 mb-20'>
                        <button className='p-4 border bg-secondary rounded-4xl border-secondary text-primary cursor-pointer'>Enviar</button>

                    </div>
                </fieldset>
            </form>
        </AuthLayout>
    )
}