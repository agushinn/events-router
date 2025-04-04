import { useState } from 'react'

import styles from '@events/styles/EventForm.module.scss'
import { IMAGE_TYPE } from '@constants/imageType'

import {
    useNavigate,
    useNavigation,
    Form,
    useActionData,
} from 'react-router-dom'

function EventForm({ method, event }) {
    console.log(event)
    const [imageMode, setImageMode] = useState(
        event?.imageMode || IMAGE_TYPE.URL
    )
    const [file, setFile] = useState(event?.fileName || '')

    const navigate = useNavigate()
    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'
    const errors = useActionData()

    const cancelHandler = () => {
        navigate('../..')
    }

    const imageModeHandler = (event) => {
        const { value } = event.target
        setImageMode(value)
    }

    const fileUploadHandler = (event) => {
        const selectedFile = event.target.files[0].name
        if (selectedFile) {
            setFile(selectedFile)
        }
    }

    return (
        <Form
            method={method}
            className={styles.form}
            encType={`${
                imageMode === IMAGE_TYPE.FILE
                    ? 'multipart/form-data'
                    : 'application/json'
            }`}
        >
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
            <fieldset>
                <legend>Image Mode</legend>
                <div className={styles.imageModeContainer}>
                    <div className={styles.imgeMode}>
                        <input
                            type="radio"
                            name="imageMode"
                            value={IMAGE_TYPE.URL}
                            onChange={imageModeHandler}
                            checked={imageMode === IMAGE_TYPE.URL}
                        />
                        <label
                            className={styles.imageLabel}
                            htmlFor="imageMode"
                        >
                            URL
                        </label>
                    </div>
                    <div className={styles.imgeMode}>
                        <input
                            type="radio"
                            name="imageMode"
                            value={IMAGE_TYPE.FILE}
                            onChange={imageModeHandler}
                            checked={imageMode === IMAGE_TYPE.FILE}
                        />
                        <label
                            className={styles.imageLabel}
                            htmlFor="imageMode"
                        >
                            File
                        </label>
                    </div>
                </div>
                {imageMode === IMAGE_TYPE.URL && (
                    <p>
                        <label htmlFor="imageUrl">Image URL</label>
                        <input
                            id="imageUrl"
                            type="text"
                            name="imageUrl"
                            required
                            defaultValue={
                                event?.imageMode === IMAGE_TYPE.URL
                                    ? event?.image
                                    : ''
                            }
                        />
                    </p>
                )}
                {imageMode === IMAGE_TYPE.FILE && (
                    <div className={styles.fileUploadContainer}>
                        <input
                            id="imageFile"
                            type="file"
                            name="imageFile"
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={fileUploadHandler}
                            aria-label=" Upload an image file. Allowed formats: jpg, jpeg, png"
                        />

                        <div className={styles.customFileUpload}>
                            Image File
                            {file && (
                                <div className={styles.fileName}>
                                    {file}
                                    <button
                                        type="button"
                                        onClick={() => setFile('')}
                                        className={styles.removeFileButton}
                                    >
                                        x
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </fieldset>
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
