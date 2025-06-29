import React from 'react'
import { Header } from '../../core/components/Header'
import { Hero } from '../components/Hero'
import { GaleryBento } from '../components/GaleryBento'
import { Footer } from '../../core/components/Footer'
import { Newsletter } from '../components/Newsletter'
import { ToastContainer } from 'react-toastify'
import useAuthStore from '../../auth/store/useAuthStore'

export const HomePage = () => {

    return (
        <>
            <ToastContainer />
            <div >
                <Header />
                <Hero />
                <GaleryBento />
                <Newsletter />
            </div>
            <Footer />
        </>
    )
}
