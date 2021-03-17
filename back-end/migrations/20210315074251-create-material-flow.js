"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Material_Flows", {
			material_flow_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			material_flow_date: { allowNull: false, type: Sequelize.DATE },
			product_id: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: "products",
					key: "product_id",
				},
			},
			material_flow_add_stock: {
				type: Sequelize.INTEGER,
			},
			material_flow_dec_stock: {
				type: Sequelize.INTEGER,
			},
			material_flow_info: {
				type: Sequelize.STRING,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("Material_Flows");
	},
};
