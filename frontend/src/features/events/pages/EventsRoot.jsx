import { Outlet } from 'react-router-dom'

import { EventsNavigation } from '@events/components/EventsNavigation'

function EventsRootLayout() {
    return (
        <>
            <EventsNavigation />
            <Outlet />
        </>
    )
}

export { EventsRootLayout }
