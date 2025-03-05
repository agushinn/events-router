import { NewsletterPage } from '@newsletter/pages/NewsletterPage'
import { newsletterAction } from '@newsletter/services/newsletterService'

const newsletterRoutes = {
    path: 'newsletter',
    element: <NewsletterPage />,
    action: newsletterAction,
}

export { newsletterRoutes }
