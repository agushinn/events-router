import styles from '@home/styles/Homepage.module.scss'
import { RouterList } from '@home/components/RouterList'

const HomePage = () => {
    const childrensItems = [
        { path: ' ', element: '<HomePage />' },
        {
            path: 'control',
            element: '<ControlPage />',
            action: 'setCredentialsAction',
            childrensItems: [
                {
                    path: 'emails',
                    element: '<ControlEmails />',
                    action: 'controlMailsAction',
                    loader: `() =>
                createProtectedLoader(
                    ['CONTROL_PANEL'],
                    'ADMIN',
                    controlLoader
                )`,
                },
                {
                    path: 'create-admin',
                    element: '<ControlCreateAdmin />',
                    action: 'controlNewAdminAction',
                },
            ],
        },
        {
            path: 'events',
            element: '<EventsNavigation />',
            childrensItems: [
                {
                    path: ' ',
                    element: '<EventsPage title="All Events"/>',
                    loader: 'eventsLoader',
                },
                {
                    path: ':eventId',
                    id: 'event-detail',
                    loader: 'eventDetailLoader',
                    action: 'eventDeleteAction',
                    childrensItems: [
                        {
                            path: ' ',
                            element: '<EventDetailPage />',
                        },
                        {
                            path: 'edit',
                            element: '<EditEventPage />',
                            action: 'handlerEventAction',
                            loader: 'checkAuthLoader',
                        },
                    ],
                },
                {
                    path: 'new',
                    element: '<NewEventPage />',
                    action: 'handlerEventAction',
                    loader: 'checkAuthLoader',
                },
                {
                    path: 'my-events/:userId',
                    element: '<EventsPage title="My Events" />',
                    loader: 'myEventsLoader',
                },
            ],
        },
        {
            path: 'newsletter',
            element: '<NewsletterPage />',
            action: 'newsletterAction',
        },

        {
            path: 'auth',
            element: '<AuthenticationPage />',
            errorElement: '<ErrorAuthPage />',
            action: 'authAction',
        },
        {
            path: 'logout',
            action: 'logoutAction',
        },
        {
            path: '*',
            element: '<ErrorPage />',
            loader: `() => {
                throw new Response(
                    JSON.stringify({ message: 'Unknown route' }),
                    { status: 404 }
                )
            }`,
        },
    ]

    return (
        <div className={styles.routerContainer}>
            <p>const router = createBrowserRouter([</p>
            <RouterList
                path={'/'}
                element={'<RootLayout />'}
                errorElement={'<ErrorPage />'}
                id={'root'}
                loader={'tokenRootLoader'}
                childrensItems={childrensItems}
                className={styles.routerStructure}
            />
            <p>{'])'}</p>
        </div>
    )
}

export { HomePage }
