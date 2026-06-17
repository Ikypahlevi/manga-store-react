const db = require('../config/db');
const crypto = require('crypto');

class UserDAO {
    static hashPassword(password) {
        return crypto.createHash('sha256').update(password).digest('hex');
    }

    static async checkLogin(username, password) {
        const [rows] = await db.execute('SELECT * FROM Users WHERE username = ?', [username]);
        if (rows.length > 0) {
            const user = rows[0];
            const hashedPassword = this.hashPassword(password);
            
            let isMatch = false;
            let needsUpgrade = false;

            if (user.password === hashedPassword) {
                isMatch = true;
            } else if (user.password === password) { // Backward compatibility
                isMatch = true;
                needsUpgrade = true;
            }

            if (isMatch) {
                if (needsUpgrade) {
                    await this.updatePassword(user.id, hashedPassword);
                    user.password = hashedPassword;
                }
                return user;
            }
        }
        return null;
    }

    static async updatePassword(userId, newHashedPassword) {
        const [result] = await db.execute('UPDATE Users SET password = ? WHERE id = ?', [newHashedPassword, userId]);
        return result.affectedRows > 0;
    }

    static async register(username, password) {
        try {
            const hashedPassword = this.hashPassword(password);
            const [result] = await db.execute(
                "INSERT INTO Users (username, password, role, manga_coin, rank_tier) VALUES (?, ?, 'CUSTOMER', 0, 'TÂN BINH')",
                [username, hashedPassword]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    static async isUsernameExists(username) {
        const [rows] = await db.execute('SELECT 1 FROM Users WHERE username = ?', [username]);
        return rows.length > 0;
    }

    static async updateCoinAndRank(userId, newCoins, newRank) {
        const [result] = await db.execute(
            'UPDATE Users SET manga_coin = ?, rank_tier = ? WHERE id = ?',
            [newCoins, newRank, userId]
        );
        return result.affectedRows > 0;
    }

    static async updateAvatar(userId, avatar) {
        const [result] = await db.execute('UPDATE Users SET avatar = ? WHERE id = ?', [avatar, userId]);
        return result.affectedRows > 0;
    }

    static async findById(userId) {
        const [rows] = await db.execute('SELECT * FROM Users WHERE id = ?', [userId]);
        return rows.length > 0 ? rows[0] : null;
    }

    static async getTopVipUsers() {
        const sql = `
            SELECT u.id, u.username, u.password, u.role, u.manga_coin, u.rank_tier, u.avatar,
                   COALESCE(o_agg.total_spent, 0) as total_spent,
                   COALESCE(od_agg.total_books, 0) as total_books
            FROM Users u
            JOIN (
                SELECT user_id, SUM(total_amount) as total_spent
                FROM orders WHERE status = 'COMPLETED' GROUP BY user_id
            ) o_agg ON u.id = o_agg.user_id
            JOIN (
                SELECT o.user_id, SUM(od.quantity) as total_books
                FROM orders o JOIN order_details od ON o.id = od.order_id
                WHERE o.status = 'COMPLETED' GROUP BY o.user_id
            ) od_agg ON u.id = od_agg.user_id
            WHERE u.role != 'ADMIN' AND (o_agg.total_spent >= 1500000 OR od_agg.total_books >= 50)
            ORDER BY o_agg.total_spent DESC
        `;
        const [rows] = await db.execute(sql);
        return rows;
    }
}

module.exports = UserDAO;
