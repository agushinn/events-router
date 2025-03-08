const { v4: uuidv4 } = require('uuid')
const { NotFoundError } = require('../factory/ErrorsFactory')
const { readData, writeData } = require('../utils/fileUtils')

// async function getAll() {
//     const storedData = await readData()

//     if (!storedData.events) {
//         return []
//     }

//     return storedData.events
// }

// async function add(data) {
//     const storedData = await readData()
//     const eventId = uuidv4()

//     storedData.events.unshift({ ...data, id: eventId })

//     await writeData(storedData)

//     return eventId
// }

// async function replace(id, data) {
//     const storedData = await readData()

//     if (!storedData.events || storedData.events.length === 0) {
//         throw new NotFoundError('Could not find any events.')
//     }

//     const index = storedData.events.findIndex((ev) => ev.id === id)

//     if (index < 0) {
//         throw new NotFoundError('Could not find event for id ' + id)
//     }

//     storedData.events[index] = { ...data, id }

//     await writeData(storedData)

//     return id
// }

// async function remove(id) {
//     const storedData = await readData()

//     const updatedData = storedData.events.filter((ev) => ev.id !== id)

//     await writeData({ ...storedData, events: updatedData })

//     return id
// }

// async function get(id) {
//     const storedData = await readData()

//     if (!storedData.events || storedData.events.length === 0) {
//         throw new NotFoundError('Could not find any events.')
//     }

//     const event = storedData.events.find((ev) => ev.id === id)

//     if (!event) {
//         throw new NotFoundError('Could not find event for id ' + id)
//     }

//     return event
// }

// async function getByUserId(userId) {
//     const storedData = await readData()

//     if (!storedData.events || storedData.events.length === 0) {
//         throw new NotFoundError('Could not find any events.')
//     }

//     const events = storedData.events.filter((ev) => ev.author_id === userId)

//     if (!events) {
//         throw new NotFoundError('Could not find events for the user ' + userId)
//     }
//     return events
// }

// module.exports = {
//     getAll,
//     getByUserId,
//     get,
//     add,
//     replace,
//     remove,
// }

const { ObjectId } = require('mongodb')
const { connectToDatabase } = require('../database/mongoConnection')

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
