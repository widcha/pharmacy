"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Payment_Images", {
			payment_images_id: {
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
			payment_images_image_path: { allowNull: false, type: Sequelize.STRING },
			transaction_invoice_number: {
				allowNull: false,
				type: Sequelize.STRING,
				references: {
					model: "transactions",
					key: "transaction_invoice_number",
				},
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
		await queryInterface.dropTable("Payment_Images");
	},
};
