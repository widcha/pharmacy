"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Transaction extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of DataTypes lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.User, { foreignKey: "user_id" });
			this.belongsTo(models.Product, {
				foreignKey: "product_id",
			});
			this.belongsTo(models.Order_Status, {
				foreignKey: "order_status_id",
			});
			this.hasMany(models.Payment_Images, {
				foreignKey: "transaction_invoice_number",
				onDelete: "cascade",
			});
			this.hasMany(models.Finance, {
				foreignKey: "transaction_invoice_number",
				onDelete: "cascade",
			});
		}
	}
	Transaction.init(
		{
			transaction_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			user_id: {
				type: DataTypes.INTEGER,
				references: {
					model: "users",
					key: "user_id",
				},
			},
			transaction_date: {
				type: DataTypes.STRING,
			},
			transaction_invoice_number: {
				type: DataTypes.INTEGER,
			},
			order_status_id: {
				type: DataTypes.INTEGER,
				references: {
					model: "order_status",
					key: "order_status_id",
				},
			},
			product_id: {
				type: DataTypes.INTEGER,
				references: {
					model: "products",
					key: "product_id",
				},
			},
			product_name: {
				type: DataTypes.STRING,
			},
			transaction_pharmacist_notes: {
				type: DataTypes.STRING,
			},
			transaction_payment_details: {
				type: DataTypes.STRING,
			},
			user_address: {
				type: DataTypes.STRING,
			},
			payment_method_id: {
				type: DataTypes.INTEGER,
				references: { model: "Payment_Method", key: "payment_method_id" },
			},
		},
		{
			sequelize,
			modelName: "Transaction",
		}
	);
	return Transaction;
};
