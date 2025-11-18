const express = require('express');
const router = express.Router();
const categoryController = require('../Controllers/CategoryController');

router.post('/add', categoryController.createCategory);     //agregar   
router.get('/get', categoryController.getCategories);          
router.put('/:id', categoryController.updateCategory);      
router.delete('/:id', categoryController.deleteCategory);  

module.exports = router;
