import React from 'react'
import { Header } from '../../core/components/Header'
import { Hero } from '../components/Hero'
import { GaleryBento } from '../components/GaleryBento'
import { Footer } from '../../core/components/Footer'
import { Newsletter } from '../components/Newsletter'
import { ToastContainer } from 'react-toastify'

export const HomePage = () => {
    return (
        <>
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
