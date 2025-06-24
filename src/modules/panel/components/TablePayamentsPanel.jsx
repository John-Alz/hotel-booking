import React, { useEffect } from 'react'
import usePaymentStore from '../../payments/store/usePaymentStore'
import { ScrollArea } from "@/components/ui/scroll-area"

export const TablePayamentsPanel = () => {

    const fetchPayments = usePaymentStore(state => state.fetchPayments);
    const payments = usePaymentStore(state => state.payments);

    useEffect(() => {
        fetchPayments();
    }, [])
    console.log(payments);


    return (
        <div className='bg-primary rounded-2xl p-4 flex flex-col gap-2 border h-[389px]'>
            <div>
                <h2 className='text-lg font-bold'>Pagos recientes</h2>
                <p className='text-black-opacity'>Tienes {payments?.content?.length} pagos en el ultimo mes</p>
            </div>
            <section className='flex flex-col gap-2 '>
                <ScrollArea className="h-[300px] w-full  rounded-md ">
                    {
                        payments?.content?.map(item => (
                            <article className='flex  justify-between'>
                                <div className='flex gap-3 '>
                                    <div className='flex items-center'>
                                        <p className='border bg-black border-black px-4 py-2.5 rounded-full text-white text-center'>
                                            {item.booking.clientId.username.slice(0, 1)}</p>
                                    </div>
                                    <div>
                                        <p>{item.booking.clientId.username} {item.booking.clientId.lastName}</p>
                                        <p className='text-black-opacity'>{item.booking.clientId.email}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className='font-bold'>+${item.booking.totalPrice}</p>
                                </div>
                            </article>
                        ))
                    }
                </ScrollArea>
            </section>
        </div>
    )
}
