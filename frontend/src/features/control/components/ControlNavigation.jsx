import styles from '@control/styles/ControlNavigation.module.scss'

import { NavLink } from 'react-router-dom'

function ControlNavigation() {
    return (
        <>
            <header className={styles.header}>
                <nav>
                    <ul className={styles.list}>
                        <li>
                            <NavLink
                                to={'emails'}
                                className={({ isActive }) =>
                                    isActive ? styles.active : styles.inactive
                                }
                            >
                                EMAILS
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={'create-admin'}
                                className={({ isActive }) =>
                                    isActive ? styles.active : styles.inactive
                                }
                            >
                                CREATE ADMIN
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export { ControlNavigation }
