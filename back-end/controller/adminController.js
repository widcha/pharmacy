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
  Product_Category,
} = require("../models");
const {Op} = require("sequelize");
const {createJWTToken} = require("../helpers");

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

      // const data = await User.findOne({
      //   where: {
      //     [Op.and]: {
      //       user_id: jwtid,
      //       user_role_id: 1,
      //     },
      //   },
      //   attributes: ["user_role_id"],
      // });

      // const adminData = {...data[0]};
      // const token = createJWTToken(adminData);

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

      await Payment_Images.update(
        {payment_status: order_status_id === 4 ? 2 : 1},
        {
          where: {
            transaction_invoice_number: id,
          },
        }
      );
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
        order_status_status: "Payment Slip Uploaded",
      });
      return res.send(response);
    } catch (err) {
      return res.send(err);
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
  getPaymentImages: async (req, res) => {
    try {
      const {sort, search, sortStatus} = req.query;

      let orderSort;
      if (sort === "ASC") {
        orderSort = [["createdAt", "ASC"]];
      } else if (sort === "DESC" || sort === "") {
        orderSort = [["createdAt", "DESC"]];
      }

      let stat;
      if (sortStatus === "Pending") {
        stat = 0;
      } else if (sortStatus === "Confirmed") {
        stat = 1;
      } else if (sortStatus === "Cancelled") {
        stat = 2;
      }
      let response;
      if (sortStatus) {
        response = await Payment_Images.findAll({
          where: {
            payment_status: stat,
          },
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
      } else {
        response = await Payment_Images.findAll({
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
      }
      return res.status(200).send(response);
    } catch (err) {
      return res.send(err.message);
    }
  },
  getAllLength: async (req, res) => {
    try {
      const users = await User.count();
      const products = await Product.count();
      const category = await Product_Category.count();
      const transactions = (
        await Transaction.findAll({
          group: ["transaction_invoice_number"],
          attributes: ["createdAt"],
        })
      ).length;
      const flows = await Material_Flow.count();
      const total = {users, products, category, transactions, flows};
      return res.status(200).send(total);
    } catch (err) {
      return res.send(err.message);
    }
  },
};
