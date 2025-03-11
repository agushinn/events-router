const { NotAuthError } = require('../factory/ErrorsFactory')
const { validateJSONToken } = require('../utils/auth')

function checkAuthMiddleware(req, res, next) {
    if (req.method === 'OPTIONS') {
        return next()
    }
    if (!req.headers.authorization) {
        console.log('NOT AUTH. AUTH HEADER MISSING.')
        return next(new NotAuthError('Not authenticated.'))
    }
    const authFragments = req.headers.authorization.split(' ')

    if (authFragments.length !== 2) {
        console.log('NOT AUTH. AUTH HEADER INVALID.')
        return next(new NotAuthError('Not authenticated.'))
    }
    const authToken = authFragments[1]
    try {
        const validatedToken = validateJSONToken(authToken)
        req.token = validatedToken
    } catch (error) {
        console.log('NOT AUTH. TOKEN INVALID.')
        return next(new NotAuthError('Not authenticated.'))
    }
    next()
}

function authorizeAdminMiddleware(req, res, next) {
    const { userType } = req.token
    if (userType !== 'ADMIN') {
        return next(new NotAuthError('Access denied: Admins only.'))
    }
    next()
}

module.exports = {
    checkAuthMiddleware,
    authorizeAdminMiddleware,
}
