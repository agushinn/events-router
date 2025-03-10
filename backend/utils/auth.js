const { sign, verify } = require('jsonwebtoken')
const { compare } = require('bcryptjs')

const { NotAuthError } = require('../factory/ErrorsFactory')
import { JWT_SECRET_KEY } from '../configs/configs'

function createJSONToken(email, userType) {
    return sign({ email, userType }, JWT_SECRET_KEY, { expiresIn: '1h' })
}

function validateJSONToken(token) {
    return verify(token, JWT_SECRET_KEY)
}

function isValidPassword(password, storedPassword) {
    return compare(password, storedPassword)
}

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
        console.log(req.token)
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
    createJSONToken,
    validateJSONToken,
    isValidPassword,
    checkAuthMiddleware,
    authorizeAdminMiddleware,
}
