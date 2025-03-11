import React, { useState } from 'react'

import styles from '@home/styles/RouterList.module.scss'

const RouterList = ({
    path,
    element,
    errorElement,
    id,
    loader,
    action,
    childrensItems,
    level = 1,
    className,
}) => {
    const [isExpanded, setIsExpanded] = useState(false)

    const toggleExpansion = () => {
        setIsExpanded((prev) => !prev)
    }
    const marginIndentation = { marginLeft: `${level}.2em` }
    const marginUlByLevel = { marginLeft: `${level}.6rem` }

    return (
        <section className={className}>
            {'{'}
            {path && (
                <div className={styles.keys} style={marginIndentation}>
                    path:{' '}
                    <span className={styles.string}>&apos;{path}&apos;</span>,
                </div>
            )}
            {element && (
                <div className={styles.keys} style={marginIndentation}>
                    element: <span className={styles.component}>{element}</span>
                    ,
                </div>
            )}
            {errorElement && (
                <div className={styles.keys} style={marginIndentation}>
                    errorElement:{' '}
                    <span className={styles.component}>{errorElement}</span>,
                </div>
            )}
            {id && (
                <div className={styles.keys} style={marginIndentation}>
                    id: <span className={styles.string}>'{id}'</span>,
                </div>
            )}
            {action && (
                <div className={styles.keys} style={marginIndentation}>
                    action: <span className={styles.pointers}>{action}</span>,
                </div>
            )}
            {loader && (
                <div className={styles.keys} style={marginIndentation}>
                    loader: <span className={styles.pointers}>{loader}</span>,
                </div>
            )}
            {childrensItems && (
                <div className={styles.keys} style={marginIndentation}>
                    <button onClick={toggleExpansion}>
                        {isExpanded ? '-' : '+'}
                    </button>
                    children: {'['}
                    <ul style={marginUlByLevel}>
                        {isExpanded &&
                            childrensItems.map((item, index) => (
                                <li key={index}>
                                    <RouterList {...item} level={level + 1} />
                                </li>
                            ))}
                    </ul>
                    {'],'}
                </div>
            )}
            {'},'}
        </section>
    )
}

export { RouterList }
