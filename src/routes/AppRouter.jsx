
import { Route, Routes } from 'react-router-dom'
import { HomeRouter } from '../modules/home/routes/HomeRouter'
import { RoomsRouter } from '../modules/rooms/routes/RoomsRouter'
import { AuthRoutes } from '../modules/auth/routes/AuthRoutes'

export const AppRouter = () => {
    return (
        <Routes>
            <Route path='/auth/*' element={<AuthRoutes />} />
            <Route path='/' element={<HomeRouter />} />
            <Route path='/rooms/*' element={<RoomsRouter />} />
        </Routes>
    )
}
