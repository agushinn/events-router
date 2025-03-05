import { NewsletterSignup } from '@newsletter/components/NewsletterSignup'
import { PageContent } from '@layouts/page/PageContent'

function NewsletterPage() {
    return (
        <PageContent title="Join our awesome newsletter!">
            <NewsletterSignup />
        </PageContent>
    )
}

export { NewsletterPage }
