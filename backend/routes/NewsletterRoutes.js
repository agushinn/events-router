const express = require('express')

const NewsletterController = require('../controllers/NewsletterController')
const { checkAuthMiddleware } = require('../middlewares/auth')

const router = express.Router()

router.get('/', checkAuthMiddleware, NewsletterController.getAllEmails)
router.post('/', NewsletterController.subscribeEmail)
router.post('/send', checkAuthMiddleware, NewsletterController.sendEmails)
router.delete(
    '/unsubscribe',
    checkAuthMiddleware,
    NewsletterController.unsubscribeEmails
)

module.exports = router
