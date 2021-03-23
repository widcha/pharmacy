"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn("custom_orders", "custom_product_uid", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("carts", "custom_product_uid", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("transactions", "custom_product_uid", {
      type: Sequelize.STRING,
    });
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
