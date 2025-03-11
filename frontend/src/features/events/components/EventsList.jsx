import styles from '@events/styles/EventsList.module.scss'

import { Link } from 'react-router-dom'

function EventsList({ events, title }) {
    return (
        <div className={styles.events}>
            <h2 className={styles.eventsTitle}>{title}</h2>
            {events.length === 0 && <h3>No events found</h3>}
            {events.length > 0 && (
                <ul className={styles.list}>
                    {events.map((event) => (
                        <li key={event._id} className={styles.item}>
                            <Link to={`/events/${event._id}`}>
                                <img src={event.image} alt={event.title} />
                                <div className={styles.content}>
                                    <h2>{event.title}</h2>
                                    <time>{event.date}</time>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export { EventsList }
