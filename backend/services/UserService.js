const userRepository = require('../repositories/UserRepository')
const { isValidEmail, isValidText } = require('../utils/validation')
const { InvalidParamError, NotAuthError } = require('../factory/ErrorsFactory')
const { createJSONToken, isValidPassword } = require('../utils/auth')

async function registerUser(data, type = 'REGULAR') {
    let errors = {}

    if (!isValidEmail(data.email)) {
        errors.email = 'Invalid email.'
    } else {
        try {
            const existingUser = await userRepository.get(data.email)
            if (existingUser) {
                errors.email = 'Email exists already.'
            }
        } catch (error) {
            throw new InvalidParamError(error)
        }
    }

    if (!isValidText(data.password, 6)) {
        errors.password =
            'Invalid password. Must be at least 6 characters long.'
    }

    if (Object.keys(errors).length > 0) {
        throw new InvalidParamError(
            'User signup failed due to validation errors.',
            errors
        )
    }

    const createdUser = await userRepository.add(data, type)
    const authToken = createJSONToken(createdUser.email, createdUser.type)

    return {
        id: createdUser.id,
        email: createdUser.email,
        userType: createdUser.type,
        roles: createdUser.roles,
        token: authToken,
    }
}

async function loginUser(email, password) {
    let user
    let errors = {}
    try {
        user = await userRepository.get(email)

        if (!user) {
            errors.email = 'Could not find user for email ' + email
            throw new InvalidParamError('Invalid credentials.', errors)
        }

        const pwIsValid = await isValidPassword(password, user.password)
        if (!pwIsValid) {
            errors.password = 'Invalid password.'
            throw new InvalidParamError('Invalid credentials.', errors)
        }

        const token = createJSONToken(email, user.type)
        return {
            id: user.id,
            userType: user.type,
            roles: user.roles,
            token,
        }
    } catch (error) {
        if (error instanceof InvalidParamError) {
            throw error // rethrow the error to be caught by the controller
        } else {
            throw new NotAuthError('Authentication failed.')
        }
    }
}
module.exports = {
    registerUser,
    loginUser,
}
