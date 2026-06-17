const db = require('../config/db');

class ReviewDAO {
    static async getReviewsBySachId(maSach) {
        const sql = `
            SELECT r.*, u.username FROM reviews r 
            JOIN Users u ON r.user_id = u.id 
            WHERE r.ma_sach = ? AND r.is_approved = 1 ORDER BY r.created_at DESC
        `;
        const [rows] = await db.execute(sql, [maSach]);
        return rows;
    }

    static async addReview(maSach, userId, rating, comment) {
        const sql = 'INSERT INTO reviews (ma_sach, user_id, rating, comment) VALUES (?, ?, ?, ?)';
        const [result] = await db.execute(sql, [maSach, userId, rating, comment]);
        return result.affectedRows > 0;
    }

    static async getAllPendingReviews() {
        const sql = `
            SELECT r.*, u.username FROM reviews r 
            JOIN Users u ON r.user_id = u.id 
            WHERE r.is_approved = 0 ORDER BY r.created_at DESC
        `;
        const [rows] = await db.execute(sql);
        return rows;
    }

    static async approveReview(reviewId) {
        const sql = 'UPDATE reviews SET is_approved = 1 WHERE ma_review = ?';
        const [result] = await db.execute(sql, [reviewId]);
        return result.affectedRows > 0;
    }

    static async rejectReview(reviewId) {
        const sql = 'DELETE FROM reviews WHERE ma_review = ?';
        const [result] = await db.execute(sql, [reviewId]);
        return result.affectedRows > 0;
    }
}

module.exports = ReviewDAO;
