const userService = require('../services/UserService')
const ApiController = require('./ApiController')

async function signup(req, res) {
    try {
        const createdUser = await userService.registerUser(req.body)
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

async function signupAdmin(req, res) {
    try {
        const createdUser = await userService.registerUser(req.body, 'ADMIN')
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

async function login(req, res) {
    try {
        console.log('login')
        const loginUser = await userService.loginUser(
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

module.exports = {
    signup,
    signupAdmin,
    login,
}
