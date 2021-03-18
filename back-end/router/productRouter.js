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
	},
} = require("../controller");
const express = require("express");
const { searchProduct } = require("../controller/productController");
const router = express.Router();

router.get("/", getAllProduct);
router.get("/by-user", getAllProductbyUser);
router.get("/sort", sortProduct);
router.get("/categories", getProductCategories);
router.get("/search", searchProduct);
router.get("/:id", getProductById);
router.post("/", addNewProduct);
router.patch("/:id", editProduct);
router.patch("/stock/:id", addProductStock);
router.delete("/:id", deleteProduct);

module.exports = router;
