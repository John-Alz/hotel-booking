import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { AuthLayout } from '../layouts/AuthLayout'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'
import { authService } from '../services/authservice'
import { notifyService } from '../../core/services/notifyService'

export const SignUpForm = () => {

    const { register, reset, watch, handleSubmit, formState: { errors } } = useForm();

    const userSignUp = async (user) => {
        try {
            let response = await authService.register(user)
            console.log(response);
            switch (response.status) {
                case 201:
                    notifyService.success(`Felicidades haces parte de SanDiego`)
                    break;
                case 400:
                    notifyService.error(response.data.message)
                    break;
                default:
                    break;
            }
        } catch (error) {
            if (error) toast.error(`Error al crear el usuario`)
            console.log(error);

        }

    }

    const onSubmit = handleSubmit((data) => {
        console.log(data);
        let userCreated = {
            username: data.name,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            birthday: data.birthday,
            password: data.password,
            roleRequest: {
                role: "CLIENTE"
            }
        }
        console.log(userCreated);

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
                    <h2 className='text-5xl'>Crea tu cuenta en SanDiego</h2>
                    <p>¿Ya tienes una cuenta?<Link to={'/auth/login'}> <span className='underline'>Iniciar sesion</span></Link></p>
                </div>
                <fieldset className='my-10 flex flex-col gap-5'>
                    <div className='flex flex-col gap-1'>
                        <label>Nombre</label>
                        <input type='text' name='name' placeholder='Nombre' className={`${errors.name ? "border-red-400" : null} p-4 border rounded-4xl`}
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
                        <input type='text' name='lastName' placeholder='Primer apellido' className={`${errors.lastName ? "border-red-400" : null} p-4 border rounded-4xl`}
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
                        <label>Numero de telefono</label>
                        <input type='text' name='phoneNumber' placeholder='Correo electrónico' className={`${errors.phoneNumber ? "border-red-400" : null} p-4 border rounded-4xl`}
                            {...register("phoneNumber", {
                                required: {
                                    value: true,
                                    message: 'El numero de teelfono es requerido '
                                },
                                pattern: {
                                    value: /^\+?[0-9]{1,13}$/,
                                    message: 'El formato del numero de telefono no es válido.'
                                }
                            })}
                        />
                        {
                            errors.phoneNumber && <span className='text-red-400 text-xs'>{errors.phoneNumber.message}</span>
                        }
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label>Fecha de nacimiento</label>
                        <input type='date' name='birthday' className={`${errors.birthday ? "border-red-400" : null} p-4 border rounded-4xl`}
                            {...register("birthday", {
                                required: {
                                    value: true,
                                    message: 'La fecha de nacimiento es rquerida'
                                }
                            })}
                        />
                        {
                            errors.birthday && <span className='text-red-400 text-xs'>{errors.birthday.message}</span>
                        }
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label>Contraseña</label>
                        <input type='password' name='password' placeholder='Contraseña' className={`${errors.password ? "border-red-400" : null} p-4 border rounded-4xl`}
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
                        <input type='password' name='confirmPassword' placeholder='Confirmar contraseña' className={`${errors.confirmPassword ? "border-red-400" : null} p-4 border rounded-4xl`}
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
                        <button className='p-4 border bg-secondary rounded-4xl border-secondary text-primary cursor-pointer'>Crear cuenta</button>
                    </div>
                </fieldset>
            </form>
        </AuthLayout>
    )
}
