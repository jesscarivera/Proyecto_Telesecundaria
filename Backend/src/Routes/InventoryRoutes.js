const express = require('express');
const router = express.Router();
const inventoryController = require('../Controllers/InventoryController');

router.post('/', inventoryController.createItem);         
router.get('/', inventoryController.getItems);            
router.put('/:id', inventoryController.updateItem);      
router.delete('/:id', inventoryController.deleteItem);    

module.exports = router;