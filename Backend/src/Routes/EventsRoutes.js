const express = require('express');
const router = express.Router();
const eventController = require('../Controllers/EventsController');

router.get('/get', eventController.getEvents);
router.post('/add', eventController.createEvent);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);
router.put('/notified/:id', eventController.markAsNotified);

module.exports = router;
