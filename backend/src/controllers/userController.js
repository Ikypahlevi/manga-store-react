const UserDAO = require('../models/UserDAO');
const FavoriteDAO = require('../models/FavoriteDAO');

exports.uploadAvatar = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const avatarPath = `/uploads/${req.file.filename}`;
        const success = await UserDAO.updateAvatar(req.user.id, avatarPath);
        if (success) {
            res.json({ message: 'Avatar updated', avatar: avatarPath });
        } else {
            res.status(500).json({ error: 'Failed to update avatar' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getVipUsers = async (req, res) => {
    try {
        const vipUsers = await UserDAO.getTopVipUsers();
        res.json(vipUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.toggleFavorite = async (req, res) => {
    try {
        const maSach = parseInt(req.body.maSach);
        const isFavorite = await FavoriteDAO.toggleFavorite(req.user.id, maSach);
        res.json({ isFavorite, message: isFavorite ? 'Added to favorites' : 'Removed from favorites' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getFavorites = async (req, res) => {
    try {
        const favorites = await FavoriteDAO.getUserFavorites(req.user.id);
        res.json(favorites);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.spinGacha = async (req, res) => {
    try {
        const user = await UserDAO.findById(req.user.id);
        if (!user || user.manga_coin < 100) {
            return res.status(400).json({ error: 'Không đủ xu để quay!' });
        }
        
        // Trừ 100 xu
        let newCoins = user.manga_coin - 100;
        
        // Random logic (same as frontend)
        const rewards = [
            { name: 'Khóa móc khóa Naruto', image: 'naruto.jpg', coinValue: 0 },
            { name: '1000 Manga Coin', image: 'coin.jpg', coinValue: 1000 },
            { name: 'Chúc bạn may mắn lần sau', image: 'miss.jpg', coinValue: 0 }
        ];
        
        const targetIndex = Math.floor(Math.random() * rewards.length);
        const reward = rewards[targetIndex];
        
        newCoins += reward.coinValue;
        
        await UserDAO.updateCoinAndRank(user.id, newCoins, user.rank_tier);
        
        res.json({
            success: true,
            reward: reward,
            newCoins: newCoins
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
