const express = require('express')
const AuthController = require('../controllers/AuthController')

const router = express.Router()

router.post('/signup', AuthController.signup)
router.post('/admin', AuthController.signupAdmin)
router.post('/login', AuthController.login)

module.exports = router
