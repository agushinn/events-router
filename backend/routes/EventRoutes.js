const express = require('express')
const EventController = require('../controllers/EventController')
const { checkAuthMiddleware } = require('../middlewares/authorization')

const router = express.Router()

router.get('/', EventController.getAllEvents)
router.get('/:eventId', EventController.getEventById)
router.get('/users/:userId', EventController.getEventsByUserId)
router.post('/', checkAuthMiddleware, EventController.createEvent)
router.patch('/:id', checkAuthMiddleware, EventController.updateEvent)
router.delete('/:id', checkAuthMiddleware, EventController.deleteEvent)

module.exports = router
