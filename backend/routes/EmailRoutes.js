const express = require('express')
const EmailController = require('../controllers/EmailController')
const {
    checkAuthMiddleware,
    authorizeAdminMiddleware,
} = require('../middlewares/authorization')

const router = express.Router()

router.post(
    '/set-credentials',
    checkAuthMiddleware,
    authorizeAdminMiddleware,
    EmailController.setCredentials,
)

module.exports = router
