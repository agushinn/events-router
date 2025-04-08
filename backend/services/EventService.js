const EventRepository = require('../repositories/EventRepository')
const { InvalidParamError, NotAuthError } = require('../factory/ErrorsFactory')
const {
    isValidText,
    isValidDate,
    isValidImageUrl,
} = require('../utils/validation')

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

    static async createEvent(data) {
        let errors = {}

        if (!data.author_id || data.author_id === '') {
            errors.author_id = 'Author is required'
        }

        if (!isValidText(data.title)) {
            errors.title = 'Title is invalid'
        }

        if (!isValidImageUrl(data.image)) {
            errors.image = 'Image URL is invalid'
        }

        if (!isValidText(data.description)) {
            errors.description = 'Description is invalid'
        }

        if (!isValidDate(data.date)) {
            errors.date = 'Date is invalid'
        }

        if (Object.keys(errors).length > 0) {
            throw new InvalidParamError(
                'Failed to create event due to invalid fields',
                errors,
            )
        }

        return await EventRepository.add(data)
    }

    static async updateEvent(id, data) {
        let errors = {}

        if (!id || id === '') {
            errors.id = 'ID is required'
        }

        if (!isValidText(data.title)) {
            errors.title = 'Title is invalid'
        }

        if (!isValidImageUrl(data.image)) {
            errors.image = 'Image URL is invalid'
        }

        if (!isValidText(data.description)) {
            errors.description = 'Description is invalid'
        }

        if (!isValidDate(data.date)) {
            errors.date = 'Date is invalid'
        }

        if (Object.keys(errors).length > 0) {
            throw new InvalidParamError(
                'Failed to update event due to invalid fields',
                errors,
            )
        }

        const eventToUpdate = await EventRepository.get(id)
        const eventToUpdateAuthor = eventToUpdate.author_id.toString()
        const userTryingToUpdate = data.author_id

        if (eventToUpdateAuthor !== userTryingToUpdate) {
            throw new NotAuthError(
                'You are not authorized to update this event',
            )
        }

        return await EventRepository.replace(id, data)
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
