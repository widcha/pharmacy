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
      // this.hasMany(models.Cart, {
      // 	foreignKey: "custom_product_uid",
      // });
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
      custom_product_qty: {
        type: DataTypes.INTEGER,
      },
      custom_product_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Custom_Product",
    }
  );
  return Custom_Product;
};
