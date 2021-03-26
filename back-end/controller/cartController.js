const { Op } = require("sequelize");
const _ = require("lodash");
const moment = require("moment");

const {
  Cart,
  Product,
  Custom_Product,
  sequelize,
  User,
  Transaction,
} = require("../models");
const { truncate } = require("lodash");
module.exports = {
  userAddProductToCart: async (req, res) => {
    try {
      const { user_id, product_id, product_qty, product_price } = req.body;
      const cart_check = await Cart.findAll({
        where: {
          [Op.and]: {
            user_id: user_id,
            product_id: product_id,
            custom_product_id: null,
          },
        },
        include: [
          {
            model: Product,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      });
      if (cart_check.length > 0) {
        if (
          cart_check[0].product_qty + product_qty <=
          cart_check[0].Product.product_stock_total
        ) {
          await Cart.update(
            { product_qty: cart_check[0].product_qty + product_qty },
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

          return res.status(201).send({ message: "Product Added" });
        } else {
          return res.status(404).send({ message: "Excessive Quantity" });
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
          return res.status(201).send({ message: "Product Added" });
        } else {
          return res.status(404).send({ message: "Excessive Quantity" });
        }
      }
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  },
  userGetCart: async (req, res) => {
    try {
      const { id } = req.params;

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

        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: Product,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      });

      const customProducts = await Custom_Product.findAll({
        where: {
          [Op.and]: {
            user_id: id,
            is_checkout: 0,
          },
        },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: Cart,
            include: [
              {
                model: Product,
                attributes: { exclude: ["createdAt", "updatedAt"] },
              },
            ],
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      });
      return res.send([...response, ...customProducts]);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  },
  userSubtractProductFromCart: async (req, res) => {
    try {
      const { user_id, product_id, currQty } = req.body;
      await Cart.update(
        { product_qty: currQty - 1 },
        {
          where: {
            [Op.and]: {
              user_id: user_id,
              product_id: product_id,
              custom_product_id: null,
            },
          },
        }
      );
      return res.status(200).send({ message: "Product Subtracted" });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  },
  userDeleteProductInCart: async (req, res) => {
    try {
      const { user_id, product_id, custom_product_id } = req.query;
      if (user_id && product_id) {
        await Cart.destroy({
          where: {
            [Op.and]: {
              user_id: user_id,
              product_id: product_id,
              custom_product_id: null,
            },
          },
        });
        return res.status(200).send({ message: "Product Removed" });
      } else if (user_id && custom_product_id) {
        await Cart.destroy({
          where: {
            [Op.and]: {
              user_id: user_id,
              custom_product_id: custom_product_id,
            },
          },
        });

        await Custom_Product.destroy({
          where: {
            [Op.and]: {
              user_id: user_id,
              custom_product_id: custom_product_id,
              is_checkout: 0,
            },
          },
        });
        return res.status(200).send({ message: "Custom Products Removed" });
      }
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  },
  userFetchTotalAndAvailableProducts: async (req, res) => {
    try {
      const { user_id } = req.query;
      const response = await Cart.findAll({
        where: {
          [Op.and]: {
            user_id: {
              [Op.eq]: user_id,
            },
            custom_product_id: {
              [Op.eq]: null,
            },
          },
        },

        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: Product,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      });

      const customProducts = await Custom_Product.findAll({
        where: {
          [Op.and]: {
            user_id: user_id,
            is_checkout: 0,
          },
        },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: Cart,
            include: [
              {
                model: Product,
                attributes: { exclude: ["createdAt", "updatedAt"] },
              },
            ],
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      });
      let filteredProducts = response.filter((val) => {
        return val.product_qty <= val.Product.product_stock_total;
      });
      const filteredCustom = customProducts.map((val) => {
        return {
          custom_product_id: val.custom_product_id,
          custom_product_price: val.custom_product_price,
          custom_product_qty: val.custom_product_qty,
          user_id: val.user_id,
          Carts: val.Carts.filter(
            (subVal) => subVal.product_qty <= subVal.Product.product_stock_total
          ),
        };
      });

      const newFiltered = customProducts.filter((val, i) => {
        return val.Carts.length === filteredCustom[i].Carts.length;
      });
      const newArr = [...filteredProducts, ...newFiltered];
      let subTotal = 0;
      newArr.forEach((val) => {
        if (val.custom_product_id) {
          subTotal += val.custom_product_price;
        } else {
          subTotal += val.product_price * val.product_qty;
        }
      });

      return res.send({ data: newArr, subTotal });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  },
  userCheckout: async (req, res) => {
    try {
      const { user_id, data, total, address } = req.body;
      const t_date = moment().format("YYYY-MM-DD HH:mm:ss");
      const invoice = `INV/${user_id}/${Date.now()}`;
      data.forEach(async (val) => {
        if (val.custom_product_id) {
          try {
            await Custom_Product.update(
              { is_checkout: 1 },
              {
                where: {
                  [Op.and]: {
                    user_id: val.user_id,
                    is_checkout: 0,
                  },
                },
              }
            );
            val.Carts.forEach(async (subVal) => {
              try {
                await Product.update(
                  {
                    product_stock_total:
                      subVal.Product.product_stock_total - subVal.product_qty,
                    product_stock: Math.ceil(
                      (subVal.Product.product_stock_total -
                        subVal.product_qty) /
                        subVal.Product.product_vol
                    ),
                  },
                  {
                    where: {
                      product_id: subVal.product_id,
                    },
                  }
                );
                await Cart.destroy({
                  where: {
                    [Op.and]: {
                      custom_product_id: subVal.custom_product_id,
                      product_id: subVal.product_id,
                      user_id: subVal.user_id,
                    },
                  },
                });
                await Transaction.create({
                  user_id,
                  custom_product_id: subVal.custom_product_id,
                  transaction_date: t_date,
                  transaction_invoice_number: invoice,
                  order_status_id: 1,
                  product_id: subVal.product_id,
                  product_name: subVal.Product.product_name,
                  transaction_payment_details: total,
                  user_address: address,
                  payment_method_id: 1,
                  product_qty: subVal.product_qty,
                });
              } catch (err) {
                console.log(err);
              }
            });
          } catch (err) {
            console.log(err);
          }
        } else {
          try {
            await Product.update(
              {
                product_stock_total:
                  val.Product.product_stock_total - val.product_qty,
                product_stock: Math.ceil(
                  (val.Product.product_stock_total - val.product_qty) /
                    val.Product.product_vol
                ),
              },
              {
                where: {
                  product_id: val.product_id,
                },
              }
            );

            await Cart.destroy({
              where: {
                [Op.and]: {
                  product_id: val.product_id,
                  user_id: val.user_id,
                },
              },
            });
            await Transaction.create({
              user_id,
              transaction_date: t_date,
              transaction_invoice_number: invoice,
              order_status_id: 1,
              product_id: val.product_id,
              product_name: val.Product.product_name,
              transaction_payment_details: total,
              user_address: address,
              payment_method_id: 1,
              product_qty: val.product_qty,
            });
          } catch (err) {
            console.log(err);
          }
        }
      });
      return res.status(200).send({ message: "Checkout" });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  },
};
