const { 
    categoryController: {
        getCategory,
        addNewCategory,
        editCategory,
        deleteCategory
    }
} = require('../controller');
const express = require("express");
const router = express.Router();

router.get('/', getCategory);
router.post('/', addNewCategory);
router.patch('/:id', editCategory);
router.delete('/:id', deleteCategory);

module.exports = router;