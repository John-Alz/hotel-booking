
import { Navigate, Route, Routes } from 'react-router-dom'
import { HomeRouter } from '../modules/home/routes/HomeRouter'
import { RoomsRouter } from '../modules/rooms/routes/RoomsRouter'
import { AuthRoutes } from '../modules/auth/routes/AuthRoutes'
import { AdminLayout } from '../modules/layouts/AdminLayout'
import { Test } from '../modules/core/components/Test'

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
                <Route path="habitaciones" element={<Test />} />
                <Route path="reservas" element={<Test />} />
                <Route path="usuarios" element={<Test />} />
                <Route path="tipos-habitacion" element={<Test />} />
                <Route path="amenidades" element={<Test />} />
            </Route>

        </Routes>
    )
}
