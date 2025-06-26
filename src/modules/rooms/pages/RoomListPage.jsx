import React from 'react'
import { Header } from '../../core/components/Header'
import { Footer } from '../../core/components/Footer'
import { FormSearchList } from '../components/FormSearchList'
import { FiltersList } from '../components/FiltersList'
import { RoomList } from '../components/RoomList'

export const RoomListPage = () => {
    return (
        <>
            <div className=''>
                <Header />
                <section className='w-full border-t-2 border-border flex'>
                    <div className='hidden lg:block lg:w-[25%]  xl:w-[30%]'>
                        <FormSearchList />
                        <FiltersList />
                    </div>
                    <div className=' w-full border-l-2 border-border  xl:w-[70%]'>
                        <RoomList />
                    </div>
                </section>
            </div>
            <Footer />
        </>
    )
}
