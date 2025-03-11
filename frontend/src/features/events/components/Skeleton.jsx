import styles from '@events/styles/Skeleton.module.scss'

function Skeleton() {
    return (
        <div className={styles.events}>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <div className={styles.elements}>
                        <div className={styles.image}>
                            <div className={styles.bar}></div>
                        </div>
                        <div className={styles.content}> </div>
                    </div>
                </li>
                <li className={styles.item}>
                    <div className={styles.elements}>
                        <div className={styles.image}>
                            <div className={styles.bar}></div>
                        </div>
                        <div className={styles.content}> </div>
                    </div>
                </li>
                <li className={styles.item}>
                    <div className={styles.elements}>
                        <div className={styles.image}>
                            <div className={styles.bar}></div>
                        </div>
                        <div className={styles.content}> </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export { Skeleton }
