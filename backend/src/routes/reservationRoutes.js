const express = require('express');
const reservationController = require('../controllers/reservationController');
const { authenticate } = require('../middlewares/auth');

const router = express.Router();

// Protected routes (must come before /:id to avoid conflicts)
router.get('/my-reservations', authenticate, reservationController.getUserReservations);

// Public routes
router.get('/', reservationController.getAllReservations);
router.get('/:id', reservationController.getReservationById);
router.post('/', authenticate, reservationController.createReservation);
router.put('/:id', authenticate, reservationController.updateReservation);
router.patch('/:id/cancel', authenticate, reservationController.cancelReservation);
router.delete('/:id', authenticate, reservationController.deleteReservation);

module.exports = router;
