"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Carts", {
			cart_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			user_id: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: "users",
					key: "user_id",
				},
			},
			product_id: {
				type: Sequelize.INTEGER,
				references: {
					model: "products",
					key: "product_id",
				},
			},
			product_qty: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			product_price: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			custom_product_uid: {
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
		await queryInterface.dropTable("Carts");
	},
};
