const {
  productController: {
    getAllProduct,
    getProductById,
    addNewProduct,
    addProductStock,
    editProduct,
    deleteProduct,
    productPagination,
    getProductCategories,
    getAllProductbyUser,
    sortProduct,
    getDeletedProduct,
  },
} = require("../controller");
const express = require("express");
const {searchProduct} = require("../controller/productController");
const router = express.Router();

//Admin
router.get("/all-state", getDeletedProduct);
router.get("/", getAllProduct);
router.post("/", addNewProduct);
router.patch("/delete/:id", deleteProduct);
router.patch("/:id", editProduct);
router.patch("/stock/:id", addProductStock);

//User
router.get("/by-user", getAllProductbyUser);
router.get("/sort", sortProduct);
router.get("/categories", getProductCategories);
router.get("/search", searchProduct);
router.get("/:id", getProductById);

module.exports = router;
