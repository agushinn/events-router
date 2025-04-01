const UserService = require('../services/UserService')
const ApiController = require('./ApiController')

const { USER_TYPES } = require('../utils/userType')

class AuthController {
    static async signup(req, res, next) {
        try {
            const createdUser = await UserService.registerUser(
                req.body,
                USER_TYPES.REGULAR.name
            )
            ApiController.sendSuccessResponse(
                res,
                createdUser,
                'User created successfully',
                201
            )
        } catch (error) {
            next(error)
        }
    }

    static async signupAdmin(req, res, next) {
        try {
            const createdUser = await UserService.registerUser(
                req.body,
                USER_TYPES.ADMIN.name
            )
            ApiController.sendSuccessResponse(
                res,
                createdUser,
                'User created successfully',
                201
            )
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const loginUser = await UserService.loginUser(
                req.body.email,
                req.body.password
            )
            ApiController.sendSuccessResponse(
                res,
                loginUser,
                'User logged in successfully',
                200
            )
        } catch (error) {
            next(error)
        }
    }
}

module.exports = AuthController
