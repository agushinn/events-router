import { useState } from 'react'

import { Form, NavLink, useRouteLoaderData } from 'react-router-dom'

import styles from '@styles/MainNavigation.module.scss'
import { NewsletterSignup } from '@newsletter/components/NewsletterSignup'

import { USER_TYPE } from '@constants/userType'

function MainNavigation() {
    const { token, userId, roles, userType } = useRouteLoaderData('root')
    const [menuOpen, setMenuOpen] = useState(false)

    const isAdmin =
        roles?.includes('CONTROL_PANEL') && userType === USER_TYPE.ADMIN

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev)
    }

    return (
        <>
            <header className={styles.header}>
                <div className={styles.menuContainer}>
                    <div className={styles.hamburgerMenu} onClick={toggleMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <nav
                        className={`${styles.navigation} ${
                            menuOpen ? styles.navigationOpen : ''
                        }`}
                    >
                        <ul
                            className={`${styles.navList} ${
                                menuOpen ? styles.open : ''
                            }`}
                        >
                            <li>
                                <NavLink
                                    to={'/'}
                                    className={({ isActive }) =>
                                        isActive ? styles.active : ''
                                    }
                                >
                                    HOME
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    end
                                    to={'/events'}
                                    className={({ isActive }) =>
                                        isActive ? styles.active : ''
                                    }
                                >
                                    EVENTS
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={'/newsletter'}
                                    className={({ isActive }) =>
                                        isActive ? styles.active : ''
                                    }
                                >
                                    NEWSLETTER
                                </NavLink>
                            </li>
                            {!token && (
                                <li>
                                    <NavLink
                                        to={'/auth?mode=login'}
                                        className={({ isActive }) =>
                                            isActive ? styles.active : ''
                                        }
                                    >
                                        AUTHENTICATION
                                    </NavLink>
                                </li>
                            )}
                            {token && (
                                <li>
                                    <Form action="/logout" method="POST">
                                        <button>LOGOUT</button>
                                    </Form>
                                </li>
                            )}
                            {token && !isAdmin && (
                                <li>
                                    <NavLink
                                        to={'/events/my-events/' + userId}
                                        className={({ isActive }) =>
                                            isActive ? styles.active : ''
                                        }
                                    >
                                        My Events
                                    </NavLink>
                                </li>
                            )}
                            {token && isAdmin && (
                                <li>
                                    <NavLink
                                        to={'/control/emails'}
                                        className={({ isActive }) =>
                                            isActive ? styles.active : ''
                                        }
                                    >
                                        CONTROL
                                    </NavLink>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
                <NewsletterSignup />
            </header>
        </>
    )
}

export default MainNavigation
