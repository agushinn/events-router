import { useRouteError } from 'react-router-dom'

import { PageContent } from '@layouts/page/PageContent'
import MainNavigation from '@components/MainNavigation/MainNavigation'

const ErrorPage = () => {
    const error = useRouteError()

    // SET default title and message
    let message = 'Something went wrong.'
    let title = 'An Error Ocurred!'

    // SET response's message
    if (error?.status && error?.data) {
        message = JSON.parse(error.data).message
    }

    // SET if the page or resource doesn't exists
    if (error.status === 404) {
        title = 'Not Found!'
        message = 'Page does not exist'
    }
    return (
        <>
            <MainNavigation />
            <PageContent title={title}>
                <p>{message}</p>
            </PageContent>
        </>
    )
}
export { ErrorPage }
