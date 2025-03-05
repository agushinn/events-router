const eventRepository = require('../repositories/EventRepository')
const {
    isValidText,
    isValidDate,
    isValidImageUrl,
} = require('../utils/validation')
const { InvalidParamError } = require('../factory/ErrorsFactory')

async function getAllEvents() {
    return await eventRepository.getAll()
}

async function createEvent(data) {
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

    return await eventRepository.add(data)
}

async function updateEvent(id, data) {
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

    return await eventRepository.replace(id, data)
}

async function getEventById(id) {
    if (!id || id === '') {
        throw new InvalidParamError('ID is required')
    }
    return await eventRepository.get(id)
}

async function getEventsByUserId(userId) {
    console.log('userId', userId)
    if (!userId || userId === '') {
        throw new InvalidParamError('User ID is required')
    }
    return await eventRepository.getByUserId(userId)
}

async function deleteEvent(id) {
    if (!id || id === '') {
        throw new InvalidParamError('ID is required')
    }

    return await eventRepository.remove(id)
}

module.exports = {
    getAllEvents,
    getEventById,
    getEventsByUserId,
    createEvent,
    updateEvent,
    deleteEvent,
}
