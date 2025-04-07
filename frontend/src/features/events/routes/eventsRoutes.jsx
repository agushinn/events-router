import { EventsNavigation } from '@events/components/EventsNavigation'
import {
    handlerEventAction,
    eventDetailLoader,
    eventDeleteAction,
    myEventsLoader,
    loadEvents,
} from '@events/services/eventsService'
import { EventsPage } from '@events/pages/EventsPage'
import { EventDetailPage } from '@events/pages/EventDetailPage'
import { NewEventPage } from '@events/pages/NewEventPage'
import { EditEventPage } from '@events/pages/EditEventPage'
import { checkAuthLoader } from '@services/auth'

const eventsRoutes = {
    path: 'events',
    element: <EventsNavigation />,
    children: [
        {
            path: '',
            element: <EventsPage title="All Events" />,
            loader: loadEvents,
        },
        {
            path: ':eventId',
            id: 'event-detail',
            action: eventDeleteAction,
            loader: eventDetailLoader,
            children: [
                {
                    path: '',
                    element: <EventDetailPage />,
                },
                {
                    path: 'edit',
                    element: <EditEventPage />,
                    action: handlerEventAction,
                    loader: checkAuthLoader,
                },
            ],
        },
        {
            path: 'new',
            element: <NewEventPage />,
            action: handlerEventAction,
            loader: checkAuthLoader,
        },
        {
            path: 'my-events/:userId',
            element: <EventsPage title="My Events" />,
            loader: myEventsLoader,
        },
    ],
}

export { eventsRoutes }
