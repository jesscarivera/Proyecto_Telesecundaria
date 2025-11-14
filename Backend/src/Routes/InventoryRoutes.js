const express = require('express');
const router = express.Router();
const inventoryController = require('../Controllers/InventoryController');

router.post('/add', inventoryController.createItem);         
router.get('/get', inventoryController.getItems);  
router.get('/category/:id', inventoryController.getItemsByCategory);          
router.put('/:id', inventoryController.updateItem);      
router.delete('/:id', inventoryController.deleteItem);    

module.exports = router;