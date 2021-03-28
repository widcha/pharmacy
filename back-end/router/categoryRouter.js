const {
  categoryController: {
    getCategory,
    addNewCategory,
    editCategory,
    deleteCategory,
  },
} = require("../controller");
const express = require("express");
const {checkAdminToken} = require("../helpers/middleware");
const router = express.Router();

router.get("/", checkAdminToken, getCategory);
router.post("/", checkAdminToken, addNewCategory);
router.patch("/:id", checkAdminToken, editCategory);
router.delete("/:id", checkAdminToken, deleteCategory);

module.exports = router;
