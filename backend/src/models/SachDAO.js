const db = require('../config/db');

class SachDAO {
    static async getAll() {
        const [rows] = await db.execute('SELECT * FROM sach');
        return rows;
    }

    static async findByMaSach(masach) {
        const [rows] = await db.execute('SELECT * FROM sach WHERE ma_sach = ?', [masach]);
        return rows.length > 0 ? rows[0] : null;
    }

    static async update(sach) {
        const sql = `UPDATE sach SET ten_sach = ?, gia_tien = ?, so_luong = ?, hinh_anh = ?, mo_ta = ?, trailer_url = ?, the_loai = ? WHERE ma_sach = ?`;
        const [result] = await db.execute(sql, [
            sach.ten_sach, sach.gia_tien, sach.so_luong, sach.hinh_anh, sach.mo_ta, sach.trailer_url, sach.the_loai, sach.ma_sach
        ]);
        return result.affectedRows > 0;
    }

    static async insert(sach) {
        const sql = `INSERT INTO sach (ten_sach, gia_tien, so_luong, hinh_anh, mo_ta, trailer_url, the_loai) VALUES (?,?,?,?,?,?,?)`;
        const [result] = await db.execute(sql, [
            sach.ten_sach, sach.gia_tien, sach.so_luong, sach.hinh_anh, sach.mo_ta, sach.trailer_url, sach.the_loai
        ]);
        return result.insertId;
    }

    static async delete(masach) {
        const sql = `DELETE FROM sach WHERE ma_sach = ?`;
        const [result] = await db.execute(sql, [masach]);
        return result.affectedRows > 0;
    }

    static async getTotalSach(minPrice, maxPrice, keyword, category) {
        let sql = 'SELECT COUNT(*) as count FROM sach WHERE 1=1';
        let params = [];
        
        if (minPrice != null) { sql += ' AND gia_tien >= ?'; params.push(minPrice); }
        if (maxPrice != null) { sql += ' AND gia_tien <= ?'; params.push(maxPrice); }
        if (keyword && keyword.trim() !== '') { sql += ' AND ten_sach LIKE ?'; params.push('%' + keyword + '%'); }
        if (category && category.trim() !== '' && category !== 'Tất cả') { sql += ' AND the_loai = ?'; params.push(category); }
        
        const [rows] = await db.execute(sql, params);
        return rows[0].count;
    }

    static async getSachByPage(offset, limit, minPrice, maxPrice, keyword, category) {
        let sql = 'SELECT * FROM sach WHERE 1=1';
        let params = [];
        
        if (minPrice != null) { sql += ' AND gia_tien >= ?'; params.push(minPrice); }
        if (maxPrice != null) { sql += ' AND gia_tien <= ?'; params.push(maxPrice); }
        if (keyword && keyword.trim() !== '') { sql += ' AND ten_sach LIKE ?'; params.push('%' + keyword + '%'); }
        if (category && category.trim() !== '' && category !== 'Tất cả') { sql += ' AND the_loai = ?'; params.push(category); }
        
        sql += ' LIMIT ? OFFSET ?';
        params.push(limit.toString(), offset.toString()); 
        // mysql2 handles limit/offset properly when passed as strings or with specific config, but it's safer to let the db connection handle numeric limits.

        // Actually mysql2 execute requires numbers to be parsed properly if we pass them to limit/offset depending on connection settings. 
        // We'll use format or explicit string conversion might fail. Let's just use parseInt and ensure they are numbers.
        const [rows] = await db.query(sql, params.map(p => typeof p === 'string' && !isNaN(p) && sql.includes('LIMIT') ? parseInt(p) : p));
        // Wait, a better way for limit/offset is just passing numbers, but db.execute can sometimes be strict with LIMIT ?.
        return rows;
    }

    static async getRelatedSach(excludeMaSach, limit) {
        // Warning: ORDER BY RAND() is slow but matching Java code
        const sql = 'SELECT * FROM sach WHERE ma_sach != ? ORDER BY RAND() LIMIT ?';
        // using db.query for LIMIT ? placeholder safety in mysql2
        const [rows] = await db.query(sql, [excludeMaSach, parseInt(limit)]);
        return rows;
    }
}

module.exports = SachDAO;
