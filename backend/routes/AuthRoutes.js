const express = require('express')
const authController = require('../controllers/AuthController')

const router = express.Router()

router.post('/signup', authController.signup)
router.post('/signup-admin', authController.signupAdmin)
router.post('/login', authController.login)

module.exports = router
