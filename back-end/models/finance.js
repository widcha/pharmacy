"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Finance extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of DataTypes lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Finance.init(
		{
			finance_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			transaction_invoice_number: {
				type: DataTypes.STRING(500),
			},
			finance_earning: { allowNull: false, type: DataTypes.INTEGER },
		},
		{
			sequelize,
			modelName: "Finance",
		}
	);
	return Finance;
};
