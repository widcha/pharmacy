"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Payment_Images extends Model {
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
		}
	}
	Payment_Images.init(
		{
			payment_images_id: {
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
			payment_images_image_path: {
				type: DataTypes.STRING,
			},
			transaction_invoice_number: {
				type: DataTypes.INTEGER,
				references: {
					model: "transactions",
					key: "transaction_invoice_number",
				},
			},
		},
		{
			sequelize,
			modelName: "Payment_Images",
		}
	);
	return Payment_Images;
};
