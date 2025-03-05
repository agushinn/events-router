const EmailService = require('../services/EmailService')
const ApiController = require('./ApiController')

const setCredentials = async (req, res) => {
    try {
        const { credentials: apiKey } = req.body
        EmailService.setCredentials({ apiKey })
        ApiController.sendSuccessResponse(res, {}, 'Credenciales actualizadas')
    } catch (error) {
        ApiController.sendErrorResponse(res, error)
    }
}

module.exports = { setCredentials }
