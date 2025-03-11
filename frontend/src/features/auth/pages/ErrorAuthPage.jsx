import React from 'react'

import { useRouteError } from 'react-router-dom'

import { PageContent } from '@layouts/page/PageContent'
import { AuthenticationPage } from '@auth/pages/AuthenticationPage'

const ErrorAuthPage = () => {
    const error = useRouteError()
    const errorData = JSON.parse(error.data).errors

    return (
        <>
            <AuthenticationPage />
            <PageContent title="Error">
                <ul>
                    {Object.keys(errorData).map((key, index) => (
                        <li key={index}>{errorData[key]}</li>
                    ))}
                </ul>
            </PageContent>
        </>
    )
}

export { ErrorAuthPage }
