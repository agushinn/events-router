import { Form, Link, useSearchParams, useNavigation } from 'react-router-dom'

import { PageContent } from '@layouts/page/PageContent'
import styles from '@auth/styles/AuthForm.module.scss'

function AuthForm({ method }) {
    const [searchParams] = useSearchParams()
    const navigation = useNavigation()
    const modeIsLogin = searchParams.get('mode') === 'login'
    const isSubmitting = navigation.state === 'submitting'

    let buttonMode = (
        <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create'}
        </button>
    )
    if (modeIsLogin) {
        buttonMode = (
            <button
                className={styles.actionSubmit}
                type="submit"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Loging...' : 'Login'}
            </button>
        )
    }

    return (
        <PageContent title={modeIsLogin ? 'Sign up!' : 'Create a new user'}>
            <Form method={method} className={styles.form}>
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
                    <Link
                        className={styles.actionMode}
                        to={`?mode=${modeIsLogin ? 'signup' : 'login'}`}
                    >
                        {modeIsLogin ? 'Create new user' : 'Login'}
                    </Link>
                    {buttonMode}
                </div>
            </Form>
        </PageContent>
    )
}

export { AuthForm }
