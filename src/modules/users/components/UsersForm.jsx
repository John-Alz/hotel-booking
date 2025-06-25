
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom';
import useUsersStore from '../store/useUsersStore';

export const UsersForm = ({ initialState, onSubmitData }) => {

    const { register, reset, handleSubmit, formState: { errors } } = useForm();

    const fetchUsers = useUsersStore(state => state.fetchUsers);

    useEffect(() => {
        if (initialState) {
            reset({
                name: initialState.name,
                lastName: initialState.lastName,
                email: initialState.email,
                phoneNumber: initialState.phoneNumber,
                role: initialState.role.roleEnum,
            });
        }
    }, [initialState, reset])

    useEffect(() => {
    }, [])

    const onSubmit = handleSubmit((data) => {
        console.log(data);
        const dataEditUser = {
            username: data.name,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            birthday: initialState.birthday,
            roleRequest: {
                role: data.role
            },
        }
        onSubmitData(dataEditUser);
    })

    return (
        <form className='flex flex-col gap-5' onSubmit={onSubmit}>
            <div className='flex gap-3 my-4'>
                <p className='border bg-black border-black py-2 px-3 rounded-full text-white text-center text-2xl'>{initialState?.name.slice(0, 1)}{initialState?.lastName.slice(0, 1)}</p>
                <div className='flex flex-col gap-0,5'>
                    <h2 className='font-bold'>{initialState?.name} {initialState?.lastName}</h2>
                    <p className='text-black-opacity'>{initialState?.role?.roleEnum.toLowerCase()}</p>
                </div>
            </div>
            <fieldset className='flex gap-10 justify-between border-t pt-4'>
                <div className='w-34'>
                    <h2 className='font-bold'>Nombre</h2>
                </div>
                <div className='w-full flex justify-between gap-10'>
                    <div className='w-full flex flex-col gap-1' >
                        <label>Nombre *</label>
                        <input type='text' name='name' placeholder='Escribe el nombre del usuario' className={`${errors.name ? "border-red-400 border-1" : null} border-2 border-border py-2 px-3 rounded-3xl`}
                            {...register('name', {
                                required: {
                                    value: true,
                                    message: 'El nombre es requerido.'
                                }
                            })}
                        />
                        {
                            errors.name && <span className='text-red-400 text-xs'>{errors.name.message}</span>
                        }
                    </div>
                    <div className='w-full flex flex-col gap-1' >
                        <label>Apellido *</label>
                        <input type='text' name='lastName' placeholder='Escribe el apellido del usuario' className={`${errors.lastName ? "border-red-400 border-1" : null} border-2 border-border py-2 px-3 rounded-3xl`}
                            {...register('lastName', {
                                required: {
                                    value: true,
                                    message: 'El apellido es requerido.'
                                }
                            })}
                        />
                        {
                            errors.lastName && <span className='text-red-400 text-xs'>{errors.lastName.message}</span>
                        }
                    </div>
                </div>
            </fieldset>
            <fieldset className='w-full flex gap-10 justify-between border-t pt-4'>
                <div className='w-34'>
                    <h2 className='font-bold'>Contacto</h2>
                </div>
                <div className='w-full flex justify-between gap-10'>
                    <div className='w-full flex flex-col gap-1' >
                        <label>Telefono *</label>
                        <input type='text' name='phoneNumber' placeholder='Escribe el telefono del usuario' className={`${errors.phoneNumber ? "border-red-400 border-1" : null} border-2 border-border py-2 px-3 rounded-3xl`}
                            {...register('phoneNumber', {
                                required: {
                                    value: true,
                                    message: 'El numero de telefono es requerido'
                                }
                            })}
                        />
                        {
                            errors.phoneNumber && <span className='text-red-400 text-xs'>{errors.phoneNumber.message}</span>
                        }
                    </div>
                    <div className='w-full flex flex-col gap-1' >
                        <label>Email *</label>
                        <input type='text' name='email' placeholder='Escribe el email del usuario' className={`${errors.email ? "border-red-400 border-1" : null} border-2 border-border py-2 px-3 rounded-3xl`}
                            {...register('email', {
                                required: {
                                    value: true,
                                    message: 'El email es requerido'
                                }
                            })}
                        />
                        {
                            errors.email && <span className='text-red-400 text-xs'>{errors.email.message}</span>
                        }
                    </div>
                </div>
            </fieldset>
            <fieldset className='w-full flex gap-10 justify-between border-t pt-4'>
                <div className='w-34'>
                    <h2 className='font-bold'>T. de usuario</h2>
                </div>
                <div className='w-full flex justify-between gap-10'>
                    <div className='w-full flex flex-col gap-1' >
                        <label>Rol *</label>
                        <select name='room_type_id' className={`${errors.role ? "border-red-400 border-1" : null} border-2 border-border py-2.5 px-3 rounded-3xl`}
                            {...register('role', {
                                required: {
                                    value: true,
                                    message: 'El rol es requerido'
                                }
                            })}
                        >
                            <option value="ADMINISTRADOR" >Administrador</option>
                            <option value="RECEPCIONISTA" >Recepcionista</option>
                            <option value="CLIENTE" >Cliente</option>
                        </select>
                        {
                            errors.emroleail && <span className='text-red-400 text-xs'>{errors.role.message}</span>
                        }
                    </div>
                </div>
            </fieldset>
            <div className='flex gap-5 pt-6 justify-end border-t'>
                <button className='py-2 px-8 border bg-secondary rounded-4xl border-secondary text-primary cursor-pointer hover:bg-secondary/90'>Guardar</button>
                {/* <Link to={'/admin/usuarios'}><button className='py-2 px-8 border bg-primary rounded-4xl border-secondary text-secondary cursor-pointer'>Cancelar</button></Link> */}
            </div>
        </form>
    )
}
