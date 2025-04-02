const EventService = require('../services/EventService')
const ApiController = require('./ApiController')

class EventController {
    static async getAllEvents(req, res, next) {
        const { page, limit } = req.query
        const pageNumber = parseInt(page) || 1
        const limitNumber = parseInt(limit) || 0

        try {
            const events = await EventService.getAllEvents(
                pageNumber,
                limitNumber,
            )
            ApiController.sendSuccessResponse(
                res,
                events,
                'Events retrieved successfully',
            )
        } catch (error) {
            next(error)
        }
    }

    static async createEvent(req, res, next) {
        try {
            const eventId = await EventService.createEvent(req.body)
            ApiController.sendSuccessResponse(
                res,
                { message: `Event created with id ${eventId}` },
                'Event created successfully',
                201,
            )
        } catch (error) {
            next(error)
        }
    }

    static async updateEvent(req, res, next) {
        try {
            const updatedId = await EventService.updateEvent(
                req.params.id,
                req.body,
            )
            ApiController.sendSuccessResponse(
                res,
                { message: 'Event updated with id ' + updatedId },
                'Event updated successfully',
            )
        } catch (error) {
            next(error)
        }
    }

    static async deleteEvent(req, res, next) {
        try {
            const deletedId = await EventService.deleteEvent(req.params.id)
            ApiController.sendSuccessResponse(
                res,
                { message: 'Event deleted with id ' + deletedId },
                'Event deleted successfully',
            )
        } catch (error) {
            next(error)
        }
    }

    static async getEventsByUserId(req, res, next) {
        try {
            const { page, limit } = req.query
            const pageNumber = parseInt(page) || 1
            const limitNumber = parseInt(limit) || 0

            const events = await EventService.getEventsByUserId(
                req.params.userId,
                pageNumber,
                limitNumber,
            )
            ApiController.sendSuccessResponse(
                res,
                events,
                'Events retrieved successfully',
            )
        } catch (error) {
            next(error)
        }
    }

    static async getEventById(req, res, next) {
        try {
            const event = await EventService.getEventById(req.params.eventId)
            ApiController.sendSuccessResponse(
                res,
                event,
                'Event retrieved successfully',
            )
        } catch (error) {
            next(error)
        }
    }
}

module.exports = EventController
