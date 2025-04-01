const Newsletter = require('../models/Newsletter')
const { NotFoundError, InvalidParamError } = require('../factory/ErrorsFactory')

class NewsletterRepository {
    static async getAll() {
        try {
            return await Newsletter.find()
        } catch (error) {
            throw new NotFoundError('Could not fetch emails from the database')
        }
    }

    static async add(email) {
        try {
            const existingEmail = await Newsletter.findOne({ email })
            if (existingEmail) {
                throw new InvalidParamError('Email already subscribed')
            }

            const newEmail = new Newsletter({ email })
            await newEmail.save()

            return newEmail
        } catch (error) {
            if (error instanceof InvalidParamError) {
                throw error
            }
            throw new Error('Failed to subscribe email')
        }
    }

    static async deleteEmails(emailsToDelete) {
        try {
            const result = await Newsletter.deleteMany({
                email: { $in: emailsToDelete },
            })

            if (result.deletedCount === 0) {
                throw new NotFoundError('No emails found to delete')
            }

            return { deletedCount: result.deletedCount }
        } catch (error) {
            throw new Error('Failed to delete emails')
        }
    }
}

module.exports = NewsletterRepository
