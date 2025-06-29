
import { Navigate, Route, Routes } from 'react-router-dom'
import { HomeRouter } from '../modules/home/routes/HomeRouter'
import { RoomsRouter } from '../modules/rooms/routes/RoomsRouter'
import { AuthRoutes } from '../modules/auth/routes/AuthRoutes'
import { AdminLayout } from '../modules/layouts/AdminLayout'
import { Test } from '../modules/core/components/Test'
import { RoomCreatePage } from '../modules/rooms/pages/RoomCreatePage'
import { RoomTablePage } from '../modules/rooms/pages/RoomTablePage'
import { RoomEditPage } from '../modules/rooms/pages/RoomEditPage'
import { BookingTablePage } from '../modules/booking/pages/BookingTablePage'
import { BookingCreatePage } from '../modules/booking/pages/BookingCreatePage'
import { BookingEditPage } from '../modules/booking/pages/BookingEditPage'
import { RoomsSingleTablePage } from '../modules/roomsSingle/pages/RoomsSingleTablePage'
import { UsersTablePage } from '../modules/users/pages/UsersTablePage'
import { CancellationsTablePage } from '../modules/cancellations/pages/CancellationsTablePage'
import { PanelPage } from '../modules/panel/pages/PanelPage'
import { PaymentTablePage } from '../modules/payments/pages/PaymentTablePage'
import { ProtectedRoute } from '../modules/core/components/ProtectedRoute'

export const AppRouter = () => {
    return (
        <Routes>
            <Route path='/auth/*' element={<AuthRoutes />} />
            <Route path='/' element={<HomeRouter />} />
            <Route path='/rooms/*' element={<RoomsRouter />} />

            {/* Admin layout routes */}

            <Route path='/admin' element={<ProtectedRoute allowedRoles={["ADMINISTRADOR", "RECEPCIONISTA"]}><AdminLayout /></ProtectedRoute>}>
                <Route index element={<Navigate to='dashboard' replace />} />
                <Route path="dashboard" element={<PanelPage />} />
                <Route path="reservas" element={<BookingTablePage />} />
                <Route path="reservas/crear-reserva" element={<ProtectedRoute allowedRoles={["ADMINISTRADOR", "RECEPCIONISTA"]}><BookingCreatePage /></ProtectedRoute>} />
                <Route path="reservas/editar-reserva/:id" element={<BookingEditPage />} />
                <Route path="tipos-habitacion" element={<RoomTablePage />} />
                <Route path="tipos-habitacion/crear-tipo-habitacion" element={<ProtectedRoute allowedRoles={["ADMINISTRADOR"]}><RoomCreatePage /></ProtectedRoute>} />
                <Route path="tipos-habitacion/tipo-habitacion/:id" element={<RoomEditPage />} />
                <Route path="habitaciones" element={<RoomsSingleTablePage />} />
                <Route path="amenidades" element={<Test />} />

                <Route path="usuarios" element={<UsersTablePage />} />
                <Route path="cancelaciones" element={<CancellationsTablePage />} />
                <Route path="pagos" element={<PaymentTablePage />} />

            </Route>

        </Routes>
    )
}
