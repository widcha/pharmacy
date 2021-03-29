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
const {checkAdminToken} = require("../helpers/middleware");
const router = express.Router();

//Admin
router.get("/all-state", checkAdminToken, getDeletedProduct);
router.get("/", checkAdminToken, getAllProduct);
router.post("/", checkAdminToken, addNewProduct);
router.patch("/delete/:id", checkAdminToken, deleteProduct);
router.patch("/:id", checkAdminToken, editProduct);
router.patch("/stock/:id", checkAdminToken, addProductStock);

//User
router.get("/by-user", getAllProductbyUser);
router.get("/sort", sortProduct);
router.get("/categories", getProductCategories);
router.get("/search", searchProduct);
router.get("/:id", getProductById);

module.exports = router;
