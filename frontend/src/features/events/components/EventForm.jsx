import styles from '@events/styles/EventForm.module.scss'

import {
    useNavigate,
    useNavigation,
    Form,
    useActionData,
} from 'react-router-dom'

function EventForm({ method, event }) {
    const navigate = useNavigate()
    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'
    const errors = useActionData()

    const cancelHandler = () => {
        navigate('../..')
    }

    return (
        <Form method={method} className={styles.form}>
            <p>
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    required
                    defaultValue={event?.title}
                />
            </p>
            <p>
                <label htmlFor="image">Image</label>
                <input
                    id="image"
                    type="url"
                    name="image"
                    required
                    defaultValue={event?.image}
                />
            </p>
            <p>
                <label htmlFor="date">Date</label>
                <input
                    id="date"
                    type="date"
                    name="date"
                    required
                    defaultValue={event?.date}
                />
            </p>
            <p>
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    rows="5"
                    required
                    defaultValue={event?.description}
                />
            </p>
            {errors && (
                <ul className={styles.errorContainer}>
                    {Object.keys(errors).map((key, index) => (
                        <li key={index}>{errors[key]}</li>
                    ))}
                </ul>
            )}
            <div className={styles.actions}>
                <button
                    disabled={isSubmitting}
                    type="button"
                    onClick={cancelHandler}
                >
                    Cancel
                </button>
                <button disabled={isSubmitting}>
                    {isSubmitting ? 'Submiting...' : 'Save'}
                </button>
            </div>
        </Form>
    )
}

export { EventForm }
