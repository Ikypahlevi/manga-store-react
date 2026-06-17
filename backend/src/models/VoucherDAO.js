const db = require('../config/db');

class VoucherDAO {
    static async getVoucherByCode(code) {
        const sql = 'SELECT * FROM vouchers WHERE ma_voucher = ? AND is_active = TRUE';
        const [rows] = await db.execute(sql, [code.toUpperCase()]);
        return rows.length > 0 ? rows[0] : null;
    }
}

module.exports = VoucherDAO;
