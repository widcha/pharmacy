"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Admin_Notifs", {
			admin_notif_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			admin_notif_messages: { allowNull: false, type: Sequelize.STRING },
			admin_notif_status: { allowNull: false, type: Sequelize.INTEGER },
			user_id: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: "users",
					key: "user_id",
				},
			},
			transaction_invoice_number: {
				type: Sequelize.STRING,
				references: {
					model: "transactions",
					key: "transaction_invoice_number",
				},
			},
			order_status_id: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: "order_statuses",
					key: "order_status_id",
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
		await queryInterface.dropTable("Admin_Notifs");
	},
};
