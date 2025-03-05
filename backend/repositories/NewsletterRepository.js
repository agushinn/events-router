const { v4: generateId } = require('uuid')
const { readData, writeData } = require('../utils/fileUtils')
const { NotFoundError, InvalidParamError } = require('../factory/ErrorsFactory')

async function getAll() {
    try {
        const storedData = await readData()
        const emails = storedData.newsletters || []
        return emails
    } catch (error) {
        throw new NotFoundError('Could not fetch emails from the database')
    }
}

async function add(email) {
    const storedData = await readData()
    const emailAlreadyExists = storedData.newsletters.findIndex(
        (item) => item.email === email
    )

    if (emailAlreadyExists !== -1) {
        throw new InvalidParamError('Email already suscribed')
    }

    const emailId = generateId()
    storedData.newsletters = storedData.newsletters || []
    storedData.newsletters.push({ id: emailId, email: email })

    await writeData(storedData)

    return { id: emailId, email: email }
}

async function deleteEmails(emailsToDelete) {
    const storedData = await readData()
    let storedEmails = storedData.newsletters

    if (storedEmails.length <= 0 || emailsToDelete.length <= 0) {
        return []
    }

    const filteredEmails = storedEmails.filter(
        (storedEmail) => !emailsToDelete.includes(storedEmail.email)
    )

    storedData.newsletters = filteredEmails

    await writeData(storedData)

    return filteredEmails
}

module.exports = {
    getAll,
    add,
    deleteEmails,
}
