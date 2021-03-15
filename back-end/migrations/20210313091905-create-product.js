"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Products", {
			product_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			product_name: { allowNull: false, type: Sequelize.STRING },
			product_price: { allowNull: false, type: Sequelize.INTEGER },
			product_stock: { allowNull: false, type: Sequelize.INTEGER },
			product_vol: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			product_stock_total: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			product_desc: {
				type: Sequelize.STRING(500),
			},
			product_category_id: {
				type: Sequelize.INTEGER,
				references: {
					model: "product_categories",
					key: "product_category_id",
				},
			},
			product_image_path: {
				type: Sequelize.STRING(500),
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
		await queryInterface.dropTable("Products");
	},
};
