import { ErrorAuthPage } from '@auth/pages/ErrorAuthPage'
import { AuthenticationPage } from '@auth/pages/AuthenticationPage'
import { action as authAction } from '@auth/services/authService'

const authRoutes = {
    path: 'auth',
    element: <AuthenticationPage />,
    errorElement: <ErrorAuthPage />,
    action: authAction,
}

export { authRoutes }
