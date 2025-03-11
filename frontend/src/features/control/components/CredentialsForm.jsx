import { useState } from 'react'
import { useFetcher } from 'react-router-dom'

import styles from '@control/styles/CredentialsForm.module.scss'

const CredentialsForm = () => {
    const fetcher = useFetcher()

    const [collapse, setCollapse] = useState(true)

    const handleCollapse = () => {
        setCollapse((prevValue) => !prevValue)
    }
    return (
        <div
            className={`${styles.credentialsContainer} ${
                collapse ? styles.containerCollapse : ''
            }`}
        >
            <h3 className={styles.titleCredential}>
                <span className={styles.infoLogo}>&#9432;</span>SET RESEND
                CREDENTIALS
            </h3>
            <p
                className={`${styles.infoText} ${
                    collapse ? styles.contentIsCollapsed : ''
                }`}
            >
                In order to test the mailing service, can put your own
                resend&apos;s credentials here and test by your own.
            </p>
            <fetcher.Form
                method={'POST'}
                className={`${styles.credentialsForm} ${
                    collapse ? styles.contentIsCollapsed : ''
                }`}
            >
                <div>
                    <label htmlFor="credentials">CREDENTIALS</label>
                    <input
                        className={styles.credentialInput}
                        placeholder="re_xxxxxxxxx"
                        id="credentials"
                        type="credentials"
                        name="credentials"
                        required
                    />
                </div>
                <div className={styles.buttonContainer}>
                    <button type="submit">Submit</button>
                </div>
            </fetcher.Form>
            <button
                onClick={handleCollapse}
                className={`${styles.collapseButton} ${
                    collapse ? styles.buttonIsCollapsed : ''
                }`}
            >
                &#9660;
            </button>
        </div>
    )
}

export { CredentialsForm }
