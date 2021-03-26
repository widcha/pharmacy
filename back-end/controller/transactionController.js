const {response} = require("express");
const {Op} = require("sequelize");
const {
  Custom_Product,
  Transaction,
  Product,
  sequelize,
  Order_Status,
  Payment_Images,
} = require("../models");
const pify = require("pify");
const {uploader} = require("../handlers");

const path = "/payment_slip";
const upload = pify(uploader(path, "PYMS").fields([{name: "image"}]));

module.exports = {
  fetchUserTransactionDetail: async (req, res) => {
    try {
      const {user_id, order_status} = req.query;
      // * iniiiiiiiiiiiiiiiii buat ambil transaction invoice dan totalnya
      const response4 = await Transaction.findAll({
        where: {
          user_id,
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
      if (order_status > 0) {
        const result = arr.filter((val) => {
          return val.order_status_id === parseInt(order_status);
        });
        return res.send(result);
      } else {
        const result = arr.filter((val) => {
          return val.order_status_id !== 5 && val.order_status_id !== 4;
        });
        return res.send(result);
      }
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },
  userUploadPaymentSlip: async (req, res) => {
    try {
      upload(req, res, async (err) => {
        const {image} = req.files;
        const {user_id, transaction_invoice_number} = JSON.parse(req.body.data);
        const imagepath = image ? `${path}/${image[0].filename}` : null;
        console.log(imagepath);
        const response = await Payment_Images.create({
          user_id,
          transaction_invoice_number,
          payment_images_image_path: imagepath,
        });
        await Transaction.update(
          {
            order_status_id: 6,
          },
          {
            where: {
              [Op.and]: {
                transaction_invoice_number,
                user_id,
              },
            },
          }
        );

        if (response) {
          return res.status(201).send(response);
        } else {
          fs.unlinkSync(`public${imagepath}`);
          return res.status(500).send(err.message);
        }
      });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },
  fetchAdminTransaction: async (req, res) => {
    try {
      const {order_status} = req.query;
      // ini buat ambil transaction invoice dan totalnya
      const response4 = await Transaction.findAll({
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
          custom_product_id: {
            [Op.ne]: null,
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
      if (parseInt(order_status) > 0) {
        const result = arr.filter((val) => {
          return val.order_status_id === parseInt(order_status);
        });
        return res.send(result);
      } else {
        const result = arr;
        return res.send(result);
      }
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },
};
