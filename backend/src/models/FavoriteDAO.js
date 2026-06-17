const db = require('../config/db');

class FavoriteDAO {
    static async isFavorite(userId, maSach) {
        const sql = 'SELECT id FROM favorites WHERE user_id = ? AND ma_sach = ?';
        const [rows] = await db.execute(sql, [userId, maSach]);
        return rows.length > 0;
    }

    static async toggleFavorite(userId, maSach) {
        const isFav = await this.isFavorite(userId, maSach);
        if (isFav) {
            const sql = 'DELETE FROM favorites WHERE user_id = ? AND ma_sach = ?';
            await db.execute(sql, [userId, maSach]);
            return false;
        } else {
            const sql = 'INSERT INTO favorites (user_id, ma_sach) VALUES (?, ?)';
            await db.execute(sql, [userId, maSach]);
            return true;
        }
    }

    static async getUserFavorites(userId) {
        const sql = `
            SELECT s.* FROM favorites f 
            JOIN sach s ON f.ma_sach = s.ma_sach 
            WHERE f.user_id = ? ORDER BY f.created_at DESC
        `;
        const [rows] = await db.execute(sql, [userId]);
        return rows;
    }

    static async getTopFavorites() {
        const sql = `
            SELECT s.ten_sach, COUNT(f.id) as total_fav 
            FROM favorites f 
            JOIN sach s ON f.ma_sach = s.ma_sach 
            GROUP BY f.ma_sach, s.ten_sach 
            ORDER BY total_fav DESC LIMIT 5
        `;
        const [rows] = await db.execute(sql);
        const map = {};
        for (const row of rows) {
            map[row.ten_sach] = row.total_fav;
        }
        return map;
    }
}

module.exports = FavoriteDAO;
