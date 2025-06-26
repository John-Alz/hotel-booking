import { useEffect } from "react";
import { useDateFormat } from "../../rooms/helpers/DateFormat";
import { ScrollArea } from "@/components/ui/scroll-area"
import usePaymentStore from "../store/usePaymentStore";
import { totalPrice } from "../../rooms/helpers/totalPrice";
import { CircleX, X } from "lucide-react";

export const PaymentDetailPage = ({ paymentId }) => {

    console.log(paymentId);

    const fetchPayment = usePaymentStore(state => state.fetchPayment);
    const paymentSelected = usePaymentStore(state => state.paymentSelected);

    useEffect(() => {
        fetchPayment(paymentId)
    }, [])

    console.log(paymentSelected);

    const datePayment = useDateFormat(paymentSelected?.created_at, false)
    const checkin = useDateFormat(paymentSelected?.booking?.checkInDate, false)
    const checkout = useDateFormat(paymentSelected?.booking?.checkOutDate, false)
    const { nights } = totalPrice(paymentSelected?.booking?.checkInDate, paymentSelected?.booking?.checkOutDate)
    console.log(nights);

    //

    return (
        <div>
            <article className="bg-[#F5F4F7] rounded-2xl mt-5 mb-12 flex justify-between items-center p-5">
                <div className="flex fel items-center gap-2 ">
                    <p className='border bg-black border-black py-2.5 px-4  rounded-full text-white'>{paymentSelected?.booking?.clientId?.username?.slice(0, 1)} </p>
                    <span className="font-medium text-lg">{paymentSelected?.booking?.clientId?.email}</span>
                </div>
                <p className="">{datePayment}</p>
            </article>
            <section className="flex flex-col gap-4 mb-12 border rounded-2xl">
                <div className="flex justify-between border-b p-4">
                    <span className="font-medium">{paymentSelected?.booking?.clientId?.username} {paymentSelected?.booking?.clientId.lastName}</span>
                    <div className="flex flex-col">
                        <span className="font-medium">{checkin} - {checkout}</span>
                        <span className="text-end">{nights} Noches</span>
                    </div>
                </div>



                <div className="flex flex-col gap-4 border-b pb-4 px-4 text-black/70">
                    <div className="flex justify-between">
                        <span className="font-medium">Habitacion</span>
                        <div className="flex flex-col">
                            <span className="font-medium">{paymentSelected?.booking?.roomType?.name}</span>
                            <div className="flex justify-end items-center">
                                <X />
                                <span className="text-end font-bold">{paymentSelected?.booking?.numberOfRoom}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium">Precio XNoche</span>
                        <div className="flex flex-col">
                            <span className="font-medium">${paymentSelected?.booking?.roomType?.price}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 border-b pb-4 px-4">

                    <div className="w-full flex justify-between">
                        <span className="font-medium text-black/70">Total de la reserva</span>
                        <div className="flex flex-col">
                            <span className="font-medium text-black/70">${paymentSelected?.amount - 20000}</span>
                        </div>
                    </div>
                    <div className="w-full flex justify-between">
                        <span className="font-medium text-black/70">Tarifa de servicio</span>
                        <div className="flex flex-col">
                            <span className="font-medium text-black/70">$20.000</span>
                        </div>
                    </div>
                </div>
                <div className="flex border-b pb-4 px-4">
                    <div className="w-full flex justify-between">
                        <span className="font-medium text-black/70">Total pagado</span>
                        <div className="flex flex-col">
                            <span className="font-medium text-black/70">${paymentSelected?.amount}</span>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between gap-4 border-b p-4 text-black/70">
                    <span className="font-medium">Estado del pago</span>
                    <div className="flex flex-col">
                        <span className="bg-green-400 px-2 rounded-full text-green-900 font-medium">{paymentSelected?.status}</span>
                    </div>
                </div>

                {/* <div>
                    <h2 className='font-bold text-xl'>Datos del pago</h2>
                    <article className="flex flex-col gap-2 mt-4">
                        <div className="flex justify-between">
                            <p className="font-medium">Fecha de pago</p>
                            <span>{datePayment}</span>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-medium">Id del pago</p>
                            <span>{paymentSelected?.preference_id}</span>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-medium">Esrtado del pago</p>
                            <span className="bg-green-400 px-2 rounded-full text-green-900">{paymentSelected?.status}</span>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-medium">Toatal pagado</p>
                            <span >${paymentSelected?.amount}</span>
                        </div>
                    </article>
                </div>

                <div>
                    <h2 className='font-bold text-xl'>Cliente asociado</h2>
                    <article className="flex flex-col gap-2 mt-4">
                        <div className="flex justify-between">
                            <p className="font-medium">Nombre del usuario</p>
                            <span>{paymentSelected?.booking?.clientId?.username} {paymentSelected?.booking?.clientId.lastName}</span>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-medium">Email del usuairo</p>
                            <span>{paymentSelected?.booking?.clientId?.email}</span>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-medium">Telefono del usuairo</p>
                            <span>{paymentSelected?.booking?.clientId?.phoneNumber}</span>
                        </div>
                    </article>
                </div>
                <div>
                    <h2 className='font-bold text-xl'>Datos de la reserva asociada</h2>
                    <article className="flex flex-col gap-2 mt-4">
                        <div className="flex justify-between">
                            <p className="font-medium">Estado de la reserva</p>
                            <span>{paymentSelected?.booking?.status}</span>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-medium">CheckIn de reserva</p>
                            <span>{checkin}</span>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-medium">CheckOut de reserva</p>
                            <span>{checkout}</span>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-medium">Numero de habitaciones</p>
                            <span>X{paymentSelected?.booking?.numberOfRoom}</span>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-medium">Precio de la reserva</p>
                            <span>${paymentSelected?.booking?.totalPrice}</span>
                        </div>

                    </article>
                </div>
                <div>
                    <h2 className='font-bold text-xl'>Información del tipo de habitación reservada</h2>
                    <article className="flex flex-col gap-2 mt-4">
                        <div className="flex justify-between">
                            <p className="font-medium">Nombre de la habitacion</p>
                            <span>{paymentSelected?.booking?.roomType?.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-medium">Precio/noche de la habitacion</p>
                            <span>${paymentSelected?.booking?.roomType?.price}</span>
                        </div>
                    </article>
                </div> */}
            </section>
        </div>
    )
}
