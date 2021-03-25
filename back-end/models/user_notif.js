"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_Notif extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      this.belongsTo(models.Order_Status, {
        foreignKey: "order_status_id",
      });
    }
  }
  User_Notif.init(
    {
      user_notif_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_notif_messages: {allowNull: false, type: DataTypes.STRING},
      user_notif_status: {allowNull: false, type: DataTypes.INTEGER},
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      transaction_invoice_number: {
        type: DataTypes.STRING(500),
      },
      order_status_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "order_statuses",
          key: "order_status_id",
        },
      },
    },
    {
      sequelize,
      modelName: "User_Notif",
    }
  );
  return User_Notif;
};
