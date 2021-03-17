"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Material_Flow extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of DataTypes lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.Product, {
				foreignKey: "product_id",
			});
		}
	}
	Material_Flow.init(
		{
			material_flow_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			material_flow_date: { allowNull: false, type: DataTypes.DATE },
			product_id: {
				allowNull: false,
				type: DataTypes.INTEGER,
				references: {
					model: "products",
					key: "product_id",
				},
			},
			material_flow_add_stock: {
				type: DataTypes.INTEGER,
			},
			material_flow_dec_stock: {
				type: DataTypes.INTEGER,
			},
			material_flow_info: {
				type: DataTypes.STRING,
			},
		},
		{
			sequelize,
			modelName: "Material_Flow",
		}
	);
	return Material_Flow;
};
