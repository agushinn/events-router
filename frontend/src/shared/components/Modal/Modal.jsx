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

// {"events":[{"title":"Spirit escape","image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT06UtQx-msEfwjxJQTWxictuG-ZxYAeW1Isg&usqp=CAU","date":"1211-12-12","description":"asdasdasd","id":"12d930ff-1370-4700-8981-6892974269f2"},{"title":"testing","image":"https://th.bing.com/th/id/OIG.lVXjWwlHyIo4QdjnC1YE","date":"1111-11-11","description":"asdasdasd","id":"13735be9-423d-4d9e-9940-bfff7af266bb"},{"title":"sssss","image":"https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80","date":"0111-11-11","description":"aaa","id":"c0e20b3d-6d0c-4d46-b694-f177eb11d5ab"},{"title":"Moon seminariume","image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvIzpE0RtC7z7mNKlGCfZVu-76ycBg8B0nPw&usqp=CAU","date":"2024-02-11","description":"Amazing IA seminarium","id":"494911a6-f27a-4715-9c12-e9c83f1ca796"},{"title":"Expo ART","image":"https://th.bing.com/th/id/OIG.lVXjWwlHyIo4QdjnC1YE","date":"2023-11-22","description":"Awesome art exposition!","id":"3af67851-adf4-468e-a009-baa28b28247e"},{"title":"Devs meeting ","image":"https://cdn.muenchen-p.de/fl_progressive,q_65/.imaging/stk/responsive/teaser300/dms/va-2016/muenchner-christkindlmarkt/christkindlmarkt-marienplat-logo-hp/document/christkindlmarkt-marienplat-logo-hp.jpg","date":"2022-10-01","description":"Some awesome event!","id":"2a42fcc4-ea21-4bdd-abf6-c40006dc66a9"}],"users":[{"email":"admin@admin.admin","password":"$2a$12$iJ0N18SODf4tlEaJbmxXDufw64dorQdosnp1.to5I3datV7wlG.z2","id":"cda4b194-c652-4de5-8169-a97001c90ee4","admin":true},{"email":"rys.agustin@gmail.com","password":"$2a$12$6800a5cU7KpWHSzoYTUXdeIVldmAOh4JUIKuC8KwRpiStd.wbIz5W","id":"6676ade9-152e-4e66-bad0-1f57c1d8c683","admin":false},{"email":"asdasd@asd.com","password":"$2a$12$gtD0ojmy600r0cQWu5sljuP7D3KtZSGXD25kidL/i565uDe7kzmWC","id":"9a09a753-f56c-4fd0-ba78-48ad5573c8e2","admin":false},{"email":"eee@gmail.com","password":"$2a$12$EVuDBwkjr48DFnuE3mblEuqw7h4B8FOsM/BVRuI7zlvEpixLZTeam","id":"71adc1ef-6111-434f-8b3a-3ba4c9207d84","admin":false},{"email":"agustinjeremiasreyes@gmail.com","password":"$2a$12$EeVL297U1Ax4VcFvYtCvbOmAmwFGclUQq4ffaC4.JaHnN2dmd2VQG","id":"f09bc00f-cf18-4ddc-9cd5-c3fd82768bcc","admin":false}],"newsletters":[{"email":"rys.agustin@gmail.com"},{"email":"rys.aguasdstin@gmail.com"},{"email":"agustinjeremiasreyes@gmail.com"}]}
