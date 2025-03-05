const newsletterRepository = require('../repositories/NewsletterRepository')
const { isValidEmail } = require('../utils/validation')
const { NotFoundError, InvalidParamError } = require('../factory/ErrorsFactory')
const eventService = require('../services/EventService')
const EmailService = require('./EmailService')
const { buildNewsletterHtml } = require('../templates/newsletterTemplate')

async function getAllEmails() {
    try {
        const mails = await newsletterRepository.getAll()
        return mails
    } catch (error) {
        throw new NotFoundError('Error fetching emails')
    }
}

async function subscribeEmail(email) {
    if (!isValidEmail(email)) {
        throw new Error('Email is invalid')
    }

    return await newsletterRepository.add(email)
}

async function unsubscribeEmails(emails) {
    if (emails.length <= 0) {
        throw new InvalidParamError('No emails to unsubscribe selected')
    }

    emails.forEach((email) => {
        if (!isValidEmail(email)) {
            throw new InvalidParamError(`Email ${email} is invalid`)
        }
    })
    return await newsletterRepository.deleteEmails(emails)
}

async function sendEmails(emails) {
    if (!emails.length) {
        throw new InvalidParamError('No emails to send selected')
    }
    emails.forEach((email) => {
        if (!isValidEmail(email)) {
            throw new InvalidParamError(`Email ${email} is invalid`)
        }
    })
    const events = await eventService.getAllEvents()
    if (!events.length) {
        throw new NotFoundError('No events found')
    }
    const htmlContent = buildNewsletterHtml(events)
    return await EmailService.sendEmail({
        to: emails,
        subject: 'Upcoming Events!',
        html: htmlContent,
    })
}

module.exports = { getAllEmails, subscribeEmail, sendEmails, unsubscribeEmails }
