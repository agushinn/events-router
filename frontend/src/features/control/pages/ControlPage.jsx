import { Outlet } from 'react-router-dom'

import { PageContent } from '@layouts/page/PageContent'
import { ControlNavigation } from '@control/components/ControlNavigation'
import { CredentialsForm } from '@control/components/CredentialsForm'

const ControlPage = () => {
    return (
        <PageContent>
            <CredentialsForm />
            <ControlNavigation />
            <Outlet />
        </PageContent>
    )
}

export { ControlPage }
