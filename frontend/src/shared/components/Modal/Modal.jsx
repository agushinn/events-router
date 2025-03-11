import React from 'react'
import ReactDOM from 'react-dom'

import styles from '@styles/Modal.module.scss'

const Backdrop = () => {
    return <div className={styles.backdrop}></div>
}

const ModalOverlay = ({ titleContent, children, buttons = [] }) => {
    return (
        <section className={styles.modalOverlay}>
            <h3>{titleContent}</h3>
            <div>{children}</div>
            <div className={styles.buttonsContainer}>
                {buttons.map((button, index) => (
                    <button
                        key={index}
                        onClick={button.onClick}
                        className={
                            button.class
                                ? styles[button.class]
                                : styles.cancelButton
                        }
                    >
                        {button.label}
                    </button>
                ))}
            </div>
        </section>
    )
}

const Modal = ({ titleContent, buttons, children }) => {
    return (
        <>
            {ReactDOM.createPortal(
                <Backdrop />,
                document.getElementById('modal-backdrop')
            )}
            {ReactDOM.createPortal(
                <ModalOverlay titleContent={titleContent} buttons={buttons}>
                    {children}
                </ModalOverlay>,
                document.getElementById('modal-overlay')
            )}
        </>
    )
}

export { Modal }
