const { v4: generateId } = require('uuid')
const { NotFoundError } = require('../factory/ErrorsFactory')
const { readData, writeData } = require('../utils/fileUtils')

async function getAll() {
    const storedData = await readData()

    if (!storedData.events) {
        return []
    }

    return storedData.events
}

async function add(data) {
    const storedData = await readData()
    const eventId = generateId()

    storedData.events.unshift({ ...data, id: eventId })

    await writeData(storedData)

    return eventId
}

async function replace(id, data) {
    const storedData = await readData()

    if (!storedData.events || storedData.events.length === 0) {
        throw new NotFoundError('Could not find any events.')
    }

    const index = storedData.events.findIndex((ev) => ev.id === id)

    if (index < 0) {
        throw new NotFoundError('Could not find event for id ' + id)
    }

    storedData.events[index] = { ...data, id }

    await writeData(storedData)

    return id
}

async function remove(id) {
    const storedData = await readData()

    const updatedData = storedData.events.filter((ev) => ev.id !== id)

    await writeData({ ...storedData, events: updatedData })

    return id
}

async function get(id) {
    const storedData = await readData()

    if (!storedData.events || storedData.events.length === 0) {
        throw new NotFoundError('Could not find any events.')
    }

    const event = storedData.events.find((ev) => ev.id === id)

    if (!event) {
        throw new NotFoundError('Could not find event for id ' + id)
    }

    return event
}

async function getByUserId(userId) {
    const storedData = await readData()

    if (!storedData.events || storedData.events.length === 0) {
        throw new NotFoundError('Could not find any events.')
    }

    const events = storedData.events.filter((ev) => ev.author_id === userId)

    if (!events) {
        throw new NotFoundError('Could not find events for the user ' + userId)
    }
    return events
}

module.exports = {
    getAll,
    getByUserId,
    get,
    add,
    replace,
    remove,
}
