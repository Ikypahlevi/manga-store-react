const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/avatar', authMiddleware, upload.single('avatar'), userController.uploadAvatar);
router.post('/favorites/toggle', authMiddleware, userController.toggleFavorite);
router.get('/favorites', authMiddleware, userController.getFavorites);

router.get('/vip', authMiddleware, adminMiddleware, userController.getVipUsers);

module.exports = router;
