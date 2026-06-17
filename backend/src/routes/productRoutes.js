const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.get('/:id/related', productController.getRelated);

// Admin routes
router.post('/', authMiddleware, adminMiddleware, upload.single('hinh_anh'), productController.create);
router.put('/:id', authMiddleware, adminMiddleware, upload.single('hinh_anh'), productController.update);
router.delete('/:id', authMiddleware, adminMiddleware, productController.delete);

module.exports = router;
