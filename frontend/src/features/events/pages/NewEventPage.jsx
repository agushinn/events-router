import { PageContent } from '@layouts/page/PageContent'
import { EventForm } from '@events/components/EventForm'

const NewEventPage = () => {
    return (
        <PageContent>
            <EventForm method={'POST'} />
        </PageContent>
    )
}

export { NewEventPage }
