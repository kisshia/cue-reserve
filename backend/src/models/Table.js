const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Table = sequelize.define('Table', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  table_number: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('available', 'occupied', 'reserved', 'maintenance'),
    defaultValue: 'available'
  }
}, {
  tableName: 'tables'
});

module.exports = Table;
