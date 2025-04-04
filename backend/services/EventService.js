const EventRepository = require('../repositories/EventRepository')
const { InvalidParamError, NotAuthError } = require('../factory/ErrorsFactory')
const {
    isValidText,
    isValidDate,
    isValidImageUrl,
} = require('../utils/validation')
const { clearImage } = require('../utils/fileUtils')

class EventService {
    static async getAllEvents(pageNumber = 1, limitNumber = 0) {
        const { events, docsQuantity } = await EventRepository.getAll(
            pageNumber,
            limitNumber,
        )
        const totalEvents = docsQuantity
        const hasNextPage = docsQuantity > pageNumber * limitNumber
        const hasPreviousPage = pageNumber > 1
        const nextPage = hasNextPage ? pageNumber + 1 : null
        const previousPage = hasPreviousPage ? pageNumber - 1 : null
        const lastPage = Math.ceil(docsQuantity / limitNumber)

        return {
            events,
            meta: {
                totalEvents,
                hasNextPage,
                hasPreviousPage,
                currentPage: pageNumber,
                nextPage,
                previousPage,
                lastPage,
            },
        }
    }

    static async getEventById(id) {
        if (!id || id === '') {
            throw new InvalidParamError('ID is required')
        }
        return await EventRepository.get(id)
    }

    static async getEventsByUserId(userId, pageNumber = 1, limitNumber = 4) {
        if (!userId || userId === '') {
            throw new InvalidParamError('ID is required')
        }

        const { events, docsQuantity } = await EventRepository.getByUserId(
            userId,
            pageNumber,
            limitNumber,
        )

        const totalEvents = docsQuantity
        const hasNextPage = docsQuantity > pageNumber * limitNumber
        const hasPreviousPage = pageNumber > 1
        const nextPage = hasNextPage ? pageNumber + 1 : null
        const previousPage = hasPreviousPage ? pageNumber - 1 : null
        const lastPage = Math.ceil(docsQuantity / limitNumber)

        return {
            events,
            meta: {
                totalEvents,
                hasNextPage,
                hasPreviousPage,
                currentPage: pageNumber,
                nextPage,
                previousPage,
                lastPage,
            },
        }
    }

    static async createEvent(bodyData, file) {
        let errors = {}

        if (!bodyData.author_id || bodyData.author_id === '') {
            errors.author_id = 'Author is required'
        }

        if (!isValidText(bodyData.title)) {
            errors.title = 'Title is invalid'
        }

        if (!bodyData.imageMode || bodyData.imageMode === '') {
            errors.imageMode = 'Image mode is required'
        }

        if (bodyData.imageMode === ' file' && !file) {
            errors.image = 'Image File is required'
        }

        if (bodyData.imageMode === 'url' && !isValidImageUrl(bodyData.image)) {
            errors.image = 'Image URL is invalid'
        }

        if (!isValidText(bodyData.description)) {
            errors.description = 'Description is invalid'
        }

        if (!isValidDate(bodyData.date)) {
            errors.date = 'Date is invalid'
        }

        if (Object.keys(errors).length > 0) {
            throw new InvalidParamError(
                'Failed to create event due to invalid fields',
                errors,
            )
        }

        if (bodyData.imageMode === 'file' && file) {
            const filePath = file?.path
            const fileOriginalName = file?.originalname
            bodyData.image = filePath
            bodyData.fileName = fileOriginalName
        }

        return await EventRepository.add(bodyData)
    }
    static async updateEvent(id, bodyData, file) {
        let errors = {}
        console.log(bodyData)
        if (!id || id === '') {
            errors.id = 'ID is required'
        }

        if (!isValidText(bodyData.title)) {
            errors.title = 'Title is invalid'
        }

        if (!bodyData.imageMode || bodyData.imageMode === '') {
            errors.imageMode = 'Image mode is required'
        }

        if (
            bodyData.imageMode === 'url' &&
            bodyData.image &&
            !isValidImageUrl(bodyData.image)
        ) {
            errors.image = 'Image URL is invalid'
        }

        if (!isValidText(bodyData.description)) {
            errors.description = 'Description is invalid'
        }

        if (!isValidDate(bodyData.date)) {
            errors.date = 'Date is invalid'
        }

        if (Object.keys(errors).length > 0) {
            throw new InvalidParamError(
                'Failed to update event due to invalid fields',
                errors,
            )
        }

        const eventToUpdate = await EventRepository.get(id)
        const eventToUpdateAuthor = eventToUpdate.author_id
        const userTryingToUpdate = bodyData.author_id

        if (eventToUpdateAuthor !== userTryingToUpdate) {
            throw new NotAuthError(
                'You are not authorized to update this event',
            )
        }

        if (bodyData.imageMode === 'file') {
            if (file) {
                const filePath = file.path
                const fileName = file.originalname
                bodyData.image = filePath
                bodyData.fileName = fileName
                const eventToUpdateImage = eventToUpdate.image
                const eventToUpdateImageName = eventToUpdate.fileName
                if (
                    (eventToUpdateImage &&
                        eventToUpdateImage !== filePath &&
                        eventToUpdateImageName &&
                        eventToUpdateImageName !== fileName) ||
                    eventToUpdateImageName === fileName
                ) {
                    try {
                        await clearImage(eventToUpdateImage)
                    } catch (error) {
                        throw new Error(
                            `Error eliminando archivo ${eventToUpdateImage}: ${error.message}`,
                        )
                    }
                }
            } else {
                delete bodyData.image
                delete bodyData.fileName
                delete bodyData.imageMode
            }
        } else if (bodyData.imageMode === 'url') {
            const eventToUpdateImage = eventToUpdate.image
            const eventToUpdateImageName = eventToUpdate.fileName
            const oldMode = eventToUpdate.imageMode
            if (
                eventToUpdateImage &&
                eventToUpdateImageName &&
                oldMode === 'file'
            ) {
                try {
                    await clearImage(eventToUpdateImage)
                } catch (error) {
                    throw new Error(
                        `Error eliminando archivo ${eventToUpdateImage}: ${error.message}`,
                    )
                }
            }
            bodyData.fileName = ''
        }

        const updated = await EventRepository.replace(id, bodyData)

        return updated
    }

    static async deleteEvent(eventId, userId) {
        if (!eventId || eventId === '') {
            throw new InvalidParamError('ID is required')
        }

        const eventToUpdate = await EventRepository.get(eventId)
        const eventToUpdateAuthor = eventToUpdate.author_id.toString()
        const userTryingToUpdate = userId

        if (eventToUpdateAuthor !== userTryingToUpdate) {
            throw new NotAuthError(
                'You are not authorized to delete this event',
            )
        }

        return await EventRepository.remove(eventId)
    }
}

module.exports = EventService
