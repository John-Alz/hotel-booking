import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { AuthLayout } from '../layouts/AuthLayout'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'

export const SignUpForm = () => {

    const { register, reset, watch, handleSubmit, formState: { errors } } = useForm();

    const userSignUp = async (user) => {
        try {
            let response = await authService.register(user)
            console.log(response);
            if (response.status === 201) toast.success(`Felicidades haces parte de Tripster`);
        } catch (error) {
            if (error) toast.error(`Error al crear el usuario`)
        }

    }

    const onSubmit = handleSubmit((data) => {
        console.log(data);
        let userCreated = {
            username: data.name,
            email: data.email,
            password: data.password,
            roleRequest: {
                roles: ["CUSTOMER"]
            }
        }
        userSignUp(userCreated);
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
                    <h2 className='text-5xl'>Crea tu cuenta en Tripster</h2>
                    <p>¿Ya tienes una cuenta?<Link to={'/auth/login'}> <span className='underline'>Iniciar sesion</span></Link></p>
                </div>
                <fieldset className='my-10 flex flex-col gap-5'>
                    <div className='flex flex-col gap-1'>
                        <label>Nombre</label>
                        <input type='text' name='name' placeholder='Nombre' className='p-4 border rounded-2xl'
                            {...register('name', {
                                required: {
                                    value: true,
                                    message: "El nombre es requerido"
                                },
                                minLength: {
                                    value: 4,
                                    message: "El nombre debe tener minimo 4 caracteres"
                                },
                                pattern: {
                                    value: /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/,
                                    message: 'Solo letras.'
                                }
                            })}
                        />
                        {
                            errors.name && <span className='text-red-400 text-xs'>{errors.name.message}</span>
                        }
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label>Primer apellido</label>
                        <input type='text' name='lastName' placeholder='Primer apellido' className='p-4 border rounded-2xl'
                            {...register('lastName', {
                                required: {
                                    value: true,
                                    message: "El apellido es requerido"
                                },
                                minLength: {
                                    value: 4,
                                    message: "El nombre debe tener minimo 4 caracteres"
                                },
                                pattern: {
                                    value: /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/,
                                    message: 'Solo letras.'
                                }
                            })}
                        />
                        {
                            errors.lastName && <span className='text-red-400 text-xs'>{errors.lastName.message}</span>
                        }
                    </div>
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
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label>Fecha de nacimiento</label>
                        <input type='date' className='p-4 border rounded-2xl' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label>Contraseña</label>
                        <input type='password' name='password' placeholder='Contraseña' className='p-4 border rounded-2xl'
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
                        <input type='password' name='confirmPassword' placeholder='Confirmar contraseña' className='p-4 border rounded-2xl'
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
                    <div className='flex flex-col gap-1 mt-10 mb-20'>
                        <button className='p-4 border bg-secondary rounded-2xl border-secondary text-primary cursor-pointer'>Crear cuenta</button>
                    </div>
                </fieldset>
            </form>
        </AuthLayout>
    )
}
