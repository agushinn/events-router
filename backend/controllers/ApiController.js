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
        const status = error.status || 500
        res.status(status).json({
            success: false,
            message: error.message || 'An error occurred',
            status: status,
            trace: error.name || 'Error',
            data: error.data || [],
        })
    }
}

module.exports = ApiController
