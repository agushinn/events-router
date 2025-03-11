const { ObjectId } = require('mongodb')
const { connectToDatabase } = require('../database/mongoConnection')
const { NotFoundError } = require('../factory/ErrorsFactory')
class EventRepository {
    static async getCollection() {
        const db = await connectToDatabase()

        return db.collection('events')
    }

    static async getAll() {
        const collection = await this.getCollection()

        return collection.find().toArray()
    }

    static async get(id) {
        const collection = await this.getCollection()
        const objectId = new ObjectId(id)
        const event = await collection.findOne({ _id: objectId })

        if (!event) {
            throw new NotFoundError('Event not found')
        }

        return event
    }

    static async getByUserId(userId) {
        const collection = await this.getCollection()
        const objectId = new ObjectId(userId)

        return collection.find({ author_id: objectId }).toArray()
    }

    static async add(eventData) {
        const collection = await this.getCollection()
        const { author_id } = eventData
        const objectId = new ObjectId(author_id)

        const eventDataFormated = { ...eventData, author_id: objectId }

        const result = await collection.insertOne(eventDataFormated)

        return result.insertedId
    }

    static async replace(id, eventData) {
        const collection = await this.getCollection()
        const objectId = new ObjectId(id)
        const result = await collection.replaceOne(
            { _id: objectId },
            { ...eventData, _id: objectId }
        )

        if (result.modifiedCount === 0) {
            throw new NotFoundError('Could not find event for id ' + id)
        }

        return id
    }

    static async remove(id) {
        const collection = await this.getCollection()
        const objectId = new ObjectId(id)
        const result = await collection.deleteOne({ _id: objectId })

        if (result.deletedCount === 0) {
            throw new NotFoundError('Event not found')
        }

        return id
    }
}

module.exports = EventRepository
