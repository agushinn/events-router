class ApiController {
    static sendSuccessResponse(res, data, message = 'Success', status = 200) {
        res.status(status).json({
            message: message,
            status: status,
            success: true,
            data: data,
        })
    }

    static sendErrorResponse(res, error) {
        const statusCode = error.statusCode || 500
        const message = error.message || 'Internal server error'
        const trace = error.name || 'Error'
        const data = error.data || []

        res.status(statusCode).json({
            success: false,
            message: message,
            statusCode: statusCode,
            trace: trace,
            data: data,
        })
    }
}

module.exports = ApiController
