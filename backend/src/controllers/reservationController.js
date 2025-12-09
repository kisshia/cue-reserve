const { Reservation, User, Table } = require('../models');

// Get all reservations
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Table, attributes: ['id', 'table_number'] }
      ]
    });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user's reservations
exports.getUserReservations = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const reservations = await Reservation.findAll({
      where: { userId },
      include: [
        { model: Table, attributes: ['id', 'table_number', 'status'] }
      ]
    });
    
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create reservation
exports.createReservation = async (req, res) => {
  try {
    const { date, time_start, time_end, tableId } = req.body;
    const userId = req.user.id;
    
    if (!date || !time_start || !time_end || !tableId) {
      return res.status(400).json({ 
        error: 'Date, start time, end time, and table ID are required' 
      });
    }
    
    const table = await Table.findByPk(tableId);
    if (!table) {
      return res.status(404).json({ error: 'Table not found' });
    }
    
    // Check for conflicting reservations (same table, same date, overlapping time)
    const { Op } = require('sequelize');
    const conflictingReservation = await Reservation.findOne({
      where: {
        tableId,
        date,
        status: 'confirmed',
        [Op.or]: [
          // New reservation starts during existing reservation
          {
            time_start: {
              [Op.lte]: time_start
            },
            time_end: {
              [Op.gt]: time_start
            }
          },
          // New reservation ends during existing reservation
          {
            time_start: {
              [Op.lt]: time_end
            },
            time_end: {
              [Op.gte]: time_end
            }
          },
          // New reservation completely overlaps existing reservation
          {
            time_start: {
              [Op.gte]: time_start
            },
            time_end: {
              [Op.lte]: time_end
            }
          }
        ]
      }
    });
    
    if (conflictingReservation) {
      return res.status(400).json({ 
        error: 'This table is already booked for the selected date and time slot' 
      });
    }
    
    const reservation = await Reservation.create({
      date,
      time_start,
      time_end,
      userId,
      tableId,
      status: 'confirmed'
    });
    
    res.status(201).json({
      message: 'Reservation created successfully',
      reservation
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single reservation
exports.getReservationById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const reservation = await Reservation.findByPk(id, {
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Table, attributes: ['id', 'table_number', 'status'] }
      ]
    });
    
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update reservation
exports.updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, time_start, time_end, status, tableId } = req.body;
    
    const reservation = await Reservation.findByPk(id);
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    
    if (reservation.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }
    
    await reservation.update({
      date: date || reservation.date,
      time_start: time_start || reservation.time_start,
      time_end: time_end || reservation.time_end,
      status: status || reservation.status,
      tableId: tableId || reservation.tableId
    });
    
    res.json({
      message: 'Reservation updated successfully',
      reservation
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cancel reservation
exports.cancelReservation = async (req, res) => {
  try {
    const { id } = req.params;
    
    const reservation = await Reservation.findByPk(id, {
      include: [{ model: Table }]
    });
    
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    
    if (reservation.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }
    
    await reservation.update({ status: 'cancelled' });
    
    res.json({
      message: 'Reservation cancelled successfully',
      reservation
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete reservation
exports.deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    
    const reservation = await Reservation.findByPk(id);
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin only' });
    }
    
    await reservation.destroy();
    
    res.json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Check table availability
exports.checkAvailability = async (req, res) => {
  try {
    const { tableId, date, time_start, time_end } = req.query;
    
    if (!tableId || !date || !time_start || !time_end) {
      return res.status(400).json({ 
        error: 'Table ID, date, start time, and end time are required' 
      });
    }
    
    const table = await Table.findByPk(tableId);
    if (!table) {
      return res.status(404).json({ error: 'Table not found' });
    }
    
    // Check for conflicting reservations
    const { Op } = require('sequelize');
    const conflictingReservation = await Reservation.findOne({
      where: {
        tableId,
        date,
        status: 'confirmed',
        [Op.or]: [
          {
            time_start: {
              [Op.lte]: time_start
            },
            time_end: {
              [Op.gt]: time_start
            }
          },
          {
            time_start: {
              [Op.lt]: time_end
            },
            time_end: {
              [Op.gte]: time_end
            }
          },
          {
            time_start: {
              [Op.gte]: time_start
            },
            time_end: {
              [Op.lte]: time_end
            }
          }
        ]
      }
    });
    
    res.json({
      available: !conflictingReservation,
      table: {
        id: table.id,
        table_number: table.table_number,
        status: table.status
      },
      conflict: conflictingReservation ? {
        date: conflictingReservation.date,
        time_start: conflictingReservation.time_start,
        time_end: conflictingReservation.time_end
      } : null
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
