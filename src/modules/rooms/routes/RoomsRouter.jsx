import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { RoomListPage } from '../pages/RoomListPage'

export const RoomsRouter = () => {
    return (
        <Routes>
            {/* <Route path='/room/:id' element={<RoomDetailPage />} /> */}
            <Route path='/list' element={<RoomListPage />} />
        </Routes>
    )
}
