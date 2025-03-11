import { AuthForm } from '@auth/components/AuthForm'
import styles from '@auth/styles/AuthenticationPage.module.scss'

function AuthenticationPage() {
    return (
        <>
            <p className={styles.authCaption}>
                Can login with email:{' '}
                <span className={styles.credentials}>admin@admin.admin</span>{' '}
                and password: <span className={styles.credentials}>asdasd</span>{' '}
                to access the admin panel.
            </p>
            <AuthForm method={'POST'} />
        </>
    )
}

export { AuthenticationPage }
