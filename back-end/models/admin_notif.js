"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Admin_Notif extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of DataTypes lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.User, {
				foreignKey: "user_id",
			});
			this.belongsTo(models.Transaction, {
				foreignKey: "transaction_invoice_number",
			});
			this.belongsTo(models.Order_Status, {
				foreignKey: "order_status_id",
			});
		}
	}
	Admin_Notif.init(
		{
			admin_notif_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			admin_notif_messages: { allowNull: false, type: DataTypes.STRING },
			admin_notif_status: { allowNull: false, type: DataTypes.INTEGER },
			user_id: {
				allowNull: false,
				type: DataTypes.INTEGER,
				references: {
					model: "users",
					key: "user_id",
				},
			},
			transaction_invoice_number: {
				type: DataTypes.STRING,
				references: {
					model: "transactions",
					key: "transaction_invoice_number",
				},
			},
			order_status_id: {
				allowNull: false,
				type: DataTypes.INTEGER,
				references: {
					model: "order_statuses",
					key: "order_status_id",
				},
			},
		},
		{
			sequelize,
			modelName: "Admin_Notif",
		}
	);
	return Admin_Notif;
};
