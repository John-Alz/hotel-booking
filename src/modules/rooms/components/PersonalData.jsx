import React from 'react'
import { useForm } from 'react-hook-form'

export const PersonalData = () => {


    const { register, reset, handleSubmit, formState: { errors } } = useForm();

    return (
        <section className='py-10'>
            <h2 className='text-xl font-semibold mb-5'>Paso 2: Informacion personal</h2>
            <form className='flex flex-col gap-3'>
                <div className='flex flex-col gap-1'>
                    <label>Nombre</label>
                    <input type='text' name='name' placeholder='e.j. John' className='border border-border py-2 px-3 rounded-4xl'
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
                </div>
                <div className='flex flex-col gap-1'>
                    <label>Apellido</label>
                    <input type='text' name='lastName' placeholder='e.j. Angel' className='border border-border py-2 px-3 rounded-4xl'
                        {...register('lastName', {
                            required: {
                                value: true,
                                message: "El apellido es requerido"
                            },
                            minLength: {
                                value: 4,
                                message: "El apellido debe tener minimo 4 caracteres"
                            },
                            pattern: {
                                value: /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/,
                                message: 'Solo letras.'
                            }
                        })}
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label>Email</label>
                    <input type='text' name='email' placeholder='email@email.com' className='border border-border py-2 px-3 rounded-4xl'
                        {...register('email', {
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
                    <label>Telefono</label>
                    <input type='text' name='phone' placeholder='+57 123456789' className='border border-border py-2 px-3 rounded-4xl'
                        {...register('phone', {
                            required: {
                                value: true,
                                message: 'Telefono es requerido '
                            },
                            pattern: {
                                value: /^\+?[0-9]{1,13}$/,
                                message: 'Solo se permiten números, con o sin + al inicio.'
                            }
                        })}
                    />
                </div>
            </form>
        </section>
    )
}
