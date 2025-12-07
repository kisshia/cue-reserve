const User = require('./User');
const Table = require('./Table');
const Reservation = require('./Reservation');

// A user can have many reservations
User.hasMany(Reservation, { foreignKey: 'userId' });
Reservation.belongsTo(User, { foreignKey: 'userId' });

// A table can have many reservations
Table.hasMany(Reservation, { foreignKey: 'tableId' });
Reservation.belongsTo(Table, { foreignKey: 'tableId' });

module.exports = { User, Table, Reservation };
