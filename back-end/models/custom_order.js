"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Custom_Order extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.hasMany(models.Transaction, {
				foreignKey: "custom_product_uid",
				onDelete: "cascade",
			});
			// this.hasMany(models.Cart, {
			// 	foreignKey: "custom_product_uid",
			// 	onDelete: "cascade",
			// });
		}
	}
	Custom_Order.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			custom_product_uid: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			product_id: {
				type: DataTypes.INTEGER,
			},
			product_qty: {
				type: DataTypes.INTEGER,
			},
		},
		{
			sequelize,
			modelName: "Custom_Order",
		}
	);
	return Custom_Order;
};
