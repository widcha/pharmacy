"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Custom_Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Cart, {
        foreignKey: "custom_product_id",
      });
      this.hasMany(models.Transaction, {
        foreignKey: "custom_product_id",
      });
      this.belongsTo(models.User, {
        foreignKey: "user_id",
      });
    }
  }
  Custom_Product.init(
    {
      custom_product_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      custom_product_price: {
        type: DataTypes.INTEGER,
      },
      custom_product_qty: {
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "user_id",
        },
      },
    },
    {
      sequelize,
      modelName: "Custom_Product",
    }
  );
  return Custom_Product;
};
