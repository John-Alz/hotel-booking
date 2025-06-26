import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginForm } from '../components/LoginForm'
import { SignUpForm } from '../components/SignUpForm'
import { EmailResetPasswordForm } from '../components/EmailResetPasswordForm'
import { NewPasswordForm } from '../components/NewPasswordForm'

export const AuthRoutes = () => {
    return (
        <Routes>
            <Route path='/login' element={<LoginForm />} />
            <Route path='/sign-up' element={<SignUpForm />} />
            <Route path='/email-request' element={<EmailResetPasswordForm />} />
            <Route path='/new-password' element={<NewPasswordForm />} />
            <Route path='/*' element={<Navigate to="/" />} />
        </Routes>
    )
}