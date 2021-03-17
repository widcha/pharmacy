"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Payment_Method extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of DataTypes lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.hasMany(models.Transaction, {
				foreignKey: "payment_method_id",
				onDelete: "cascade",
			});
		}
	}
	Payment_Method.init(
		{
			payment_method_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			payment_method: {
				type: DataTypes.STRING,
			},
		},
		{
			sequelize,
			modelName: "Payment_Method",
		}
	);
	return Payment_Method;
};
