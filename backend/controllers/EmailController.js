const EmailService = require('../services/EmailService')
const ApiController = require('./ApiController')

class EmailController {
    static async setCredentials(req, res) {
        try {
            const { credentials: apiKey } = req.body
            EmailService.setCredentials({ apiKey })
            ApiController.sendSuccessResponse(
                res,
                {},
                'Credenciales actualizadas'
            )
        } catch (error) {
            ApiController.sendErrorResponse(res, error)
        }
    }
}

module.exports = EmailController
