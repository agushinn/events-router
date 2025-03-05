import { useEffect } from 'react'
import { Outlet, useLoaderData, useSubmit } from 'react-router-dom'

import MainNavigation from '@components/MainNavigation/MainNavigation'
import styles from '@layouts/root/RootLayout.module.scss'
import { getTokenDuration } from '@services/auth'

const RootLayout = () => {
    const { token } = useLoaderData()
    const submit = useSubmit()

    useEffect(() => {
        if (!token) {
            return
        }
        if (token === 'TOKEN_EXPIRED') {
            submit(null, {
                action: '/logout',
                method: 'POST',
            })
            return
        }

        const duration = getTokenDuration()
        const logoutTimer = setTimeout(() => {
            submit(null, {
                action: '/logout',
                method: 'POST',
            })
        }, duration)

        return () => {
            clearTimeout(logoutTimer)
        }
    }, [token, submit])

    return (
        <>
            <MainNavigation />

            <div className={styles.container}>
                <h1>REACT ROUTER PRACTICE!</h1>
            </div>
            <main>
                <Outlet />
            </main>
        </>
    )
}

export { RootLayout }
