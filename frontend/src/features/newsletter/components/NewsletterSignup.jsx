import { useEffect } from 'react'

import { useFetcher } from 'react-router-dom'

import styles from '@newsletter/styles/NewsletterSignup.module.scss'

import { toast } from 'react-toastify'

function NewsletterSignup() {
    const fetcher = useFetcher()
    const { data, state } = fetcher

    useEffect(() => {
        if (state === 'idle' && data?.message) {
            toast(data.message, {
                // prevent duplicated toast
                toastId: data.message,
            })
        }
    }, [data, state])

    return (
        <fetcher.Form
            method="POST"
            action="/newsletter"
            className={styles.newsletter}
        >
            <input
                type="email"
                name="email"
                placeholder="Sign up for newsletter..."
                aria-label="Sign up for newsletter"
            />
            <button>Sign up</button>
        </fetcher.Form>
    )
}

export { NewsletterSignup }
