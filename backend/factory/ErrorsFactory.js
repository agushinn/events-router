class NotFoundError extends Error {
    constructor(message) {
        super(message)
        this.status = 404
        this.name = 'NotFoundError'
    }
}

class InvalidParamError extends Error {
    constructor(message, data = []) {
        super(message)
        this.status = 400
        this.name = 'InvalidParamError'
        this.data = data
    }
}

class NotAuthError extends Error {
    constructor(message, data = []) {
        super(message)
        this.status = 401
        this.name = 'NotAuthError'
        this.data = data
    }
}

exports.NotFoundError = NotFoundError
exports.InvalidParamError = InvalidParamError
exports.NotAuthError = NotAuthError
