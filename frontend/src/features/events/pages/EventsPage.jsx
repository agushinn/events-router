import { Suspense } from 'react'

import { useLoaderData, Await } from 'react-router-dom'

import { EventsList } from '@events/components/EventsList'
import { Skeleton } from '@events/components/Skeleton'
import { PageContent } from '@layouts/page/PageContent'

function EventsPage({ title }) {
    const { eventsData } = useLoaderData()

    return (
        <PageContent>
            <Suspense fallback={<Skeleton />}>
                <Await resolve={eventsData}>
                    {(resolvedData) => (
                        <EventsList
                            events={resolvedData.events}
                            meta={resolvedData.meta}
                            title={title}
                        />
                    )}
                </Await>
            </Suspense>
        </PageContent>
    )
}

export { EventsPage }
