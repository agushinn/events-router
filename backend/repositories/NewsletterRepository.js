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
