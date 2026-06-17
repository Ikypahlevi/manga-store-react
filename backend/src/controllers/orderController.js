const OrderDAO = require('../models/OrderDAO');
const CartDAO = require('../models/CartDAO');

exports.placeOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { customerName, customerPhone, customerAddress, voucherCode, discountAmount } = req.body;
        
        const cartMap = await CartDAO.getCartByUserId(userId);
        const cartArray = Object.values(cartMap);
        
        if (cartArray.length === 0) {
            return res.status(400).json({ error: 'Cart is empty' });
        }

        let totalAmount = cartArray.reduce((sum, item) => sum + (item.sach.gia_tien * item.quantity), 0);
        
        if (discountAmount) {
            totalAmount -= discountAmount;
        }

        const order = {
            user_id: userId,
            customer_name: customerName,
            customer_phone: customerPhone,
            customer_address: customerAddress,
            total_amount: totalAmount,
            voucher_code: voucherCode,
            discount_amount: discountAmount
        };

        const success = await OrderDAO.placeOrder(order, cartArray);
        if (success) {
            await CartDAO.clearCart(userId);
            res.json({ message: 'Order placed successfully' });
        } else {
            res.status(500).json({ error: 'Failed to place order' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getMyOrders = async (req, res) => {
    try {
        const orders = await OrderDAO.getOrdersByUserId(req.user.id);
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const { keyword, status } = req.query;
        let orders;
        if (keyword || status) {
            orders = await OrderDAO.searchOrders(keyword, status);
        } else {
            orders = await OrderDAO.getAllOrders();
        }
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getOrderDetails = async (req, res) => {
    try {
        const orderId = parseInt(req.params.id);
        const details = await OrderDAO.getOrderDetails(orderId);
        res.json(details);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateStatus = async (req, res) => {
    try {
        const orderId = parseInt(req.params.id);
        const { status } = req.body;
        const success = await OrderDAO.updateOrderStatus(orderId, status);
        if (success) {
            res.json({ message: 'Status updated' });
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getStats = async (req, res) => {
    try {
        const revenue = await OrderDAO.getMonthlyRevenue();
        const topBooks = await OrderDAO.getTopSellingBooks();
        res.json({ revenue, topBooks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
