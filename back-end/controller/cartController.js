const {Op} = require("sequelize");
const _ = require("lodash");

const {Cart, Product, Custom_Product, sequelize, User} = require("../models");
module.exports = {
  userAddProductToCart: async (req, res) => {
    try {
      const {
        user_id,
        product_id,
        product_qty,
        product_price,
        custom_product_id,
      } = req.body;
      if (custom_product_id) {
        const response = await Cart.create({
          user_id,
          product_id,
          product_qty,
          product_price,
          custom_product_id,
        });

        return res.send(response);
      } else {
        const cart_check = await Cart.findAll({
          where: {
            [Op.and]: {
              user_id: user_id,
              product_id: product_id,
            },
          },
          include: [
            {
              model: Product,
              attributes: {exclude: ["createdAt", "updatedAt"]},
            },
          ],
        });
        if (cart_check.length > 0) {
          if (
            cart_check[0].product_qty + product_qty <=
            cart_check[0].Product.product_stock_total
          ) {
            await Cart.update(
              {product_qty: cart_check[0].product_qty + product_qty},
              {
                where: {
                  [Op.and]: {
                    user_id: user_id,
                    product_id: product_id,
                    cart_id: cart_check[0].cart_id,
                  },
                },
              }
            );
            // const response = await Cart.findAll({
            // 	where: {
            // 		cart_id: { [Op.eq]: cart_check[0].cart_id },
            // 	},
            // });
            const response = await Cart.findAll({
              where: {
                user_id: {
                  [Op.eq]: user_id,
                },
              },
              attributes: {exclude: ["createdAt", "updatedAt"]},
              include: [
                {
                  model: Product,
                  attributes: {
                    exclude: [
                      "createdAt",
                      "updatedAt",
                      "product_desc",
                      "product_id",
                      "product_price",
                      "product_category_id",
                    ],
                  },
                },
              ],
            });
            return res.send(response);
          } else {
            return res.status(404).send({message: "Excessive Quantity"});
          }
        } else {
          const product_res = await Product.findOne({
            where: {
              product_id: {
                [Op.eq]: product_id,
              },
            },
          });
          if (product_qty <= product_res.dataValues.product_stock_total) {
            await Cart.create({
              user_id,
              product_id,
              product_qty,
              product_price,
            });
            const response = await Cart.findAll({
              where: {
                user_id: {
                  [Op.eq]: user_id,
                },
              },
              attributes: {exclude: ["createdAt", "updatedAt"]},
              include: [
                {
                  model: Product,
                  attributes: {
                    exclude: [
                      "createdAt",
                      "updatedAt",
                      "product_desc",
                      "product_id",
                      "product_price",
                      "product_category_id",
                    ],
                  },
                },
              ],
            });
            return res.send(response);
          } else {
            return res.status(404).send({message: "Excessive Quantity"});
          }
        }
      }
    } catch (err) {
      return res.status(500).send({message: err.message});
    }
  },
  userGetCart: async (req, res) => {
    try {
      const {id} = req.params;
      const response = await Cart.findAll({
        where: {
          [Op.and]: {
            user_id: {
              [Op.eq]: id,
            },
            custom_product_id: {
              [Op.eq]: null,
            },
          },
        },

        attributes: {exclude: ["createdAt", "updatedAt"]},
        include: [
          {
            model: Product,
            attributes: {exclude: ["createdAt", "updatedAt"]},
          },
        ],
      });
      // console.log(response[0].dataValues);
      // var grouped = _.mapValues(
      // 	_.groupBy(response, "custom_product_id"),
      // 	(clist) => clist.map((res) => _.omit(res, "custom_product_id"))
      // );

      const customProducts = await Custom_Product.findAll({
        where: {
          user_id: id,
        },
        attributes: {exclude: ["createdAt", "updatedAt"]},
        include: [
          {
            model: Cart,
            include: [
              {
                model: Product,
                attributes: {exclude: ["createdAt", "updatedAt"]},
              },
            ],
            attributes: {exclude: ["createdAt", "updatedAt"]},
          },
        ],
      });
      return res.send([...response, ...customProducts]);
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  userSubtractProductFromCart: async (req, res) => {
    try {
      const {user_id, product_id, currQty} = req.body;
      await Cart.update(
        {product_qty: currQty - 1},
        {
          where: {
            [Op.and]: {
              user_id: user_id,
              product_id: product_id,
            },
          },
        }
      );
      const response = await Cart.findAll({
        where: {
          user_id: {
            [Op.eq]: user_id,
          },
        },
        attributes: {exclude: ["createdAt", "updatedAt"]},
        include: [
          {
            model: Product,
            attributes: {
              exclude: [
                "createdAt",
                "updatedAt",
                "product_desc",
                "product_id",
                "product_price",
                "product_category_id",
              ],
            },
          },
        ],
      });
      return res.send(response);
    } catch (err) {
      return res.status(500).send({message: err.message});
    }
  },
  userDeleteProductInCart: async (req, res) => {
    try {
      const {user_id, product_id} = req.query;
      await Cart.destroy({
        where: {
          [Op.and]: {
            user_id: user_id,
            product_id: product_id,
          },
        },
      });
      const response = await Cart.findAll({
        where: {
          user_id: {
            [Op.eq]: user_id,
          },
        },
        attributes: {exclude: ["createdAt", "updatedAt"]},
        include: [
          {
            model: Product,
            attributes: {
              exclude: [
                "createdAt",
                "updatedAt",
                "product_desc",
                "product_id",
                "product_price",
                "product_category_id",
              ],
            },
          },
          {model: Custom_Product},
        ],
      });
      return res.send(response);
    } catch (err) {
      return res.status(500).send({message: err.message});
    }
  },
  userFetchTotalAndAvailableProducts: async (req, res) => {
    try {
      const {user_id} = req.query;

      const length = await Cart.findAll({
        where: {
          user_id: {
            [Op.eq]: user_id,
          },
          group: ["custom_product_id"],
        },
      });
      const response = await Cart.findAll({
        where: {
          user_id: {
            [Op.eq]: user_id,
          },
        },
        attributes: {exclude: ["createdAt", "updatedAt"]},
        include: [
          {
            model: Product,
            attributes: {
              exclude: [
                "createdAt",
                "updatedAt",
                "product_desc",
                "product_id",
                "product_price",
                "product_category_id",
              ],
            },
          },
          {model: Custom_Product},
        ],
      });
      console.log(response.length);

      const filterData = response.filter((val) => {
        return val.product_qty <= val.Product.product_stock_total;
      });
      let total = 0;
      await filterData.forEach((val) => {
        total +=
          val.product_qty * (val.product_price / val.Product.product_vol);
      });
      return res.send({
        data: filterData,
        subTotal: Math.ceil(total),
        length: length.length,
      });

      // return res.send(response);
    } catch (err) {
      return res.status(500).send({message: err.message});
    }
  },
};
