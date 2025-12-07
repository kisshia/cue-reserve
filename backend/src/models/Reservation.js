const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Table = require('./Table');

const Reservation = sequelize.define('Reservation', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  time_start: {
    type: DataTypes.TIME,
    allowNull: false
  },
  time_end: {
    type: DataTypes.TIME,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'completed'),
    defaultValue: 'pending'
  },

  // ADD THESE
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },

  tableId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'tables',
      key: 'id'
    },
    onDelete: 'CASCADE'
  }

}, {
  tableName: 'reservations'
});

module.exports = Reservation;
