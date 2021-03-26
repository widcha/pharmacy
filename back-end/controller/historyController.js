const { response } = require("express");
const { Op } = require("sequelize");
const {
  Custom_Product,
  Transaction,
  Product,
  Cart,
  Order_Status,
} = require("../models");
module.exports = {
  fetchUserHistoryDetail: async (req, res) => {
    try {
      const { user_id } = req.query;
      // * iniiiiiiiiiiiiiiiii buat ambil transaction invoice dan totalnya
      const response4 = await Transaction.findAll({
        where: {
          [Op.and]: {
            user_id,
          },
        },
        raw: true,
        group: ["transaction_invoice_number"],
        attributes: [
          "transaction_invoice_number",
          "transaction_payment_details",
          "transaction_date",
          "order_status_id",
          "payment_method_id",
          "user_address",
        ],
        include: [
          {
            model: Order_Status,
            attributes: {
              exclude: ["createdAt", "updatedAt", "order_status_id"],
            },
          },
        ],
      });
      //* inii buat ambil custom prodcut idnya doang
      const responseCustom = await Transaction.findAll({
        where: {
          [Op.and]: {
            user_id,
            custom_product_id: {
              [Op.ne]: null,
            },
          },
        },
        raw: true,
        group: ["custom_product_id"],
        attributes: ["custom_product_id", "transaction_invoice_number"],
      });

      //* ini buat ambil semua transaction by invoice number
      let response5 = await Transaction.findAll({
        where: {
          transaction_invoice_number: {
            [Op.in]: response4.map((val) => {
              return val.transaction_invoice_number;
            }),
          },
        },

        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",
            "transaction_pharmacist_notes",
            "transaction_date",
            "transaction_payment_details",
            "user_address",
          ],
        },
        include: [
          {
            model: Product,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });

      // * ini buat ambil custom product yg ada di transaction tp dipisahin gitu
      const customres = await Custom_Product.findAll({
        where: {
          user_id,
          is_checkout: 1,
          custom_product_id: responseCustom.map((items) => {
            return items.custom_product_id;
          }),
        },
        include: [
          {
            model: Transaction,
            attributes: [
              "transaction_invoice_number",
              "product_name",
              "product_qty",
              "product_id",
            ],
            include: [
              {
                model: Product,
                attributes: [
                  "product_id",
                  "product_price",
                  "product_vol",
                  "product_name",
                ],
              },
            ],
          },
        ],
        attributes: [
          "custom_product_price",
          "custom_product_qty",
          "notes",
          "custom_product_id",
        ],
      });

      // * ini yg dikirim
      const arr = response4.map((val) => {
        return {
          ...val,
          data: response5.filter((subVal) => {
            return (
              subVal.transaction_invoice_number ===
                val.transaction_invoice_number &&
              subVal.custom_product_id === null
            );
          }),
          custom_data: customres.filter((customs, i) => {
            return (
              customs.Transactions[0].transaction_invoice_number ===
              val.transaction_invoice_number
            );
          }),
        };
      });

      const result = arr.filter((val) => {
        return val.order_status_id >= 4;
      });
      return res.send(result);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },

  repurchaseCustomProduct: async (req, res) => {
    try {
      const { totalQty, totalPrice, transaction, user_id } = req.body;
      const response = await Custom_Product.create({
        custom_product_qty: totalQty,
        custom_product_price: totalPrice,
        user_id,
      });
      await transaction.forEach((val) => {
        let pricePerMl = val.Product.product_price / val.Product.product_vol;
        Cart.create({
          user_id,
          product_id: val.product_id,
          product_qty: val.product_qty,
          product_price: pricePerMl,
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
