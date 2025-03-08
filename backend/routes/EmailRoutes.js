const express = require('express')
const EmailController = require('../controllers/EmailController')
const {
    checkAuthMiddleware,
    authorizeAdminMiddleware,
} = require('../utils/auth')

const router = express.Router()

router.post(
    '/set-credentials',
    checkAuthMiddleware,
    authorizeAdminMiddleware,
    EmailController.setCredentials
)

module.exports = router
