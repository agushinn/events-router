import { useRouteLoaderData } from 'react-router-dom'

import { PageContent } from '@layouts/page/PageContent'
import { EventItem } from '@events/components/EventItem'

const EventDetailPage = () => {
    const { event } = useRouteLoaderData('event-detail')

    return (
        <PageContent>
            <EventItem event={event} />
        </PageContent>
    )
}

export { EventDetailPage }
