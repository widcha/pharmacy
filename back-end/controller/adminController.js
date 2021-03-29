const {
  Recipes,
  Admin_Notif,
  Finance,
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
const sequelize = require("sequelize");
const {createJWTToken} = require("../helpers");

module.exports = {
  getRecipe: async (req, res) => {
    try {
      let response;
      const {page, limit, sort, search, status} = req.query;

      const theLimit = limit ? parseInt(limit) : 9;
      const offsetData = (page ? parseInt(page) - 1 : 0) * theLimit;

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
          offset: offsetData,
          limit: theLimit,
          order: orderSort,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
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
      } else {
        response = await Recipes.findAll({
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          offset: offsetData,
          limit: theLimit,
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
      const {page, limit, sort} = req.query;
      const theLimit = limit ? parseInt(limit) : 10;
      const offsetData = (page ? parseInt(page) - 1 : 0) * theLimit;

      let response;
      let orderSort;
      if (sort === "ASC") {
        orderSort = [["createdAt", "ASC"]];
      } else {
        orderSort = [["createdAt", "DESC"]];
      }

      response = await Material_Flow.findAll({
        offset: offsetData,
        limit: theLimit,
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
      const {page, limit, sort} = req.query;
      const {id} = req.params;
      const theLimit = limit ? parseInt(limit) : 10;
      const offsetData = (page ? parseInt(page) - 1 : 0) * theLimit;

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
        offset: offsetData,
        limit: theLimit,
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
  getPaymentImages: async (req, res) => {
    try {
      const {page, limit, sort, search, status} = req.query;
      const theLimit = limit ? parseInt(limit) : 9;
      const offsetData = (page ? parseInt(page) - 1 : 0) * theLimit;

      let orderSort;
      if (sort === "ASC") {
        orderSort = [["createdAt", "ASC"]];
      } else if (sort === "DESC" || sort === "") {
        orderSort = [["createdAt", "DESC"]];
      }

      let stat;
      if (status === "Pending") {
        stat = 0;
      } else if (status === "Confirmed") {
        stat = 1;
      } else if (status === "Cancelled") {
        stat = 2;
      }
      let response;
      if (status) {
        response = await Payment_Images.findAll({
          where: {
            payment_status: stat,
          },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          offset: offsetData,
          limit: theLimit,
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
          offset: offsetData,
          limit: theLimit,
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
      let transactions;
      await Transaction.count({
        distinct: true,
      }).then((count) => (transactions = count));

      let success_trans;
      await Transaction.count({
        where: {order_status_id: 5},
        distinct: true,
        col: "transaction_invoice_number",
      }).then((count) => (success_trans = count));

      let users;
      await User.count({
        where: {[Op.and]: {user_role_id: 2, is_banned: 0}},
        distinct: true,
        col: "user_id",
      }).then((count) => (users = count));

      let products;
      await Product.count({
        where: {product_is_available: 1},
        distinct: true,
        col: "product_id",
      }).then((count) => (products = count));

      let categories;
      await Product_Category.count({
        distinct: true,
        col: "product_category_id",
      }).then((count) => (categories = count));

      let finances;
      await Finance.count({
        distinct: true,
        col: "finance_id",
      }).then((count) => (transactions = count));

      let flows;
      await Material_Flow.count({
        distinct: true,
        col: "material_flow_id",
      }).then((count) => (flows = count));

      let recipe;
      await Recipes.count({
        distinct: true,
        col: "recipes_id",
      }).then((count) => (recipe = count));

      let pay_img;
      await Payment_Images.count({
        distinct: true,
        col: "payment_images_id",
      }).then((count) => (pay_img = count));

      let notifall;
      await Admin_Notif.count({
        distinct: true,
      }).then((count) => (notifall = count));

      let notifunread;
      await Admin_Notif.count({
        where: {admin_notif_status: 0},
        distinct: true,
      }).then((count) => (notifunread = count));

      const total = {
        users,
        products,
        categories,
        transactions,
        flows,
        success_trans,
        finances,
        recipe,
        pay_img,
        notifall,
        notifunread,
      };
      return res.status(200).send(total);
    } catch (err) {
      return res.send(err.message);
    }
  },
  createReport: async (req, res) => {
    try {
      const {invoice} = req.body;
      const result = await Transaction.findAll({
        where: {
          [Op.and]: {
            transaction_invoice_number: invoice,
            custom_product_id: null,
          },
        },
        order: [["product_id", "ASC"]],
      });

      const result2 = await Transaction.findAll({
        where: {
          transaction_invoice_number: invoice,
        },
        order: [["product_id", "ASC"]],
      });

      //Pencatatan laporan keuangan
      const response = await Finance.create({
        transaction_invoice_number: invoice,
        finance_earning: result2[0].transaction_payment_details,
      });

      //Pencatatan pengurangan stock product non-custom
      const oldData = await Product.findAll({
        where: {
          product_id: result.map((val) => val.product_id),
        },
      });
      if (oldData.length > 0) {
        result.forEach(async (val, i) => {
          await Material_Flow.create({
            product_id: val.product_id,
            material_flow_stock: -val.product_qty,
            material_flow_info: "User buy this product",
            stock: oldData[i].product_stock,
            stock_total: oldData[i].product_stock_total,
          });
        });
      }

      //Pencatatan pengurangan stock product custom
      //jumlah qty per product_id
      const customdata = await Transaction.findAll({
        where: {
          [Op.and]: {
            transaction_invoice_number: invoice,
            custom_product_id: {[Op.ne]: null},
          },
        },
        include: [
          {
            model: Custom_Product,
            attributes: [
              [
                sequelize.literal(
                  "(custom_product.custom_product_qty*transaction.product_qty)"
                ),
                "quantity",
              ],
            ],
          },
          {
            model: Product,
            attributes: ["product_stock", "product_stock_total"],
          },
        ],
        attributes: ["product_id", "custom_product_id"],
      });
      if (customdata.length > 0) {
        customdata.forEach(async (val) => {
          await Material_Flow.create({
            product_id: val.product_id,
            material_flow_stock: -val.Custom_Product.dataValues.quantity,
            material_flow_info: "User buy this product (custom prescription)",
            stock: val.Product.product_stock,
            stock_total: val.Product.product_stock_total,
          });
        });
      }
      return res.status(200).send(response);
    } catch (err) {
      return res.send(err.message);
    }
  },
  getFinanceReport: async (req, res) => {
    try {
      const {page, limit} = req.query;
      //pagination
      const theLimit = limit ? parseInt(limit) : 10;
      const offsetData = (page ? parseInt(page) - 1 : 0) * theLimit;

      const response1 = await Finance.findAll({
        offset: offsetData,
        limit: theLimit,
      });
      const response2 = await Finance.findAll({
        attributes: [
          [
            sequelize.fn("SUM", sequelize.col("finance_earning")),
            "totalEarning",
          ],
        ],
      });
      //PENDAPATAN PERHARI-BULAN-TAHUN
      const daily = await Finance.findAll({
        attributes: [
          [
            sequelize.fn("SUM", sequelize.col("finance.finance_earning")),
            "pendapatan",
          ],
          [sequelize.fn("DAY", sequelize.col("createdAt")), "day"],
        ],
        group: [[sequelize.col("day")]],
      });
      const monthly = await Finance.findAll({
        attributes: [
          [
            sequelize.fn("SUM", sequelize.col("finance.finance_earning")),
            "pendapatan",
          ],
          [sequelize.fn("MONTH", sequelize.col("createdAt")), "month"],
        ],
        group: [[sequelize.col("month")]],
      });
      const yearly = await Finance.findAll({
        attributes: [
          [
            sequelize.fn("SUM", sequelize.col("finance.finance_earning")),
            "pendapatan",
          ],
          [sequelize.fn("YEAR", sequelize.col("createdAt")), "year"],
        ],
        group: [[sequelize.col("year")]],
      });

      const getUser = await Transaction.findAll({
        where: {
          transaction_invoice_number: response1.map(
            (val) => val.transaction_invoice_number
          ),
        },
        attributes: ["createdAt"],
        group: ["transaction_invoice_number"],
        include: [{model: User, attributes: ["user_username", "is_banned"]}],
      });

      const bestData = await Transaction.findAll({
        where: {order_status_id: 5},
        group: ["product_id"],
        attributes: [
          "transaction.product_id",
          [
            sequelize.fn("COUNT", sequelize.col("transaction.product_id")),
            "sold",
          ],
        ],
        limit: 3,
        order: [[sequelize.col("sold"), "DESC"]],
        include: [
          {
            model: Product,
            attributes: {
              exclude: ["products.product_id", "createdAt", "updatedAt"],
            },
          },
        ],
      });
      return res
        .status(200)
        .send([
          {...response2},
          response1,
          getUser,
          bestData,
          daily,
          monthly,
          yearly,
        ]);
    } catch (err) {
      return res.send(err.message);
    }
  },
  getAllUserInfo: async (req, res) => {
    try {
      const {page, limit, search} = req.query;
      //pagination
      const theLimit = limit ? parseInt(limit) : 10;
      const offsetData = parseInt((page ? page : 1) - 1) * theLimit;

      const response = await User.findAll({
        where: {user_username: {[Op.substring]: `${search ? search : ""}`}},
        offset: offsetData,
        limit: theLimit,
        attributes: {
          exclude: [
            "user_password",
            "user_security_question",
            "createdAt",
            "updatedAt",
          ],
        },
      });

      return res.status(200).send(response);
    } catch (err) {
      return res.send(err);
    }
  },
  changeUserBannedStatus: async (req, res) => {
    try {
      const {user_id} = req.body;
      await User.update(
        {is_banned: 1},
        {
          where: {user_id: user_id},
        }
      );

      return res.status(200).send({message: "This user successfully banned"});
    } catch (err) {
      return res.send(err.message);
    }
  },
  getNotifAdmin: async (req, res) => {
    try {
      const {page, limit, select} = req.query;

      const theLimit = limit ? parseInt(limit) : 10;
      const offsetData = (page ? parseInt(page) - 1 : 0) * theLimit;
      console.log(offsetData, theLimit);
      let response;
      if (select) {
        response = await Admin_Notif.findAll({
          where: {
            // 0 = belum ke read
            admin_notif_status: 0,
          },
          offset: offsetData,
          limit: theLimit,
          order: [["createdAt", "DESC"]],
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
          offset: offsetData,
          limit: theLimit,
          order: [["createdAt", "DESC"]],
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
  changeNotifAdmin: async (req, res) => {
    try {
      const {admin_notif_id, markAll} = req.body;

      let response;
      if (markAll) {
        response = await Admin_Notif.update(
          {admin_notif_status: 1},
          {
            where: {
              admin_notif_status: 0,
            },
          }
        );
      } else {
        response = await Admin_Notif.update(
          {admin_notif_status: 1},
          {
            where: {
              admin_notif_id,
            },
          }
        );
      }

      return res.status(200).send(response);
    } catch (err) {
      return res
        .status(500)
        .send({message: "Failed to get admin notification"});
    }
  },
};
