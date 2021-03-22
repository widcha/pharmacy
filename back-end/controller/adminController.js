const {
  Recipes,
  Payment_Images,
  Transaction,
  Product,
  User,
  Material_Flow,
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
      } else if (sort === "NEW" || sort === "") {
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
  getPaymentProof: async (req, res) => {
    try {
      let response;
      const {sort, search, status} = req.query;

      let orderSort;
      if (sort === "OLD") {
        orderSort = [["createdAt", "ASC"]];
      } else if (sort === "NEW" || sort === "") {
        orderSort = [["createdAt", "DESC"]];
      }
      if (status) {
        response = await Transaction.findAll({
          where: {
            order_status_id: `${status}`,
          },
          order: orderSort,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          include: [
            {
              model: Payment_Images,
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
          ],
        });
      } else {
        response = await Transaction.findAll({
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          order: orderSort,
          include: [
            {
              model: Payment_Images,
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
          ],
        });
      }
      return res.status(200).send(response);
    } catch (err) {
      return res.send(err.message);
    }
  },
  changeTransactionStatus: async (req, res) => {
    try {
      const {id} = req.params;
      const {order_status_id} = req.body;
      await Transaction.update(
        {order_status_id},
        {
          where: {
            transaction_invoice_number: id,
          },
        }
      );
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
      if (sort === "OLD") {
        orderSort = [["createdAt", "ASC"]];
      } else if (sort === "NEW" || sort === "") {
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
};
