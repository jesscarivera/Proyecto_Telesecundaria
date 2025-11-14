const express = require('express');
const router = express.Router();
const groupController = require('../Controllers/GroupsController');

router.post('/add', groupController.createGroup);
router.get('/get', groupController.getGroups);
router.get('/:id', groupController.getGroupById);
router.put('/:id', groupController.updateGroup);
router.delete('/:id', groupController.deleteGroup);

module.exports = router;
