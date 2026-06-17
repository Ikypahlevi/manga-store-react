const db = require('../config/db');

class OrderDAO {
    static async placeOrder(order, cartArray) {
        let connection;
        try {
            connection = await db.getConnection();
            await connection.beginTransaction();

            const [orderResult] = await connection.execute(
                'INSERT INTO orders (user_id, customer_name, customer_phone, customer_address, total_amount, status, voucher_code, discount_amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [order.user_id, order.customer_name, order.customer_phone, order.customer_address, order.total_amount, 'PENDING', order.voucher_code || null, order.discount_amount || 0]
            );

            const orderId = orderResult.insertId;

            for (const item of cartArray) {
                const maSach = item.sach.ma_sach || item.sach.maSach;
                const qty = item.quantity;
                const price = item.sach.gia_tien || item.sach.giaTien;

                await connection.execute(
                    'INSERT INTO order_details (order_id, ma_sach, quantity, price) VALUES (?, ?, ?, ?)',
                    [orderId, maSach, qty, price]
                );

                await connection.execute(
                    'UPDATE sach SET so_luong = so_luong - ? WHERE ma_sach = ?',
                    [qty, maSach]
                );
            }

            await connection.commit();
            return true;
        } catch (error) {
            if (connection) {
                await connection.rollback();
            }
            console.error('Transaction Error:', error);
            return false;
        } finally {
            if (connection) {
                connection.release();
            }
        }
    }

    static async getOrdersByUserId(userId) {
        const [rows] = await db.execute('SELECT * FROM orders WHERE user_id = ? ORDER BY order_date DESC', [userId]);
        return rows;
    }

    static async getAllOrders() {
        const [rows] = await db.execute('SELECT * FROM orders ORDER BY order_date DESC');
        return rows;
    }

    static async searchOrders(keyword, status) {
        let sql = 'SELECT * FROM orders WHERE 1=1';
        let params = [];

        if (keyword && keyword.trim() !== '') {
            sql += ' AND (customer_name LIKE ? OR customer_phone LIKE ?)';
            params.push('%' + keyword.trim() + '%', '%' + keyword.trim() + '%');
        }
        if (status && status.trim() !== '' && status !== 'ALL') {
            sql += ' AND status = ?';
            params.push(status);
        }
        sql += ' ORDER BY order_date DESC';

        const [rows] = await db.execute(sql, params);
        return rows;
    }

    static async getOrderDetails(orderId) {
        const sql = `
            SELECT od.*, s.ten_sach, s.hinh_anh 
            FROM order_details od 
            JOIN sach s ON od.ma_sach = s.ma_sach 
            WHERE od.order_id = ?
        `;
        const [rows] = await db.execute(sql, [orderId]);
        return rows.map(r => ({
            id: r.id,
            order_id: r.order_id,
            ma_sach: r.ma_sach,
            quantity: r.quantity,
            price: r.price,
            sach: {
                ten_sach: r.ten_sach,
                hinh_anh: r.hinh_anh
            }
        }));
    }

    static async updateOrderStatus(orderId, status) {
        const [result] = await db.execute('UPDATE orders SET status = ? WHERE id = ?', [status, orderId]);
        return result.affectedRows > 0;
    }

    static async getUserIdByOrderId(orderId) {
        const [rows] = await db.execute('SELECT user_id FROM orders WHERE id = ?', [orderId]);
        return rows.length > 0 ? rows[0].user_id : -1;
    }

    static async getMonthlyRevenue() {
        const map = {};
        for (let i = 1; i <= 12; i++) {
            map['Tháng ' + i] = 0.0;
        }

        const sql = `
            SELECT MONTH(o.order_date) as m, SUM(o.total_amount) as total 
            FROM orders o JOIN Users u ON o.user_id = u.id 
            WHERE o.status = 'COMPLETED' AND YEAR(o.order_date) = YEAR(CURRENT_DATE) AND u.role != 'ADMIN' 
            GROUP BY MONTH(o.order_date)
        `;
        const [rows] = await db.execute(sql);
        for (const row of rows) {
            map['Tháng ' + row.m] = parseFloat(row.total);
        }
        return map;
    }

    static async getTopSellingBooks() {
        const map = {};
        const sql = `
            SELECT s.ten_sach, SUM(od.quantity) as total_qty 
            FROM order_details od 
            JOIN sach s ON od.ma_sach = s.ma_sach 
            JOIN orders o ON od.order_id = o.id 
            JOIN Users u ON o.user_id = u.id 
            WHERE o.status = 'COMPLETED' AND u.role != 'ADMIN' 
            GROUP BY s.ten_sach 
            ORDER BY total_qty DESC LIMIT 5
        `;
        const [rows] = await db.execute(sql);
        for (const row of rows) {
            map[row.ten_sach] = parseInt(row.total_qty);
        }
        return map;
    }
}

module.exports = OrderDAO;
