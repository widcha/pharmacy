"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Custom_Products", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			custom_product_id: {
				type: Sequelize.INTEGER,
				references: {
					model: "carts",
					key: "custom_product_id",
				},
			},
			product_id: {
				type: Sequelize.INTEGER,
				references: {
					model: "products",
					key: "product_id",
				},
			},
			product_price: {
				type: Sequelize.INTEGER,
			},
			product_qty: {
				type: Sequelize.INTEGER,
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
		await queryInterface.dropTable("Custom_Products");
	},
};
