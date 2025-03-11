import { ControlPage } from '@control/pages/ControlPage'
import { ControlEmails } from '@control/components/ControlEmails'
import { ControlCreateAdmin } from '@control/components/ControlCreateAdmin'

import { createProtectedLoader } from '@services/auth'
import {
    loader as controlLoader,
    controlMailsAction,
    controlNewAdminAction,
    setCredentialsAction,
} from '@control/services/controlService'

const controlRoutes = {
    path: 'control',
    element: <ControlPage />,
    action: setCredentialsAction,
    children: [
        {
            index: true,
            path: 'emails',
            element: <ControlEmails />,
            action: controlMailsAction,
            loader: () =>
                createProtectedLoader(
                    ['CONTROL_PANEL'],
                    'ADMIN',
                    controlLoader
                ),
        },
        {
            path: 'create-admin',
            element: <ControlCreateAdmin />,
            action: controlNewAdminAction,
        },
    ],
}

export { controlRoutes }
