import image1 from '../../../../public/images/img-bento-1.avif'
import image2 from '../../../../public/images/img-bento-2.avif'
import image3 from '../../../../public/images/img-bento-3.avif'
import image4 from '../../../../public/images/img-bento-4.avif'
import image5 from '../../../../public/images/img-bento-5.avif'
import image6 from '../../../../public/images/img-bento-6.avif'

export const GaleryBento = () => {
    return (
        <section className='w-[95%] m-auto font-medium text-lg'>
            <h3>Galeria de imagenes</h3>
            <div className="grid grid-cols-4 md:grid-cols-4 grid-rows-4 md:grid-rows-3 gap-4 md:gap-4 m-4">
                <div className="col-start-1 row-start-1 row-span-4 md:col-start-1 md:row-start-1 md:col-span-1 md:row-span-3 bg-gray-300 rounded-4xl ">
                    <img src={image1} alt="Descripción" className='rounded-4xl h-full object-cover' />
                </div>
                <div className="col-start-2 row-start-1 row-span-2 md:col-start-2 md:row-start-1 md:col-span-1 md:row-span-2 bg-gray-300 rounded-4xl">
                    <img src={image2} alt="Descripción" className='rounded-4xl h-full object-cover' />
                </div>
                <div className="col-start-2 row-start-3 row-span-2 md:col-start-2 md:row-start-3 md:col-span-1 md:row-span-1 bg-gray-300 rounded-4xl">
                    <img src={image3} alt="Descripción" className='rounded-4xl h-[165px] w-full object-cover' />
                </div>
                <div className="col-start-3 row-start-1 row-span-4 md:col-start-3 md:row-start-1 md:col-span-1 md:row-span-3 bg-gray-300 rounded-4xl">
                    <img src={image5} alt="Descripción" className='rounded-4xl h-full object-cover' />
                </div>
                <div className="col-start-4 row-start-1 row-span-2 md:col-start-4 md:row-start-1 md:col-span-1 md:row-span-1 bg-gray-300 rounded-4xl">
                    <img src={image4} alt="Descripción" className='rounded-4xl h-[165px] w-full object-cover' />
                </div>
                <div className="col-start-4 row-start-3 row-span-2 md:col-start-4 md:row-start-2 md:col-span-1 md:row-span-2 bg-gray-300 rounded-4xl">
                    <img src={image6} alt="Descripción" className='rounded-4xl  h-full object-cover' />
                </div>
            </div>
        </section>
    )
}
