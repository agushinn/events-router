const { NotFoundError } = require('../factory/ErrorsFactory.js')
const { sendErrorResponse } = require('../controllers/ApiController.js')

const notFoundMiddleware = (req, res, next) => {
    throw new NotFoundError('Page not found', 'PageNotFoundError', 404)
}

const errorHandlerMiddleware = (error, req, res, next) => {
    sendErrorResponse(res, error)
}

module.exports = { notFoundMiddleware, errorHandlerMiddleware }
