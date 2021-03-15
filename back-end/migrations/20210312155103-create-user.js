"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Users", {
			user_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			user_username: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			user_email: { allowNull: false, type: Sequelize.STRING },
			user_password: { allowNull: false, type: Sequelize.STRING },
			user_role_id: {
				allowNull: false,
				defaultValue: 2,
				type: Sequelize.INTEGER,
			},
			user_isverified: {
				allowNull: false,
				defaultValue: 0,
				type: Sequelize.INTEGER,
			},
			user_security_question: {
				allowNull: false,
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
		await queryInterface.dropTable("Users");
	},
};
