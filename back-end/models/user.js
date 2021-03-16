"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of DataTypes lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.hasMany(models.User_Address, {
				foreignKey: "user_id",
				onDelete: "cascade",
			});
			this.hasMany(models.Cart, {
				foreignKey: "user_id",
				onDelete: "cascade",
			});
			this.hasMany(models.Transaction, {
				foreignKey: "user_id",
				onDelete: "cascade",
			});
			this.hasMany(models.Recipes, {
				foreignKey: "user_id",
				onDelete: "cascade",
			});
		}
	}
	User.init(
		{
			user_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			user_username: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			user_email: {
				type: DataTypes.STRING,
			},
			user_password: {
				type: DataTypes.STRING,
			},
			user_role_id: {
				type: DataTypes.INTEGER,
			},
			user_isverified: {
				type: DataTypes.INTEGER,
			},
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
