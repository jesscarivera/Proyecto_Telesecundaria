const express = require('express');
const router = express.Router();
const eventController = require('../Controllers/EventsController');

router.get('/get', eventController.getEvents);
router.get('/upcoming', eventController.getUpcomingEvents);
router.post('/add', eventController.createEvent);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
