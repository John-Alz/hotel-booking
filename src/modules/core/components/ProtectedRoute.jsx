import { Navigate } from 'react-router-dom'
import { extractRole, hasRole, isAuth } from '../utils/auth'

export const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!isAuth()) return <Navigate to="/auth/login" replace />
    if (!hasRole(allowedRoles)) return <Navigate to="/" replace />
    extractRole();

    return children
}
