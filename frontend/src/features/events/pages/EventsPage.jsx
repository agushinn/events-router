import { Suspense } from 'react'

import { useLoaderData, Await } from 'react-router-dom'

import { EventsList } from '@events/components/EventsList'
import { Skeleton } from '@events/components/Skeleton'
import { PageContent } from '@layouts/page/PageContent'

function EventsPage({ title }) {
    const { events, meta } = useLoaderData()

    return (
        <PageContent>
            <Suspense fallback={<Skeleton />}>
                <Await resolve={events}>
                    {/* this function is executed by react-router when we have the data from the defered events */}
                    {(loadedEvents) => (
                        <>
                            <EventsList
                                events={loadedEvents}
                                meta={meta}
                                title={title}
                            />
                        </>
                    )}
                </Await>
            </Suspense>
        </PageContent>
    )
}

export { EventsPage }
