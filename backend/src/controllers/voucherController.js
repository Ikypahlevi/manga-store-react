const VoucherDAO = require('../models/VoucherDAO');

exports.checkVoucher = async (req, res) => {
    try {
        const { code, orderValue } = req.body;
        const voucher = await VoucherDAO.getVoucherByCode(code);
        
        if (!voucher) {
            return res.status(404).json({ error: 'Mã giảm giá không hợp lệ hoặc đã hết hạn.' });
        }
        
        if (orderValue < voucher.min_order_value) {
            return res.status(400).json({ error: `Đơn hàng phải tối thiểu ${voucher.min_order_value.toLocaleString()}đ để áp dụng mã này.` });
        }
        
        res.json({
            message: 'Áp dụng mã giảm giá thành công!',
            discountPercent: voucher.discount_percent
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
