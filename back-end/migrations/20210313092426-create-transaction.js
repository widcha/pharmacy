"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Transactions", {
			transaction_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			user_id: {
				type: Sequelize.INTEGER,
				references: {
					model: "users",
					key: "user_id",
				},
			},
			transaction_date: { allowNull: false, type: Sequelize.DATE },
			transaction_invoice_number: { allowNull: false, type: Sequelize.STRING },
			order_status_id: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: "order_statuses",
					key: "order_status_id",
				},
			},
			product_id: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: "products",
					key: "product_id",
				},
			},
			product_name: { allowNull: false, type: Sequelize.STRING },
			transaction_pharmacist_notes: {
				type: Sequelize.STRING,
			},
			transaction_payment_details: { allowNull: false, type: Sequelize.STRING },
			user_address: { allowNull: false, type: Sequelize.STRING },
			payment_method_id: {
				type: Sequelize.INTEGER,
				references: { model: "payment_methods", key: "payment_method_id" },
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
		await queryInterface.dropTable("Transactions");
	},
};
