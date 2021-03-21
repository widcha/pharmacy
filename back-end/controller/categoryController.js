const {Product_Category} = require("../models");
const {Op} = require("sequelize");

module.exports = {
  getCategory: async (req, res) => {
    try {
      let response;
      const {search} = req.query;
      if (search) {
        response = await Product_Category.findAll({
          where: {
            product_category: {
              [Op.substring]: `${search}`,
            },
          },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        });
      } else {
        response = await Product_Category.findAll({
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        });
      }
      return res.status(200).send(response);
    } catch (err) {
      return res.send(err.message);
    }
  },
  addNewCategory: async (req, res) => {
    try {
      const {product_category} = req.body;
      const response = await Product_Category.create({
        product_category,
      });
      return res.status(200).send(response);
    } catch (err) {
      return res.send(err.message);
    }
  },
  editCategory: async (req, res) => {
    try {
      const {id} = req.params;
      const {product_category} = req.body;
      await Product_Category.update(
        {product_category},
        {
          where: {
            product_category_id: id,
          },
        }
      );
      return res.status(200).send({message: "Category updated"});
    } catch (err) {
      return res.send(err.message);
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const {id} = req.params;
      await Product_Category.destroy({
        where: {
          product_category_id: id,
        },
      });
      return res.status(200).send({message: "Category deleted"});
    } catch (err) {
      return res.send(err.message);
    }
  },
};
