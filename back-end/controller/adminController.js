const {
  Recipes,
  Admin_Notif,
  Payment_Images,
  Transaction,
  Product,
  User,
  User_Notif,
  Material_Flow,
  Order_Status,
  Payment_Method,
  Custom_Product,
} = require("../models");
const {Op} = require("sequelize");

module.exports = {
  getRecipe: async (req, res) => {
    try {
      let response;
      const {sort, search, status} = req.query;

      let orderSort;
      if (sort === "OLD") {
        orderSort = [["createdAt", "ASC"]];
      } else {
        orderSort = [["createdAt", "DESC"]];
      }
      if (status) {
        response = await Recipes.findAll({
          where: {
            recipes_status: `${status}`,
          },
          order: orderSort,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          include: [
            {
              model: User,
              where: {
                user_username: {[Op.substring]: `${search}`},
              },
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
          ],
        });
      } else {
        response = await Recipes.findAll({
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          order: orderSort,
          include: [
            {
              model: User,
              where: {
                user_username: {[Op.substring]: `${search ? search : ""}`},
              },
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
          ],
        });
      }
      return res.status(200).send(response);
    } catch (err) {
      return res.status(500).send({message: "Failed to get prescription data"});
    }
  },
  editRecipeStatus: async (req, res) => {
    try {
      const {id} = req.params;
      const {recipes_status} = req.body;
      await Recipes.update(
        {recipes_status},
        {
          where: {
            recipes_id: id,
          },
        }
      );
      return res.status(200).send({message: "Prescription status changed"});
    } catch (err) {
      return res
        .status(500)
        .send({message: "Failed to change prescription status"});
    }
  },
  changeTransactionStatus: async (req, res) => {
    try {
      const {id} = req.query;
      const {order_status_id, reason} = req.body;

      const trans = await Transaction.findAll({
        where: {transaction_invoice_number: id},
      });

      await Transaction.update(
        {order_status_id},
        {
          where: {
            transaction_invoice_number: id,
          },
        }
      );
      if (reason) {
        await User_Notif.create({
          user_notif_messages: reason,
          user_notif_status: 0,
          user_id: trans[0].user_id,
          transaction_invoice_number: id,
          order_status_id,
        });
      }
      return res
        .status(200)
        .send({message: "Order status successfully changed"});
    } catch (err) {
      return res.status(500).send({message: "Failed to change order status"});
    }
  },
  getStockFlow: async (req, res) => {
    try {
      const {sort} = req.query;
      let response;
      let orderSort;
      if (sort === "ASC") {
        orderSort = [["createdAt", "ASC"]];
      } else {
        orderSort = [["createdAt", "DESC"]];
      }

      response = await Material_Flow.findAll({
        order: orderSort,
        attributes: {
          exclude: ["updatedAt"],
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
      return res.status(200).send(response);
    } catch (err) {
      return res.status(500).send({message: "Failed to get stock flow data"});
    }
  },
  getStockFlowById: async (req, res) => {
    try {
      const {sort} = req.query;
      const {id} = req.params;
      let orderSort;
      if (sort === "OLD") {
        orderSort = [["createdAt", "ASC"]];
      } else if (sort === "NEW" || sort === "") {
        orderSort = [["createdAt", "DESC"]];
      }

      const response = await Material_Flow.findAll({
        where: {
          product_id: id,
        },
        order: orderSort,
        attributes: {
          exclude: ["updatedAt"],
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
      return res.status(200).send(response);
    } catch (err) {
      return res.status(500).send({message: "Failed to get stock flow data"});
    }
  },
  addPaymentMethods: async (req, res) => {
    try {
      const response = await Payment_Method.create({
        payment_method: "TRANSFER BANK",
      });
      return res.send(response);
    } catch (err) {
      return res.send(err);
    }
  },
  addOrderStatus: async (req, res) => {
    try {
      const response = await Order_Status.create({
        order_status_status: "ARRIVED",
      });
      return res.send(response);
    } catch (err) {
      return res.send(err);
    }
  },
  adminFetchTransaction: async (req, res) => {
    try {
      // * iniiiiiiiiiiiiiiiii buat ambil transaction invoice dan totalnya
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
          "user_id",
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
      //* inii buat ambil custom product idnya doang
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
            // console.log(subVal.product_id);
            return (
              subVal.transaction_invoice_number ===
                val.transaction_invoice_number &&
              subVal.custom_product_id === null
            );
            // return { product: subVal.product_id };
          }),
          custom_data: customres.filter((customs) => {
            return (
              customs.Transactions[0].transaction_invoice_number ===
              val.transaction_invoice_number
            );
          }),
        };
      });

      return res.send(arr);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },
  getNotifAdmin: async (req, res) => {
    try {
      const {select} = req.query;

      let response;
      if (select) {
        response = await Admin_Notif.findAll({
          where: {
            // 0 = belum ke read
            admin_notif_status: 0,
          },
          order: ["createdAt", "DESC"],
          attributes: {
            exclude: ["updatedAt"],
          },
          include: [
            {
              model: User,
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
            {
              model: Order_Status,
              attributes: ["order_status_status"],
            },
          ],
        });
      } else {
        response = await Admin_Notif.findAll({
          order: ["createdAt", "DESC"],
          attributes: {
            exclude: ["updatedAt"],
          },
          include: [
            {
              model: User,
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
            {
              model: Order_Status,
              attributes: ["order_status_status"],
            },
          ],
        });
      }
      return res.status(200).send(response);
    } catch (err) {
      return res
        .status(500)
        .send({message: "Failed to get admin notification"});
    }
  },
  getPaymentProof: async (req, res) => {
    try {
      const {sort, search} = req.query;

      let orderSort;
      if (sort === "ASC") {
        orderSort = [["createdAt", "ASC"]];
      } else if (sort === "DESC" || sort === "") {
        orderSort = [["createdAt", "DESC"]];
      }
      let response = await Payment_Images.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        order: orderSort,
        include: [
          {
            model: User,
            where: {
              user_username: {[Op.substring]: `${search ? search : ""}`},
            },
            attributes: ["user_username"],
          },
        ],
      });
      return res.status(200).send(response);
    } catch (err) {
      return res.send(err.message);
    }
  },
};
