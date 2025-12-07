const { Table } = require('../models');

// Get all tables
exports.getAllTables = async (req, res) => {
  try {
    const tables = await Table.findAll();
    res.json(tables);
  } catch (error) {
    console.error('Error fetching tables:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get single table by ID
exports.getTableById = async (req, res) => {
  try {
    const { id } = req.params;
    const table = await Table.findByPk(id);
    
    if (!table) {
      return res.status(404).json({ error: 'Table not found' });
    }
    
    res.json(table);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new table
exports.createTable = async (req, res) => {
  try {
    const { table_number, status } = req.body;
    
    if (!table_number) {
      return res.status(400).json({ error: 'Table number is required' });
    }
    
    const table = await Table.create({
      table_number,
      status: status || 'available'
    });
    
    res.status(201).json({
      message: 'Table created successfully',
      table
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Table number already exists' });
    }
    res.status(500).json({ error: error.message });
  }
};

// Update table
exports.updateTable = async (req, res) => {
  try {
    const { id } = req.params;
    const { table_number, status } = req.body;
    
    const table = await Table.findByPk(id);
    if (!table) {
      return res.status(404).json({ error: 'Table not found' });
    }
    
    await table.update({
      table_number: table_number || table.table_number,
      status: status || table.status
    });
    
    res.json({
      message: 'Table updated successfully',
      table
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete table
exports.deleteTable = async (req, res) => {
  try {
    const { id } = req.params;
    
    const table = await Table.findByPk(id);
    if (!table) {
      return res.status(404).json({ error: 'Table not found' });
    }
    
    await table.destroy();
    
    res.json({ message: 'Table deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
