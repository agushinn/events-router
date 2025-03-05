const newsletterService = require('../services/NewsletterService')
const ApiController = require('./ApiController')

async function getAllEmails(req, res, next) {
    try {
        const emails = await newsletterService.getAllEmails()
        ApiController.sendSuccessResponse(
            res,
            emails,
            'Emails retrieved successfully'
        )
    } catch (error) {
        ApiController.sendErrorResponse(res, error)
    }
}

async function subscribeEmail(req, res, next) {
    try {
        const email = await newsletterService.subscribeEmail(req.body.email)
        ApiController.sendSuccessResponse(
            res,
            email,
            'Email subscribed successfully'
        )
    } catch (error) {
        ApiController.sendErrorResponse(res, error)
    }
}

async function sendEmails(req, res, next) {
    try {
        console.log('controller sendEmails executed')
        const emails = await newsletterService.sendEmails(req.body.emails)
        ApiController.sendSuccessResponse(
            res,
            emails,
            'Emails sent successfully'
        )
    } catch (error) {
        ApiController.sendErrorResponse(res, error)
    }
}

async function unsubscribeEmails(req, res, next) {
    try {
        const emails = await newsletterService.unsubscribeEmails(
            req.body.emails
        )
        ApiController.sendSuccessResponse(
            res,
            emails,
            'Emails unsubscribed successfully'
        )
    } catch (error) {
        ApiController.sendErrorResponse(res, error)
    }
}

module.exports = {
    getAllEmails,
    subscribeEmail,
    sendEmails,
    unsubscribeEmails,
}
