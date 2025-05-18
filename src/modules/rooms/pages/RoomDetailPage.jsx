import React from 'react'
import { Header } from '../../core/components/Header'
import { Footer } from '../../core/components/Footer'
import { RoomDetail } from '../components/RoomDetail'

export const RoomDetailPage = () => {
    return (
        <>
            <div>
                <Header />
                <RoomDetail />
            </div>
            <Footer />
        </>
    )
}
