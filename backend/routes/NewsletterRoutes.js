const express = require('express')
const newsletterController = require('../controllers/NewsletterController')

const router = express.Router()

router.get('/', newsletterController.getAllEmails)
router.post('/', newsletterController.subscribeEmail)
router.post('/send', newsletterController.sendEmails)
router.delete('/unsubscribe', newsletterController.unsubscribeEmails)

module.exports = router
