const { 
    productController: {
        getAllProduct,
        getProductById,
        getProductbyCategory,
        addNewProduct,
        addProductStock,
        editProduct,
        deleteProduct
    }
} = require('../controller');
const express = require("express");
const router = express.Router();

router.get('/', getAllProduct);
router.get('/:id', getProductById);
router.post('/', addNewProduct);
router.patch('/:id', editProduct);
router.patch('/stock/:id', addProductStock);
router.delete('/:id', deleteProduct);

module.exports = router;