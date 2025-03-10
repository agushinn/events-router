const EventService = require('../services/EventService')
const ApiController = require('./ApiController')

class EventController {
    static async getAllEvents(req, res, next) {
        try {
            const events = await EventService.getAllEvents()
            ApiController.sendSuccessResponse(
                res,
                events,
                'Events retrieved successfully'
            )
        } catch (error) {
            ApiController.sendErrorResponse(res, error)
        }
    }

    static async createEvent(req, res, next) {
        try {
            const eventId = await EventService.createEvent(req.body)
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

    static async updateEvent(req, res, next) {
        try {
            const updatedId = await EventService.updateEvent(
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

    static async deleteEvent(req, res, next) {
        try {
            const deletedId = await EventService.deleteEvent(req.params.id)
            ApiController.sendSuccessResponse(
                res,
                { message: 'Event deleted with id ' + deletedId },
                'Event deleted successfully'
            )
        } catch (error) {
            ApiController.sendErrorResponse(
                res,
                error,
                'Failed to delete event'
            )
        }
    }

    static async getEventsByUserId(req, res, next) {
        try {
            const events = await EventService.getEventsByUserId(
                req.params.userId
            )
            ApiController.sendSuccessResponse(
                res,
                events,
                'Events retrieved successfully'
            )
        } catch (error) {
            ApiController.sendErrorResponse(res, error)
        }
    }

    static async getEventById(req, res, next) {
        try {
            const event = await EventService.getEventById(req.params.eventId)
            ApiController.sendSuccessResponse(
                res,
                event,
                'Event retrieved successfully'
            )
        } catch (error) {
            ApiController.sendErrorResponse(
                res,
                error,
                'Failed to retrieve event'
            )
        }
    }
}

module.exports = EventController
