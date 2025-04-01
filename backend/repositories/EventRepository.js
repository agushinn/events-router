const Event = require('../models/event')
const { NotFoundError } = require('../factory/ErrorsFactory')

class EventRepository {
    static async getAll(pageNumber, limitNumber) {
        const [events, docsQuantity] = await Promise.all([
            Event.find()
                .skip((pageNumber - 1) * limitNumber)
                .limit(limitNumber),
            Event.countDocuments(),
        ])

        return { events, docsQuantity }
    }

    static async get(id) {
        const event = await Event.findById(id)
        if (!event) {
            throw new NotFoundError('Event not found', 404)
        }
        return event
    }

    static async getByUserId(userId, pageNumber, limitNumber) {
        const [events, docsQuantity] = await Promise.all([
            Event.find({ author_id: userId })
                .skip((pageNumber - 1) * limitNumber)
                .limit(limitNumber),
            Event.countDocuments({ author_id: userId }),
        ])

        return { events, docsQuantity }
    }

    static async add(eventData) {
        const event = new Event(eventData)
        await event.save()
        return event._id
    }

    static async replace(id, eventData) {
        const event = await Event.findByIdAndUpdate(id, eventData, {
            new: true,
            overwrite: true,
        })
        if (!event) {
            throw new NotFoundError('Could not find event for id ' + id, 404)
        }
        return id
    }

    static async remove(id) {
        const result = await Event.findByIdAndDelete(id)
        if (!result) {
            throw new NotFoundError('Event not found', 404)
        }
        return id
    }
}

module.exports = EventRepository
