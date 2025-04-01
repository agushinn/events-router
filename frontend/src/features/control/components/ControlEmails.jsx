import React, { useState } from 'react'

import { Form, useLoaderData } from 'react-router-dom'

import styles from '@control/styles/ControlEmails.module.scss'

const ControlEmails = () => {
    const { newsletters } = useLoaderData()
    const [action, setAction] = useState('POST')

    return (
        <section className={styles.controlEmailsSection}>
            {newsletters.length < 1 && (
                <h3 className={styles.noEmailsTitle}>
                    There are no emails subscribed
                </h3>
            )}
            {newsletters && newsletters.length > 0 && (
                <Form
                    className={styles.form}
                    method={action}
                    action="/control/emails"
                >
                    <ul>
                        {newsletters.map((newsletter) => {
                            return (
                                <li key={newsletter._id}>
                                    {newsletter.email}
                                    <input
                                        name="newsletterEmail"
                                        type="checkbox"
                                        value={newsletter.email}
                                    />
                                </li>
                            )
                        })}
                    </ul>
                    <div className={styles.actions}>
                        <button
                            type="submit"
                            onClick={() => {
                                setAction('POST')
                            }}
                        >
                            Send!
                        </button>
                        <button
                            className={styles.deleteButton}
                            type="submit"
                            onClick={() => {
                                setAction('DELETE')
                            }}
                        >
                            Delete!
                        </button>
                    </div>
                </Form>
            )}
        </section>
    )
}

export { ControlEmails }
