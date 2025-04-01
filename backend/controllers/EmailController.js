const EmailService = require('../services/EmailService')
const ApiController = require('./ApiController')

class EmailController {
    static async setCredentials(req, res, next) {
        try {
            const { credentials: apiKey } = req.body
            EmailService.setCredentials({ apiKey })
            ApiController.sendSuccessResponse(
                res,
                {},
                'Credenciales actualizadas'
            )
        } catch (error) {
            next(error)
        }
    }
}

module.exports = EmailController
