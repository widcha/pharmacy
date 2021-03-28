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

router.get("/", getCategory);
router.post("/", addNewCategory);
router.patch("/:id", editCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
