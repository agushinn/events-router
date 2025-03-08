// // const { v4: uuidv4 } = require('uuid')
// // const { readData, writeData } = require('../utils/fileUtils')
// // const { NotFoundError, InvalidParamError } = require('../factory/ErrorsFactory')

// // async function getAll() {
// //     try {
// //         const storedData = await readData()
// //         const emails = storedData.newsletters || []
// //         return emails
// //     } catch (error) {
// //         throw new NotFoundError('Could not fetch emails from the database')
// //     }
// // }

// // async function add(email) {
// //     const storedData = await readData()
// //     const emailAlreadyExists = storedData.newsletters.findIndex(
// //         (item) => item.email === email
// //     )

// //     if (emailAlreadyExists !== -1) {
// //         throw new InvalidParamError('Email already suscribed')
// //     }

// //     const emailId = uuidv4()
// //     storedData.newsletters = storedData.newsletters || []
// //     storedData.newsletters.push({ id: emailId, email: email })

// //     await writeData(storedData)

// //     return { id: emailId, email: email }
// // }

// // async function deleteEmails(emailsToDelete) {
// //     const storedData = await readData()
// //     let storedEmails = storedData.newsletters

// //     if (storedEmails.length <= 0 || emailsToDelete.length <= 0) {
// //         return []
// //     }

// //     const filteredEmails = storedEmails.filter(
// //         (storedEmail) => !emailsToDelete.includes(storedEmail.email)
// //     )

// //     storedData.newsletters = filteredEmails

// //     await writeData(storedData)

// //     return filteredEmails
// // }

// // module.exports = {
// //     getAll,
// //     add,
// //     deleteEmails,
// // }

const { connectToDatabase } = require('../database/mongoConnection')
const { NotFoundError, InvalidParamError } = require('../factory/ErrorsFactory')

class NewsletterRepository {
    static async getCollection() {
        const db = await connectToDatabase()
        return db.collection('newsletters')
    }

    static async getAll() {
        try {
            const collection = await this.getCollection()
            return await collection.find().toArray()
        } catch (error) {
            throw new NotFoundError('Could not fetch emails from the database')
        }
    }

    static async add(email) {
        const collection = await this.getCollection()

        const existingEmail = await collection.findOne({ email })
        if (existingEmail) {
            throw new InvalidParamError('Email already subscribed')
        }

        const result = await collection.insertOne({ email })

        return { _id: result.insertedId, email }
    }

    static async deleteEmails(emailsToDelete) {
        const collection = await this.getCollection()

        const result = await collection.deleteMany({
            email: { $in: emailsToDelete },
        })

        if (result.deletedCount === 0) {
            throw new NotFoundError('No emails found to delete')
        }

        return { deletedCount: result.deletedCount }
    }
}

module.exports = NewsletterRepository
