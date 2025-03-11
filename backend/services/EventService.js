const EventRepository = require('../repositories/EventRepository')
const { InvalidParamError } = require('../factory/ErrorsFactory')
const {
    isValidText,
    isValidDate,
    isValidImageUrl,
} = require('../utils/validation')

class EventService {
    static async getAllEvents() {
        return await EventRepository.getAll()
    }

    static async getEventById(id) {
        if (!id || id === '') {
            throw new InvalidParamError('ID is required')
        }
        return await EventRepository.get(id)
    }

    static async getEventsByUserId(userId) {
        if (!userId || userId === '') {
            throw new InvalidParamError('User ID is required')
        }

        return await EventRepository.getByUserId(userId)
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
