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
			product_name: {
				type: DataTypes.STRING,
			},
			product_price: {
				type: DataTypes.INTEGER,
			},
			product_stock: {
				type: DataTypes.INTEGER,
			},
			product_desc: {
				type: DataTypes.STRING,
			},
			product_date_uploaded: {
				type: DataTypes.STRING,
			},
			product_category_id: {
				type: DataTypes.INTEGER,
				references: {
					model: "product_categories",
					key: "product_category_id",
				},
			},
			product_image_path: {
				type: DataTypes.STRING,
			},
		},
		{
			sequelize,
			modelName: "Product",
		}
	);
	return Product;
};
