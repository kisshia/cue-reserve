const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const { authenticate } = require('../middlewares/auth');

const router = express.Router();

// Auth routes (public)
router.post('/register', authController.register);
router.post('/login', authController.login);

// User profile routes (protected)
router.get('/me', authenticate, authController.getCurrentUser);
router.get('/profile', authenticate, userController.getUserProfile);
router.put('/profile', authenticate, userController.updateUserProfile);
router.post('/change-password', authenticate, userController.changePassword);

// Admin routes
router.get('/', authenticate, userController.getAllUsers);

module.exports = router;
