const UserRepository = require('../repositories/UserRepository')
const { InvalidParamError, NotAuthError } = require('../factory/ErrorsFactory')
const { isValidEmail, isValidText } = require('../utils/validation')
const { createJSONToken, isValidPassword } = require('../utils/jwtUtils')

class UserService {
    static async registerUser(data, type = 'REGULAR') {
        let errors = {}

        if (!isValidEmail(data.email)) {
            errors.email = 'Invalid email.'
        } else {
            try {
                const existingUser = await UserRepository.get(data.email)
                if (existingUser) {
                    errors.email = 'Email exists already.'
                }
            } catch (error) {
                throw new InvalidParamError(error.message)
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

        const createdUser = await UserRepository.add(data, type)
        const authToken = createJSONToken(createdUser.email, createdUser.type)

        return {
            id: createdUser._id,
            email: createdUser.email,
            userType: createdUser.type,
            roles: createdUser.roles,
            token: authToken,
        }
    }

    static async loginUser(email, password) {
        let errors = {}

        try {
            const user = await UserRepository.get(email)

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
                id: user._id,
                userType: user.type,
                roles: user.roles,
                token,
            }
        } catch (error) {
            if (error instanceof InvalidParamError) {
                throw error
            } else {
                throw new NotAuthError('Authentication failed.')
            }
        }
    }
}

module.exports = UserService
