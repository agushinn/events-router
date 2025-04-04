import { useState } from 'react'

import styles from '@events/styles/EventItem.module.scss'

import { Link, useRouteLoaderData, useSubmit } from 'react-router-dom'

import { getUserRoles } from '@services/auth'
import { absoluteImageUrl } from '@utils/urlImageBuilder'

import { Modal } from '@components/Modal/Modal'

function EventItem({ event }) {
    const submit = useSubmit()

    const userRoles = getUserRoles()
    const userIsAdmin = ['CONTROL_PANEL'].some((role) =>
        userRoles.includes(role)
    )

    const { token, userId } = useRouteLoaderData('root')
    const [showModal, setShowModal] = useState(false)

    const isAuthor = event.author_id === userId

    const deleteEventHandler = () => {
        submit(null, {
            method: 'DELETE',
        })
        closeModalHandler()
    }

    const showModalHandler = () => {
        setShowModal(true)
    }

    const closeModalHandler = () => {
        setShowModal(false)
    }

    return (
        <>
            {showModal && (
                <Modal
                    titleContent={'Are you shure?'}
                    buttons={[
                        {
                            label: 'Cancel',
                            class: 'cancelButton',
                            onClick: closeModalHandler,
                        },
                        {
                            label: 'Delete',
                            class: 'redButton',
                            onClick: deleteEventHandler,
                        },
                    ]}
                >
                    Delete {event.title}?
                </Modal>
            )}
            <article className={styles.event}>
                <img
                    src={`${absoluteImageUrl(event.image, event.imageMode)}`}
                    alt={event.title}
                />
                <h2>{event.title}</h2>
                <time>{event.date}</time>
                <p>{event.description}</p>
                <menu className={styles.actions}>
                    {((token && isAuthor) || userIsAdmin) && (
                        <>
                            <Link to={`edit`}>Edit</Link>
                            <button
                                className={'button'}
                                onClick={showModalHandler}
                            >
                                Delete
                            </button>
                        </>
                    )}
                </menu>
            </article>
        </>
    )
}

export { EventItem }
