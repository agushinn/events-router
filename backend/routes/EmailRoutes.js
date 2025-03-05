const express = require('express')
const emailControler = require('../controllers/EmailController')
const {
    checkAuthMiddleware,
    authorizeAdminMiddleware,
} = require('../utils/auth')

const router = express.Router()

router.post(
    '/set-credentials',
    checkAuthMiddleware,
    authorizeAdminMiddleware,
    emailControler.setCredentials
)

module.exports = router
