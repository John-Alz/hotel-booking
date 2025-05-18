
let methods = [
    {
        id: 1,
        name: 'pse',
        img: '/public/images/pse.DI93t2RW.svg'
    }, {
        id: 2,
        name: 'visa',
        img: '/public/images/visa.sxIq5Dot.svg'
    },
    {
        id: 3,
        name: 'masterCard',
        img: '/public/images/master.CzeoQWmc.svg'
    },
    {
        id: 4,
        name: 'mercadoPago',
        img: '/public/images/mercadopago.CtkrQEED.svg'
    },
]


export const PaymentData = () => {
    return (
        <section className='py-10 '>
            <div >
                <h2 className='text-xl font-semibold '>Paso 3: Detalles de pago</h2>
                <p className='text-[14px]'>Todas las transacciones son seguras y están encriptadas.</p>
            </div>
            <article className='flex justify-between border-2 py-2 px-3 rounded-2xl mt-3'>
                <div className='flex gap-4'>
                    <input type='radio' checked />
                    <p>PSE, Efecty y Billetera Mercado Pago</p>
                </div>
                <div className='flex gap-2'>
                    {
                        methods.map((item) => (
                            <img key={item.id} src={item.img} width={35} alt={item.name} />
                        ))
                    }
                </div>
            </article>
            <div className='text-[14px] bg-gray-custom mt-2 rounded-2xl'>
                <p className='px-30 py-10 text-center'>Después de hacer clic en “Pagar ahora”, serás redirigido a PSE, Efecty y Billetera Mercado Pago para completar tu compra de forma segura.</p>
            </div>
        </section>

    )
}
