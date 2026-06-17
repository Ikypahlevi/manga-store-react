const CartDAO = require('../models/CartDAO');

exports.getCart = async (req, res) => {
    try {
        const cart = await CartDAO.getCartByUserId(req.user.id);
        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const { maSach, quantity } = req.body;
        const success = await CartDAO.addToCart(req.user.id, maSach, quantity);
        if (success) {
            res.json({ message: 'Added to cart' });
        } else {
            res.status(400).json({ error: 'Failed to add to cart' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateQuantity = async (req, res) => {
    try {
        const { maSach, quantity } = req.body;
        const success = await CartDAO.updateQuantity(req.user.id, maSach, quantity);
        if (success) {
            res.json({ message: 'Quantity updated' });
        } else {
            res.status(400).json({ error: 'Failed to update quantity' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const { maSach } = req.params;
        const success = await CartDAO.removeFromCart(req.user.id, maSach);
        if (success) {
            res.json({ message: 'Removed from cart' });
        } else {
            res.status(400).json({ error: 'Failed to remove from cart' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.clearCart = async (req, res) => {
    try {
        const success = await CartDAO.clearCart(req.user.id);
        if (success) {
            res.json({ message: 'Cart cleared' });
        } else {
            res.status(400).json({ error: 'Failed to clear cart' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
