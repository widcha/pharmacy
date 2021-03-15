"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Order_Status extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of DataTypes lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.hasMany(models.Transaction, {
				foreignKey: "order_status_id",
				onDelete: "cascade",
			});
		}
	}
	Order_Status.init(
		{
			order_status_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			order_status_status: {
				type: DataTypes.STRING,
			},
		},
		{
			sequelize,
			modelName: "Order_Status",
		}
	);
	return Order_Status;
};
