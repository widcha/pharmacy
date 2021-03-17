"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Finances", {
			finance_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			finance_date: { allowNull: false, type: Sequelize.DATE },
			transaction_invoice_number: {
				allowNull: false,
				type: Sequelize.STRING,
				references: {
					model: "transactions",
					key: "transaction_invoice_number",
				},
			},
			finance_earning: { allowNull: false, type: Sequelize.INTEGER },
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
		await queryInterface.dropTable("Finances");
	},
};
