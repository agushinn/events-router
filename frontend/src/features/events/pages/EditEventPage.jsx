import { EventForm } from '@events/components/EventForm'
import { useRouteLoaderData } from 'react-router-dom'
import { PageContent } from '../../../shared/layouts/page/PageContent'

const EditEventPage = () => {
    const data = useRouteLoaderData('event-detail')

    return (
        <PageContent>
            <EventForm method={'PATCH'} event={data.event} />
        </PageContent>
    )
}

export { EditEventPage }
