'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Custom_Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Custom_Order.init({
    custom_order_uid: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    product_qty: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Custom_Order',
  });
  return Custom_Order;
};