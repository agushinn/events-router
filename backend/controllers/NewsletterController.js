const NewsletterService = require('../services/NewsletterService')
const ApiController = require('./ApiController')

class NewsletterController {
    static async getAllEmails(req, res, next) {
        try {
            const emails = await NewsletterService.getAllEmails()
            ApiController.sendSuccessResponse(
                res,
                emails,
                'Emails retrieved successfully'
            )
        } catch (error) {
            next(error)
        }
    }

    static async subscribeEmail(req, res, next) {
        try {
            const email = await NewsletterService.subscribeEmail(req.body.email)
            ApiController.sendSuccessResponse(
                res,
                email,
                'Email subscribed successfully'
            )
        } catch (error) {
            next(error)
        }
    }

    static async sendEmails(req, res, next) {
        try {
            const emails = await NewsletterService.sendEmails(req.body.emails)
            ApiController.sendSuccessResponse(
                res,
                emails,
                'Emails sent successfully'
            )
        } catch (error) {
            next(error)
        }
    }

    static async unsubscribeEmails(req, res, next) {
        try {
            const emails = await NewsletterService.unsubscribeEmails(
                req.body.emails
            )
            ApiController.sendSuccessResponse(
                res,
                emails,
                'Emails unsubscribed successfully'
            )
        } catch (error) {
            next(error)
        }
    }
}

module.exports = NewsletterController
