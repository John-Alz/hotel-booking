import { useEffect } from "react";
import useCancellationStore from "../store/useCancellationStore"
import { useDateFormat } from "../../rooms/helpers/DateFormat";
import { ScrollArea } from "@/components/ui/scroll-area"

export const CancellationDetailsPage = ({ cancellationId }) => {

    console.log(cancellationId);

    const fetchCancellation = useCancellationStore(state => state.fetchCancellation);
    const cancellation = useCancellationStore(state => state.cancellationSelected);

    useEffect(() => {
        fetchCancellation(cancellationId)
    }, [])

    console.log(cancellation);

    const dateCancellation = useDateFormat(cancellation?.dateOfCancellation, true)
    const checkin = useDateFormat(cancellation?.boooking?.checkInDate, true)
    const checkout = useDateFormat(cancellation?.boooking?.checkOutDate, true)


    return (
        // <ScrollArea className="h-full w-full rounded-md border p-4 pb-5">
        <section className="flex flex-col gap-4 mb-12">
            <div>

                <div className="border rounded-2xl p-4">
                    <h2 className='font-bold text-xl'>Datos de la cancelación</h2>
                    <article className="flex flex-col gap-2 mt-4">
                        <div className="flex justify-between">
                            <p className="font-medium">Fecha de cancelacion</p>
                            <span>{dateCancellation}</span>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-medium">Motivo de cancelacion</p>
                            <span>{cancellation?.reasonForCancellation}</span>
                        </div>
                    </article>
                </div>
            </div>
            <div>
                <div className="border rounded-2xl p-4">
                    <h2 className='font-bold text-xl'> Usuario que canceló </h2>
                    <article className="flex flex-col gap-2 mt-4">
                        <div className="flex justify-between">
                            <p className="font-medium">Nombre del usuario</p>
                            <span>{cancellation?.user?.name} {cancellation?.user?.lastName}</span>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-medium">Rol del usuairo</p>
                            <span>{cancellation?.user?.role?.roleEnum}</span>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-medium">Email del usuairo</p>
                            <span>{cancellation?.user?.email}</span>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-medium">Telefono del usuairo</p>
                            <span>{cancellation?.user?.phoneNumber}</span>
                        </div>
                    </article>
                </div>

            </div>
            <div>
                <div className="border rounded-2xl p-4">
                    <h2 className='font-bold text-xl'>Datos de la reserva asociada</h2>
                    <article className="flex flex-col gap-2 mt-4">
                        <div className="flex justify-between">
                            <p className="font-medium">Estado de la reserva</p>
                            <span className="bg-red-500 rounded-2xl  px-2 py-1">{cancellation?.boooking?.status}</span>
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
                            <span>X{cancellation?.boooking?.numberOfRoom}</span>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-medium">Precio de la reserva</p>
                            <span>${cancellation?.boooking?.totalPrice}</span>
                        </div>

                    </article>
                </div>

            </div>
            <div>
                <div className="border rounded-2xl p-4">
                    <h2 className='font-bold text-xl'>Datos del cliente asociado</h2>
                    <article className="flex flex-col gap-2 mt-4">
                        <div className="flex justify-between">
                            <p className="font-medium">Nombre del usuario</p>
                            <span>{cancellation?.boooking?.client?.name} {cancellation?.boooking?.client?.lastName}</span>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-medium">Email del usuairo</p>
                            <span>{cancellation?.boooking?.client?.email}</span>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-medium">Telefono del usuairo</p>
                            <span>{cancellation?.boooking?.client?.phoneNumber}</span>
                        </div>
                    </article>
                </div>

            </div>
            <div>
                <div className="border rounded-2xl p-4">
                    <h2 className='font-bold text-xl'>Información del tipo de habitación reservada</h2>
                    <article className="flex flex-col gap-2 mt-4">
                        <div className="flex justify-between">
                            <p className="font-medium">Nombre de la habitacion</p>
                            <span>{cancellation?.boooking?.RoomType?.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-medium">Precio/noche de la habitacion</p>
                            <span>${cancellation?.boooking?.RoomType?.price}</span>
                        </div>
                    </article>
                </div>

            </div>
        </section>
        // </ScrollArea>
    )
}
