"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Recipes extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of DataTypes lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.User, { foreignKey: "user_id" });
		}
	}
	Recipes.init(
		{
			recipes_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			user_id: {
				allowNull: false,
				type: DataTypes.INTEGER,
				references: {
					model: "users",
					key: "user_id",
				}
			},
			recipes_image_path: { allowNull: false, type: DataTypes.STRING },
			recipes_status: { allowNull: false, type: DataTypes.STRING },
		},
		{
			sequelize,
			modelName: "Recipes",
		}
	);
	return Recipes;
};