// const express = require('express')
// const newsletterController = require('../controllers/NewsletterController')

// const router = express.Router()

// router.get('/', newsletterController.getAllEmails)
// router.post('/', newsletterController.subscribeEmail)
// router.post('/send', newsletterController.sendEmails)
// router.delete('/unsubscribe', newsletterController.unsubscribeEmails)

// module.exports = router
const express = require('express')
const NewsletterController = require('../controllers/NewsletterController')
const { checkAuthMiddleware } = require('../utils/auth')

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
