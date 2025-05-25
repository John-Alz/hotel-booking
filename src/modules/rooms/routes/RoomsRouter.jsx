import { Route, Routes } from 'react-router-dom'
import { RoomListPage } from '../pages/RoomListPage'
import { RoomDetailPage } from '../pages/RoomDetailPage'

export const RoomsRouter = () => {
    return (
        <Routes>
            <Route path='/room/:id' element={<RoomDetailPage />} />
            <Route path='/list' element={<RoomListPage />} />
        </Routes>
    )
}
