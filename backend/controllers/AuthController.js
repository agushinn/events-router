const UserService = require('../services/UserService')
const ApiController = require('./ApiController')
const { USER_TYPE } = require('../utils/userType')

class AuthController {
    static async signup(req, res) {
        try {
            const createdUser = await UserService.registerUser(
                req.body,
                USER_TYPE.REGULAR
            )
            ApiController.sendSuccessResponse(
                res,
                createdUser,
                'User created successfully',
                201
            )
        } catch (error) {
            ApiController.sendErrorResponse(res, error)
        }
    }

    static async signupAdmin(req, res) {
        try {
            const createdUser = await UserService.registerUser(
                req.body,
                USER_TYPE.ADMIN
            )
            ApiController.sendSuccessResponse(
                res,
                createdUser,
                'User created successfully',
                201
            )
        } catch (error) {
            ApiController.sendErrorResponse(res, error)
        }
    }

    static async login(req, res) {
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
            ApiController.sendErrorResponse(res, error)
        }
    }
}

module.exports = AuthController
