import { Form, useNavigation } from 'react-router-dom'

import styles from '@control/styles/ControlCreateAdmin.module.scss'

const ControlCreateAdmin = () => {
    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'
    return (
        <section className={styles.controlCreateAdminSection}>
            <Form method={'POST'} className={styles.form}>
                <p>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" required />
                </p>
                <p>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        required
                    />
                </p>
                <div className={styles.actions}>
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Creating...' : 'Create'}
                    </button>
                </div>
            </Form>
        </section>
    )
}

export { ControlCreateAdmin }
