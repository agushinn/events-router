import { useState, useEffect } from 'react'
import styles from '@events/styles/EventsList.module.scss'

import { Link, useSearchParams, useNavigation } from 'react-router-dom'

function EventsList({ events, meta, title }) {
    const navigation = useNavigation()
    const isLoading = navigation.state === 'loading'

    const {
        totalEvents,
        hasNextPage,
        hasPreviousPage,
        currentPage,
        nextPage,
        previousPage,
        lastPage,
    } = meta
    const [searchParams, setSearchParams] = useSearchParams()
    const [limit, setLimit] = useState(
        () => parseInt(searchParams.get('limit')) || 5
    )
    const itemsPerPage = searchParams.get('limit') || limit

    const itemsPerPageHandler = (e) => {
        const newLimit = parseInt(e.target.value)
        if (!isNaN(newLimit)) {
            setLimit(newLimit)
        }
    }

    useEffect(() => {
        const currentParams = Object.fromEntries(searchParams.entries())
        if (!currentParams.limit || currentParams.limit !== String(limit)) {
            setSearchParams({ ...currentParams, page: 1, limit })
        }
    }, [limit, searchParams, setSearchParams])

    const handleLinkClick = (e) => {
        if (isLoading) {
            e.preventDefault()
        }
    }

    return (
        <section>
            <div className={styles.events}>
                <div className={styles.eventsHeader}>
                    <h2 className={styles.eventsTitle}>{title}</h2>
                    <div>
                        <label htmlFor="items-per-page"> Items </label>
                        <select
                            id="items-per-page"
                            value={itemsPerPage}
                            onChange={itemsPerPageHandler}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                </div>
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

            <nav className={styles.paginationContainer}>
                <ul className={styles.pagination}>
                    <li>
                        <Link
                            onClick={handleLinkClick}
                            to={`?page=1&limit=${itemsPerPage}`}
                            aria-label="Go to first page"
                            className={`${isLoading ? styles.loading : ''}`}
                        >
                            {'<<'}
                        </Link>
                    </li>
                    <li>
                        <Link
                            onClick={handleLinkClick}
                            to={`?page=${
                                !previousPage ? 1 : previousPage
                            }&limit=${itemsPerPage}`}
                            aria-label="Go to previous page"
                            className={`${
                                hasPreviousPage
                                    ? styles.previousPage
                                    : styles.disabled
                            } ${isLoading ? styles.loading : ''}`}
                        >
                            Previous
                        </Link>
                    </li>
                    <li>
                        <span>
                            Page {currentPage} of {lastPage}
                        </span>
                    </li>

                    <li>
                        <Link
                            onClick={handleLinkClick}
                            to={`?page=${
                                !hasNextPage ? lastPage : nextPage
                            }&limit=${itemsPerPage}`}
                            aria-label="Go to next page"
                            className={`${
                                hasNextPage ? styles.nextPage : styles.disabled
                            } ${isLoading ? styles.loading : ''}`}
                        >
                            Next
                        </Link>
                    </li>
                    <li>
                        <Link
                            onClick={handleLinkClick}
                            to={`?page=${lastPage}&limit=${itemsPerPage}`}
                            aria-label="Go to last page"
                            className={`${isLoading ? styles.loading : ''}`}
                        >
                            {'>>'}
                        </Link>
                    </li>
                </ul>
            </nav>
        </section>
    )
}

export { EventsList }
