const EventRepository = require('../repositories/EventRepository')
const { InvalidParamError } = require('../factory/ErrorsFactory')
const {
    isValidText,
    isValidDate,
    isValidImageUrl,
} = require('../utils/validation')

class EventService {
    static async getAllEvents(pageNumber = 1, limitNumber = 4) {
        const { events, docsQuantity } = await EventRepository.getAll(
            pageNumber,
            limitNumber
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
            limitNumber
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
                errors
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
                errors
            )
        }

        return await EventRepository.replace(id, data)
    }

    static async deleteEvent(id) {
        if (!id || id === '') {
            throw new InvalidParamError('ID is required')
        }

        return await EventRepository.remove(id)
    }
}

module.exports = EventService
