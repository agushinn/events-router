const express = require('express')
const eventController = require('../controllers/EventController')

const router = express.Router()

router.get('/', eventController.getAllEvents)
router.get('/:eventId', eventController.getEventById)
router.get('/users-events/:userId', eventController.getEventsByUserId)
router.post('/', eventController.createEvent)
router.patch('/:id', eventController.updateEvent)
router.delete('/:id', eventController.deleteEvent)

module.exports = router
