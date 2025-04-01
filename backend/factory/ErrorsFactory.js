class AppError extends Error {
    constructor(name, message, statusCode, data = []) {
        super(message)
        this.name = name
        this.statusCode = statusCode
        this.data = data
    }
}

class NotFoundError extends AppError {
    constructor(message) {
        super('NotFoundError', message, 404)
    }
}

class InvalidParamError extends AppError {
    constructor(message, data = []) {
        super('InvalidParamError', message, 400, data)
    }
}

class NotAuthError extends AppError {
    constructor(message, data = []) {
        super('NotAuthError', message, 401, data)
    }
}

module.exports = { NotFoundError, InvalidParamError, NotAuthError }
