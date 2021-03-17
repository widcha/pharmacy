"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Recipes", {
			recipes_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			user_id: { allowNull: false, type: Sequelize.INTEGER },
			recipes_image_path: { allowNull: false, type: Sequelize.STRING },
			recipes_status: { allowNull: false, type: Sequelize.STRING },
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
		await queryInterface.dropTable("Recipes");
	},
};
