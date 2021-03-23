"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      this.belongsTo(models.Product, {
        foreignKey: "product_id",
      });
      // this.belongsTo(models.Custom_Order, {
      // 	foreignKey: "custom_product_uid",
      // 	onDelete: "cascade",
      // });
    }
  }
  Cart.init(
    {
      cart_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      product_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "products",
          key: "product_id",
        },
      },
      product_qty: {
        type: DataTypes.INTEGER,
      },
      product_price: {
        type: DataTypes.INTEGER,
      },
      custom_product_uid: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
