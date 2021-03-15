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
			this.belongsTo(models.Transaction, {
				foreignKey: "transaction_invoice_number",
			});
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
			finance_date: { allowNull: false, type: DataTypes.DATE },
			transaction_invoice_number: {
				allowNull: false,
				type: DataTypes.STRING,
				references: {
					model: "transactions",
					key: "transaction_invoice_number",
				},
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
