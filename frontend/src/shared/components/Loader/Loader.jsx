import React from 'react'
import styles from '@styles/Loader.module.scss'

const Loader = () => {
    return (
        <div className={styles.loader}>
            <div className={`${styles.spinner} ${styles.spinnerA} `}></div>
            <div className={`${styles.spinner} ${styles.spinnerB} `}></div>
            <div className={`${styles.spinner} ${styles.spinnerC} `}></div>
        </div>
    )
}

export { Loader }
