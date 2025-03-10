const NewsletterRepository = require('../repositories/NewsletterRepository')
const { isValidEmail } = require('../utils/validation')
const { NotFoundError, InvalidParamError } = require('../factory/ErrorsFactory')
const EventService = require('./EventService')
const EmailService = require('./EmailService')
const { buildNewsletterHtml } = require('../templates/newsletterTemplate')

class NewsletterService {
    static async getAllEmails() {
        try {
            return await NewsletterRepository.getAll()
        } catch (error) {
            throw new NotFoundError('Error fetching emails')
        }
    }

    static async subscribeEmail(email) {
        if (!isValidEmail(email)) {
            throw new InvalidParamError('Email is invalid')
        }

        try {
            return await NewsletterRepository.add(email)
        } catch (error) {
            if (error instanceof InvalidParamError) {
                throw error
            }
            throw new Error('Failed to subscribe email')
        }
    }

    static async unsubscribeEmails(emails) {
        if (!emails || emails.length === 0) {
            throw new InvalidParamError('No emails to unsubscribe selected')
        }

        emails.forEach((email) => {
            if (!isValidEmail(email)) {
                throw new InvalidParamError(`Email ${email} is invalid`)
            }
        })

        try {
            return await NewsletterRepository.deleteEmails(emails)
        } catch (error) {
            throw new Error('Failed to unsubscribe emails')
        }
    }

    static async sendEmails(emails) {
        if (!emails || emails.length === 0) {
            throw new InvalidParamError('No emails to send selected')
        }

        emails.forEach((email) => {
            if (!isValidEmail(email)) {
                throw new InvalidParamError(`Email ${email} is invalid`)
            }
        })

        try {
            const events = await EventService.getAllEvents()
            if (!events.length) {
                throw new NotFoundError('No events found')
            }

            const htmlContent = buildNewsletterHtml(events)
            return await EmailService.sendEmail({
                to: emails,
                subject: 'Upcoming Events!',
                html: htmlContent,
            })
        } catch (error) {
            throw new Error('Failed to send emails: ' + error.message)
        }
    }
}

module.exports = NewsletterService
