const db = require('../config/db');

class CartDAO {
    static async getCartByUserId(userId) {
        const sql = `
            SELECT c.ma_sach, c.quantity, s.ten_sach, s.gia_tien, s.so_luong as stock, s.hinh_anh 
            FROM cart_items c 
            JOIN sach s ON c.ma_sach = s.ma_sach 
            WHERE c.user_id = ?
        `;
        const [rows] = await db.execute(sql, [userId]);
        const cart = {};
        for (const row of rows) {
            cart[row.ma_sach] = {
                sach: {
                    ma_sach: row.ma_sach,
                    ten_sach: row.ten_sach,
                    gia_tien: row.gia_tien,
                    so_luong: row.stock,
                    hinh_anh: row.hinh_anh
                },
                quantity: row.quantity
            };
        }
        return cart;
    }

    static async addToCart(userId, maSach, quantity) {
        const sql = `
            INSERT INTO cart_items (user_id, ma_sach, quantity) VALUES (?, ?, ?) 
            ON DUPLICATE KEY UPDATE quantity = quantity + ?
        `;
        const [result] = await db.execute(sql, [userId, maSach, quantity, quantity]);
        return result.affectedRows > 0;
    }

    static async updateQuantity(userId, maSach, quantity) {
        const sql = 'UPDATE cart_items SET quantity = ? WHERE user_id = ? AND ma_sach = ?';
        const [result] = await db.execute(sql, [quantity, userId, maSach]);
        return result.affectedRows > 0;
    }

    static async removeFromCart(userId, maSach) {
        const sql = 'DELETE FROM cart_items WHERE user_id = ? AND ma_sach = ?';
        const [result] = await db.execute(sql, [userId, maSach]);
        return result.affectedRows > 0;
    }

    static async clearCart(userId) {
        const sql = 'DELETE FROM cart_items WHERE user_id = ?';
        const [result] = await db.execute(sql, [userId]);
        return result.affectedRows > 0;
    }
}

module.exports = CartDAO;
