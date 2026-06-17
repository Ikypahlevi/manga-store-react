const db = require('../config/db');

class NotificationDAO {
    static async addNotification(userId, message) {
        const sql = 'INSERT INTO notifications (user_id, message) VALUES (?, ?)';
        await db.execute(sql, [userId, message]);
    }

    static async getUnreadNotifications(userId) {
        const sql = 'SELECT * FROM notifications WHERE user_id = ? AND is_read = FALSE ORDER BY created_at DESC';
        const [rows] = await db.execute(sql, [userId]);
        return rows;
    }

    static async markAsRead(notificationId) {
        const sql = 'UPDATE notifications SET is_read = TRUE WHERE id = ?';
        await db.execute(sql, [notificationId]);
    }
}

module.exports = NotificationDAO;
