import React, { useEffect, useState } from 'react'
import useUsersStore from '../store/useUsersStore'

import { Button } from '../../../components/ui/button';
import { Input } from "@/components/ui/input"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Edit3, Plus, Search, Trash2 } from 'lucide-react';
import { FiltersTable } from '../../rooms/components/FiltersTable';
import { Link } from 'react-router-dom';
import { UsersEditPage } from '../pages/UsersEditPage';
import { ToastContainer } from 'react-toastify';
import { api } from '../../../shared/api/apiClient';
import { notifyService } from '../../core/services/notifyService';

export const UsersTable = () => {
    // const [filtersUsers, setFiltersUsers] = useState('')

    const users = useUsersStore(state => state.users);
    const fetchUsers = useUsersStore(state => state.fetchUsers);
    const filtersUsers = useUsersStore(state => state.filtersUsers);
    const setFiltersUsers = useUsersStore(state => state.setFiltersUsers);

    useEffect(() => {
        fetchUsers(filtersUsers);
    }, [filtersUsers])

    const onChange = (e) => {
        console.log(e.target.value);
        console.log(e.target.name);
        let value = e.target.value;
        let name = e.target.name;
        let newFilters = {
            ...filtersUsers,
            [name === "email" ? "email" : "role"]: value
        }
        setFiltersUsers(newFilters);
    }

    const deleteUser = async (id) => {

        try {
            const response = await api.delete(`/api/v1/users/${id}`);
            console.log(response);

            switch (response.status) {
                case 200:
                    notifyService.success(response.data.message);
                    fetchUsers(filtersUsers);
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


    return (
        <div className='flex flex-col gap-7 mb-18' >
            <ToastContainer />
            <div className='flex justify-between items-center py-4 px-1 rounded-2xl '>
                <div className='w-[400px] relative'>
                    {/* <input type='text' placeholder='Busca aqui' className='bg-[#F2F2F2] py-2 px-2 rounded-lg w-100' /> */}
                    <Input className="bg-primary rounded-3xl h-[40px]" name="email" onChange={onChange} placeholder='Busca por email' />
                    <Search color='#737373' className='absolute right-0 top-2 mx-2' />
                </div>
                <div className='flex gap-8 '>
                    <div>
                        {/* <h2>Tipos de habitacion</h2> */}
                        <div className='w-[100%] flex justify-around bg-primary shadow-sm py-3 px-2 gap-5 rounded-2xl text-[14px]'>
                            <Button onClick={onChange} name="role" value="" variant={filtersUsers.role === "" ? 'default' : 'filters'} >
                                Ver todos
                            </Button>
                            <Button onClick={onChange} name="role" value="ADMINISTRADOR" variant={filtersUsers.role === "ADMINISTRADOR" ? 'default' : 'filters'} >
                                Administradores
                            </Button>
                            <Button onClick={onChange} name="role" value="RECEPCIONISTA" variant={filtersUsers.role === "RECEPCIONISTA" ? 'default' : 'filters'}>
                                Recepcionistas
                            </Button>
                            <Button onClick={onChange} name="role" value="CLIENTE" variant={filtersUsers.role === "CLIENTE" ? 'default' : 'filters'}>
                                Clientes
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <table className='min-w-full  text-base font-light text-surface bg-gray rounded-2xl bg-primary table-auto w-full'>
                <thead className=" border-b border-[#ced4da] bg-[#ced4da]/35 rounded-xl justify-between">
                    <tr>
                        {/* <th className="px-6 py-3 text-start text-sm font-bold ">ID</th> */}
                        <th className="px-6 py-3 text-start text-sm font-bold ">ID</th>
                        <th className="px-6 py-3 text-start text-sm font-bold ">Nombre</th>
                        <th className="px-6 py-3 text-start text-sm font-bold ">Apellido</th>
                        <th className="px-6 py-3 text-start text-sm font-bold ">Telefono</th>
                        <th className="px-6 py-3 text-start text-sm font-bold ">Email</th>
                        <th className="px-6 py-3 text-start text-sm font-bold ">Rol</th>
                        <th className="px-6 py-3 text-start text-sm font-bold ">Acciones</th>
                    </tr>
                </thead>
                <tbody className='font-medium'>
                    {
                        users?.content?.map(item => (
                            <tr className='hover:bg-grayDark border-b border-[#ced4da]'>
                                <td className='px-6 py-4 text-sm'>{item.id}</td>
                                {/* <td className='px-6 py-4 text-sm'>R-223971</td> */}
                                {/* <td className='px-6 py-4 text-sm'>
                                    <div>
                                        <img src={item.images[0]} alt={item.name} className='w-[112px] h-[75px] rounded-2xl' />
                                    </div>
                                </td> */}
                                <td className='px-6 py-4 text-sm'>
                                    <div className='flex gap-3 items-center'>
                                        <p className='border bg-black border-black px-4 py-2.5 rounded-full text-white text-center'>
                                            {item.name != null ? item.name.slice(0, 1) : item.name.slice(0, 1)}</p>
                                        {item.name != null ? item.name : item.name}
                                    </div>
                                </td>
                                <td className='px-6 py-4 text-sm'>{item.lastName}</td>
                                <td className='px-6 py-4 text-sm'>{item.phoneNumber}</td>
                                {/* <td className='px-6 py-4 text-sm'>{item.bookingDate.slice(0, 10)}</td> */}
                                <td className='px-6 py-4 text-sm'>
                                    <p className=' text-sm'>{item.email}</p>
                                </td>
                                <td className='px-6 py-4 text-sm'>
                                    <p className={` 
                                    ${item.role.roleEnum === "ADMINISTRADOR" ? 'bg-btn-admin' : ''} 
                                    ${item.role.roleEnum === "CLIENTE" ? 'bg-red-400' : ''}
                                    ${item.role.roleEnum === "RECEPCIONISTA" ? 'bg-green-400' : ''} text-primary text-center w-[140px] py-1 px-1.5 rounded-3xl`}>{item.role.roleEnum}</p>
                                </td>
                                {/* <td className='px-6 py-4 text-sm'>
                                    <div className='flex gap-3 items-center'>
                                        <DoorOpen />
                                        {item.numberOfRoom}
                                    </div>
                                </td> */}
                                {/* <td className='px-6 py-4 text-sm'>
                                    <p className='bg-[#10A760] py-1.5 px-3 rounded-xl text-center text-primary'>{item.name}</p>
                                </td> */}
                                <td className='px-6 py-4 text-sm'>
                                    <div className='flex items-center gap-4  text-sm'>
                                        <div className='flex gap-8'>
                                            {/* <Link to={'/admin/crear-habitacion'}><Button ><Plus /> Crear una habitacion</Button></Link> */}
                                            <Dialog>
                                                <DialogTrigger><button className="text-blue-500 cursor-pointer"><Edit3 /></button></DialogTrigger>
                                                <DialogContent className="left-[50%]">
                                                    <DialogHeader>
                                                        <DialogTitle>Detalles del usuario</DialogTitle>
                                                    </DialogHeader>
                                                    <UsersEditPage userId={item.id} />
                                                </DialogContent>
                                            </Dialog>
                                        </div>

                                        <AlertDialog>
                                            <AlertDialogTrigger><button className="text-red-500 cursor-pointer"><Trash2 /></button></AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Estas seguro que quieres eliminar este usuario?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Esta acción no se puede deshacer. Toda la información relacionada con este usuario se perderá permanentemente.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => deleteUser(item.id)}>Confirmar</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>

                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
