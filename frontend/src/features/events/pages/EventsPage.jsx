import { EventsList } from '@events/components/EventsList'
import { Skeleton } from '@events/components/Skeleton'
import { useLoaderData, Await } from 'react-router-dom'
import { Suspense } from 'react'

function EventsPage({ title }) {
    const { events } = useLoaderData()

    return (
        <>
            <Suspense fallback={<Skeleton />}>
                <Await resolve={events}>
                    {/* this function is executed by react-router when we have the data from the defered events */}
                    {(loadedEvents) => (
                        <EventsList events={loadedEvents} title={title} />
                    )}
                </Await>
            </Suspense>
        </>
    )
}

export { EventsPage }
