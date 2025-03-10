import styles from '@layouts/page/PageContent.module.scss'

function PageContent({ title, children }) {
    return (
        <div className={styles.content}>
            <h2>{title}</h2>
            {children}
        </div>
    )
}

export { PageContent }
