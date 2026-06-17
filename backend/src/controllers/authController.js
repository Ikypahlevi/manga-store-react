const UserDAO = require('../models/UserDAO');
const CartDAO = require('../models/CartDAO');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await UserDAO.checkLogin(username, password);
        if (user) {
            const token = jwt.sign(
                { id: user.id, username: user.username, role: user.role },
                process.env.JWT_SECRET || 'my_secret_key',
                { expiresIn: '1d' }
            );
            
            // Optionally merge cart if guest cart was sent from frontend
            const { guestCart } = req.body; // format: [{ maSach, quantity }]
            if (guestCart && Array.isArray(guestCart)) {
                for (const item of guestCart) {
                    await CartDAO.addToCart(user.id, item.maSach, item.quantity);
                }
            }
            
            res.json({
                message: 'Login successful',
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    role: user.role,
                    mangaCoin: user.manga_coin,
                    rankTier: user.rank_tier,
                    avatar: user.avatar
                }
            });
        } else {
            res.status(401).json({ error: 'Sai tên đăng nhập hoặc mật khẩu!' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.register = async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password || password.length < 3) {
        return res.status(400).json({ error: 'Mật khẩu phải chứa ít nhất 3 ký tự!' });
    }

    try {
        const exists = await UserDAO.isUsernameExists(username);
        if (exists) {
            return res.status(400).json({ error: 'Tên đăng nhập đã tồn tại trong hệ thống!' });
        }

        const success = await UserDAO.register(username, password);
        if (success) {
            res.json({ message: 'Đăng ký tài khoản thành công! Vui lòng đăng nhập.' });
        } else {
            res.status(500).json({ error: 'Có lỗi xảy ra trong quá trình đăng ký, vui lòng thử lại!' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getMe = async (req, res) => {
    try {
        const user = await UserDAO.findById(req.user.id);
        if (user) {
            res.json({
                user: {
                    id: user.id,
                    username: user.username,
                    role: user.role,
                    mangaCoin: user.manga_coin,
                    rankTier: user.rank_tier,
                    avatar: user.avatar
                }
            });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
