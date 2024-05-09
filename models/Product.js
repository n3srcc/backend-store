const { DataTypes } = require('sequelize');
const sequelize = require('../sequalize');

const Product = sequelize.define('Product', {
  handle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  sku: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  grams: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
  },
  compare_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  barcode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Product;
