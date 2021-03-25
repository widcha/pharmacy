"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		// await queryInterface.removeColumn(
		// 	"payment_images",
		// 	"transaction_invoice_number"
		// );
		// await queryInterface.removeColumn("finances", "transaction_invoice_number");
		// await queryInterface.removeColumn("finances", "finance_date");
		await queryInterface.removeColumn(
			"user_notifs",
			"transaction_invoice_number"
		);
		await queryInterface.removeColumn(
			"transactions",
			"transaction_invoice_number"
		);
		await queryInterface.addColumn(
			"transactions",
			"transaction_invoice_number",
			{
				type: Sequelize.STRING(500),
				allowNull: false,
			}
		);
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
	},
};
