const { Resend } = require('resend')
const { InvalidParamError } = require('../factory/ErrorsFactory')
const { RESEND_API_KEY } = require('../configs/configs')
class EmailService {
    constructor() {
        const apiKey = RESEND_API_KEY || null
        if (!apiKey) {
            throw new Error('API Key is required')
        }
        this.resendClient = new Resend(apiKey)

        this.defaultFrom = 'Amazing Posts <amazingposts@resend.dev>'
    }

    setCredentials({ apiKey, fromAddress }) {
        if (!apiKey) {
            throw new Error('API Key is required')
        }

        this.resendClient = new Resend(apiKey)

        if (fromAddress) {
            this.defaultFrom = fromAddress
        }
    }

    async sendEmail({ to, subject, html, from }) {
        if (!this.resendClient) {
            throw new InvalidParamError('Credentials not set')
        }

        try {
            return await this.resendClient.emails.send({
                from: from || this.defaultFrom,
                to,
                subject,
                html,
            })
        } catch (error) {
            throw new Error(`Error sending email: ${error.message}`)
        }
    }
}

module.exports = new EmailService()
