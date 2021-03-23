const { Custom_Product, Cart } = require("../models");

module.exports = {
  addCustomProduct: async (req, res) => {
    try {
      const { totalQty, totalPrice, capsule, user_id } = req.body;
      const response = await Custom_Product.create({
        custom_product_qty: totalQty,
        custom_product_price: totalPrice,
      });
      await capsule.forEach((val) => {
        Cart.create({
          user_id,
          product_id: val.product_id,
          product_qty: val.qty,
          product_price: val.pricePerMl,
          custom_product_id: response.dataValues.custom_product_id,
        });
      });

      const result = await Cart.findAll({
        where: {
          user_id,
          custom_product_id: response.dataValues.custom_product_id,
        },
      });
      return res, status(200).send(result);
    } catch (err) {
      return res.send(err.message);
    }
  },
};
