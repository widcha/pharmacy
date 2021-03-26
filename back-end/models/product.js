"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Product_Category, {
        foreignKey: "product_category_id",
      });
      this.hasMany(models.Cart, {
        foreignKey: "product_id",
        onDelete: "cascade",
      });
      this.hasMany(models.Transaction, {
        foreignKey: "product_id",
        onDelete: "cascade",
      });
      this.hasMany(models.Material_Flow, {
        foreignKey: "product_id",
        onDelete: "cascade",
      });
    }
  }
  Product.init(
    {
      product_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      product_name: { allowNull: false, type: DataTypes.STRING },
      product_price: { allowNull: false, type: DataTypes.INTEGER },
      product_stock: { allowNull: false, type: DataTypes.INTEGER },
      product_vol: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      product_stock_total: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      product_desc: {
        type: DataTypes.STRING(500),
      },
      product_category_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "product_categories",
          key: "product_category_id",
        },
      },
      product_image_path: {
        type: DataTypes.STRING(500),
      },
      product_is_available: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_is_available: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price_per_ml: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
