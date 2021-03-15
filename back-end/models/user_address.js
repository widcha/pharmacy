"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User_Address extends Model {
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
	User_Address.init(
		{
			user_address_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			user_address: {
				type: DataTypes.STRING,
			},
			user_id: {
				type: DataTypes.INTEGER,
				references: {
					model: "users",
					key: "user_id",
				},
			},
		},
		{
			sequelize,
			modelName: "User_Address",
		}
	);
	return User_Address;
};
