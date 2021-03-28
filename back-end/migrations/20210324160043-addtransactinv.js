"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // await queryInterface.addColumn(
    // 	"admin_notifs",
    // 	"transaction_invoice_number",
    // 	{
    // 		type: Sequelize.STRING(500),
    // 	}
    // );
    // await queryInterface.addColumn(
    // 	"user_notifs",
    // 	"transaction_invoice_number",
    // 	{
    // 		type: Sequelize.STRING(500),
    // 	}
    // );
    // await queryInterface.addColumn("finances", "transaction_invoice_number", {
    // 	type: Sequelize.STRING(500),
    // });
    // await queryInterface.addColumn(
    // 	"payment_images",
    // 	"transaction_invoice_number",
    // 	{
    // 		type: Sequelize.STRING(500),
    // 	}
    // );
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
