const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// User routes
router.post('/place', authMiddleware, orderController.placeOrder);
router.get('/my-orders', authMiddleware, orderController.getMyOrders);
router.get('/:id/details', authMiddleware, orderController.getOrderDetails);

// Admin routes
router.get('/all', authMiddleware, adminMiddleware, orderController.getAllOrders);
router.put('/:id/status', authMiddleware, adminMiddleware, orderController.updateStatus);
router.get('/stats', authMiddleware, adminMiddleware, orderController.getStats);

module.exports = router;
