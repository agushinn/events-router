import { RootLayout } from '@layouts/root/RootLayout.jsx'
import { ErrorPage } from '@pages/ErrorPage'

import { tokenRootLoader, logoutAction } from '@services/auth'

import { authRoutes } from '@auth/routes/authRoutes'
import { controlRoutes } from '@control/routes/controlRoutes'
import { eventsRoutes } from '@events/routes/eventsRoutes'
import { homeRoutes } from '@home/routes/homeRoutes'
import { newsletterRoutes } from '@newsletter/routes/newsletterRoutes'

const routes = [
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        id: 'root',
        loader: tokenRootLoader,
        children: [
            homeRoutes,
            controlRoutes,
            authRoutes,
            eventsRoutes,
            newsletterRoutes,
            {
                path: 'logout',
                action: logoutAction,
            },
            {
                // Handle unknown routes
                path: '*',
                element: <ErrorPage />,
                loader: () => {
                    throw new Response(
                        JSON.stringify({ message: 'Unknown route' }),
                        { status: 404 }
                    )
                },
            },
        ],
    },
]

export { routes }
