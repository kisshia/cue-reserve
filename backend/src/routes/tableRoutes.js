const express = require('express');
const tableController = require('../controllers/tableController');
const { authenticate } = require('../middlewares/auth');

const router = express.Router();

// Public routes
router.get('/', tableController.getAllTables);
router.get('/:id', tableController.getTableById);

// Protected routes
router.post('/', authenticate, tableController.createTable);
router.put('/:id', authenticate, tableController.updateTable);
router.delete('/:id', authenticate, tableController.deleteTable);

module.exports = router;
