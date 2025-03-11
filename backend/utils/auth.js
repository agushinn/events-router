const { sign, verify } = require('jsonwebtoken')
const { compare } = require('bcryptjs')
require('dotenv').config()

const { JWT_SECRET_KEY } = '../configs/configs'

function createJSONToken(email, userType) {
    return sign({ email, userType }, JWT_SECRET_KEY, { expiresIn: '1h' })
}

function validateJSONToken(token) {
    return verify(token, JWT_SECRET_KEY)
}

function isValidPassword(password, storedPassword) {
    return compare(password, storedPassword)
}

module.exports = {
    createJSONToken,
    validateJSONToken,
    isValidPassword,
}
