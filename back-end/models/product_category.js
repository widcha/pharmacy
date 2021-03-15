"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Product_Category extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of DataTypes lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.hasMany(models.Product, {
				foreignKey: "product_category_id",
				onDelete: "cascade",
			});
		}
	}
	Product_Category.init(
		{
			product_category_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			product_category: {
				type: DataTypes.STRING,
			},
		},
		{
			sequelize,
			modelName: "Product_Category",
		}
	);
	return Product_Category;
};
