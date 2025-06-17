
import { Navigate, Route, Routes } from 'react-router-dom'
import { HomeRouter } from '../modules/home/routes/HomeRouter'
import { RoomsRouter } from '../modules/rooms/routes/RoomsRouter'
import { AuthRoutes } from '../modules/auth/routes/AuthRoutes'
import { AdminLayout } from '../modules/layouts/AdminLayout'
import { Test } from '../modules/core/components/Test'
import { RoomTable } from '../modules/rooms/components/RoomTable'
import { RoomTableTwo } from '../modules/rooms/components/RoomTableTwo'
import { RoomCreatePage } from '../modules/rooms/pages/RoomCreatePage'
import { RoomTablePage } from '../modules/rooms/pages/RoomTablePage'
import { RoomEditPage } from '../modules/rooms/pages/RoomEditPage'
import { BookingTablePage } from '../modules/booking/pages/BookingTablePage'
import { BookingCreatePage } from '../modules/booking/pages/BookingCreatePage'
import { BookingEditPage } from '../modules/booking/pages/BookingEditPage'
import { RoomsSingleTablePage } from '../modules/roomsSingle/pages/RoomsSingleTablePage'

export const AppRouter = () => {
    return (
        <Routes>
            <Route path='/auth/*' element={<AuthRoutes />} />
            <Route path='/' element={<HomeRouter />} />
            <Route path='/rooms/*' element={<RoomsRouter />} />

            {/* Admin layout routes */}

            <Route path='/admin' element={<AdminLayout />}>
                <Route index element={<Navigate to='dashboard' replace />} />
                <Route path="dashboard" element={<Test />} />
                <Route path="reservas" element={<BookingTablePage />} />
                <Route path="crear-reserva" element={<BookingCreatePage />} />
                <Route path="editar-reserva/:id" element={<BookingEditPage />} />
                <Route path="usuarios" element={<Test />} />
                <Route path="tipos-habitacion" element={<RoomTablePage />} />
                <Route path="crear-tipo-habitacion" element={<RoomCreatePage />} />
                <Route path="tipo-habitacion/:id" element={<RoomEditPage />} />
                <Route path="habitaciones" element={<RoomsSingleTablePage />} />
                <Route path="amenidades" element={<Test />} />
            </Route>

        </Routes>
    )
}
