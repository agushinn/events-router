const express = require('express')
const EventController = require('../controllers/EventController')

const router = express.Router()

router.get('/', EventController.getAllEvents)
router.get('/:eventId', EventController.getEventById)
router.get('/users/:userId', EventController.getEventsByUserId)
router.post('/', EventController.createEvent)
router.patch('/:id', EventController.updateEvent)
router.delete('/:id', EventController.deleteEvent)

module.exports = router
