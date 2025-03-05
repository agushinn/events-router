const eventService = require('../services/EventService')
const ApiController = require('./ApiController')

async function getAllEvents(req, res, next) {
    try {
        const events = await eventService.getAllEvents()
        ApiController.sendSuccessResponse(
            res,
            events,
            'Events retrieved successfully'
        )
    } catch (error) {
        ApiController.sendErrorResponse(res, error)
    }
}

async function createEvent(req, res, next) {
    try {
        const eventId = await eventService.createEvent(req.body)
        ApiController.sendSuccessResponse(
            res,
            { message: `Event created with id ${eventId}` },
            'Event created successfully',
            201
        )
    } catch (error) {
        ApiController.sendErrorResponse(res, error)
    }
}

async function updateEvent(req, res, next) {
    try {
        const updatedId = await eventService.updateEvent(
            req.params.id,
            req.body
        )
        ApiController.sendSuccessResponse(
            res,
            { message: 'Event updated with id ' + updatedId },
            'Event updated successfully'
        )
    } catch (error) {
        ApiController.sendErrorResponse(res, error)
    }
}

async function deleteEvent(req, res, next) {
    try {
        const deletedId = await eventService.deleteEvent(req.params.id)
        ApiController.sendSuccessResponse(
            res,
            { message: 'Event deleted with id ' + deletedId },
            'Event deleted successfully'
        )
    } catch (error) {
        ApiController.sendErrorResponse(res, error, 'Failed to delete event')
    }
}

async function getEventsByUserId(req, res, next) {
    try {
        console.log('userId', req.params.userId)
        const events = await eventService.getEventsByUserId(req.params.userId)
        ApiController.sendSuccessResponse(
            res,
            events,
            'Events retrieved successfully'
        )
    } catch (error) {
        ApiController.sendErrorResponse(res, error)
    }
}

async function getEventById(req, res, next) {
    try {
        const event = await eventService.getEventById(req.params.eventId)
        ApiController.sendSuccessResponse(
            res,
            event,
            'Event retrieved successfully'
        )
    } catch (error) {
        ApiController.sendErrorResponse(res, error, 'Failed to retrieve event')
    }
}

module.exports = {
    getAllEvents,
    getEventById,
    getEventsByUserId,
    createEvent,
    updateEvent,
    deleteEvent,
}
