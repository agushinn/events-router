import styles from '@events/styles/Skeleton.module.scss'

function Skeleton() {
    return (
        <>
            <div className={styles.headerSkeleton}>
                <div className={styles.titleSkeleton}></div>
                <div className={styles.selectSkeleton}></div>
            </div>
            <div className={styles.events}>
                <ul className={styles.list}>
                    <li className={`${styles.item} ${styles.itemA}`}>
                        <div className={styles.image}></div>
                        <div className={styles.content}>
                            <div className={styles.title}></div>
                            <div className={styles.date}></div>
                        </div>
                    </li>
                    <li className={`${styles.item} ${styles.itemB}`}>
                        <div className={styles.image}></div>
                        <div className={styles.content}>
                            <div className={styles.title}></div>
                            <div className={styles.date}></div>
                        </div>
                    </li>
                    <li className={`${styles.item} ${styles.itemC}`}>
                        <div className={styles.image}></div>
                        <div className={styles.content}>
                            <div className={styles.title}></div>
                            <div className={styles.date}></div>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )
}

export { Skeleton }
