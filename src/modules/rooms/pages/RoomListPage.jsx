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
                    <div className='w-[30%]'>
                        <FormSearchList />
                        <FiltersList />
                    </div>
                    <div className='w-[70%] border-l-2 border-border'>
                        <RoomList />
                    </div>
                </section>
            </div>
            <Footer />
        </>
    )
}
