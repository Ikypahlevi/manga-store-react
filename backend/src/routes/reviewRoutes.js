const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

router.get('/sach/:maSach', reviewController.getBySachId);
router.post('/', authMiddleware, reviewController.addReview);

// Admin routes
router.get('/pending', authMiddleware, adminMiddleware, reviewController.getPending);
router.put('/:id/approve', authMiddleware, adminMiddleware, reviewController.approve);
router.delete('/:id/reject', authMiddleware, adminMiddleware, reviewController.reject);

module.exports = router;
