import { useRouteLoaderData } from 'react-router-dom'

import { EventForm } from '@events/components/EventForm'
import { PageContent } from '@layouts/page/PageContent'

const EditEventPage = () => {
    const data = useRouteLoaderData('event-detail')

    return (
        <PageContent>
            <EventForm method={'PATCH'} event={data.event} />
        </PageContent>
    )
}

export { EditEventPage }
