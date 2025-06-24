import { useEffect } from "react";
import { ToastContainer } from "react-toastify"
import { Eye, Plus, Search } from "lucide-react";
import { Button } from '../../../components/ui/button';
import { Input } from "@/components/ui/input"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"


import usePagination from "../../core/store/userPagination";
import usePaymentStore from "../store/usePaymentStore";
import { FiltersTablePayment } from "./FiltersTablePayment";
import { Link } from "react-router-dom";
import { Pagination } from "../../core/components/Pagination";
import { CancellationDetailsPage } from "../../cancellations/pages/CancellationDetailsPage";

export const PaymentTable = () => {

    const fetchPayments = usePaymentStore(state => state.fetchPayments);
    const payments = usePaymentStore(state => state.payments);
    const filtersPayments = usePaymentStore(state => state.filtersPayments);


    const { page } = usePagination();


    useEffect(() => {
        fetchPayments(page, filtersPayments);
    }, [page, filtersPayments])


    const onChange = (e) => {
        const value = e.target.value;
        fetchPayments(page, filtersPayments, value)
    }

    return (
        <div className='flex flex-col gap-7 mb-18' >
            <ToastContainer />
            <div className='flex justify-between items-center rounded-2xl '>
                <div className='w-[40%]  relative'>
                    {/* <input type='text' placeholder='Busca aqui' className='bg-[#F2F2F2] py-2 px-2 rounded-lg w-100' /> */}
                    <Input className="bg-primary rounded-lg h-[40px]" name="email" onChange={onChange} placeholder='Busca por numero de reserva' />
                    <Search color='#737373' className='absolute right-0 top-2 mx-2' />
                </div>
                <div className='flex gap-8 '>
                    <FiltersTablePayment />
                    <Link to={'/admin/reservas'}><Button ><Plus /> Cancelar una reserva</Button></Link>
                </div>

            </div>
            {
                payments?.content?.length > 0 ? <table className='min-w-full  text-base font-light text-surface bg-gray rounded-2xl bg-primary table-auto w-full'>
                    <thead className=" border-b border-[#ced4da] bg-[#ced4da]/35 rounded-xl justify-between">
                        <tr>
                            {/* <th className="px-6 py-3 text-start text-sm font-bold ">ID</th> */}
                            {/* <th className="px-6 py-3 text-start text-sm font-bold ">ID</th> */}
                            <th className="px-6 py-3 text-start text-sm font-bold ">N. reserva</th>
                            <th className="px-6 py-3 text-start text-sm font-bold ">Nombre del cliente</th>
                            <th className="px-6 py-3 text-start text-sm font-bold ">Correo del cliente</th>
                            <th className="px-6 py-3 text-start text-sm font-bold ">Fecha del pago</th>
                            {/* <th className="px-6 py-3 text-start text-sm font-bold ">Motivo</th> */}
                            <th className="px-6 py-3 text-start text-sm font-bold ">tipo de habitación</th>
                            <th className="px-6 py-3 text-start text-sm font-bold ">Precio total</th>
                            <th className="px-6 py-3 text-start text-sm font-bold ">Estado</th>
                            <th className="px-6 py-3 text-start text-sm font-bold ">Acciones</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <td colSpan="8">
                                <Pagination data={payments} />
                            </td>
                        </tr>
                    </tfoot>
                    <tbody className='font-medium'>
                        {
                            payments?.content?.map(item => (
                                <tr className='hover:bg-grayDark border-b border-[#ced4da]'>
                                    <td className='px-6 py-4 text-sm'>{item.booking.reservationNumber}</td>
                                    <td className='px-6 py-4 text-sm'>
                                        <div className='flex gap-3 items-center'>
                                            <p className='border bg-black border-black px-4 py-2.5 rounded-full text-white text-center'>
                                                {item.booking.clientId.username != null ? item.booking.clientId.username.slice(0, 1) : item.booking.clientId.username.slice(0, 1)}
                                            </p>
                                            {item.booking.clientId.username} {item.booking.clientId.lastName}
                                        </div>
                                    </td>
                                    <td className='px-6 py-4 text-sm'>{item.booking.clientId.email != null ? item.booking.clientId.email : item.booking.email}</td>
                                    <td className='px-6 py-4 text-sm'>{item.booking.bookingDate.slice(0, 10)}</td>
                                    <td className='px-6 py-4 text-sm'>{item.booking.roomType.name}</td>
                                    <td className='px-6 py-4 text-sm'>${item.booking.totalPrice}</td>

                                    <td className='px-6 py-4 text-sm'>
                                        <p className=' bg-green-400 py-1 px-1.5 rounded-3xl text-center'>{item.status}</p>
                                    </td>
                                    <td className='px-6 py-4 text-sm'>
                                        <div className='flex items-center justify-center gap-4  text-sm'>
                                            <div className='flex gap-8'>
                                                {/* <Link to={'/admin/crear-habitacion'}><Button ><Plus /> Crear una habitacion</Button></Link> */}
                                                <Dialog className='bg-red-500'>
                                                    <DialogTrigger><button className="text-blue-500 cursor-pointer"><Eye /></button></DialogTrigger>
                                                    <DialogContent className="h-full w-[600px] translate-x-0 right-0">
                                                        <DialogHeader>
                                                            <DialogTitle><h2 className="text-xl">Cancelacion - reserva #73467364</h2></DialogTitle>
                                                        </DialogHeader>
                                                        <ScrollArea className="h-full w-ffull rounded-md p-4 scrollbar-none">
                                                            <CancellationDetailsPage cancellationId={item.id} />
                                                        </ScrollArea>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>

                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table> :

                    <h2 className="text-red-400 font-bold text-2xl text-center">No hay pagos.</h2>
            }

        </div>
    )
}
