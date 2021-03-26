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
			this.hasMany(models.Admin_Notif, {
				foreignKey: "user_id",
				onDelete: "cascade",
			});
			this.hasMany(models.User_Notif, {
				foreignKey: "user_id",
				onDelete: "cascade",
			});
			this.hasMany(models.Custom_Product, {
				foreignKey: "user_id",
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
				allowNull: false,
				type: DataTypes.STRING,
			},
			user_email: { allowNull: false, type: DataTypes.STRING },
			user_password: { allowNull: false, type: DataTypes.STRING },
			user_role_id: {
				allowNull: false,
				defaultValue: 2,
				type: DataTypes.INTEGER,
			},
			user_isverified: {
				allowNull: false,
				defaultValue: 0,
				type: DataTypes.INTEGER,
			},
			user_security_question: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			createdAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
			is_banned: {
				allowNull: false,
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
