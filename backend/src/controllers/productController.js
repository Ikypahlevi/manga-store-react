const SachDAO = require('../models/SachDAO');

const mapProduct = (s) => {
    let imgPath = s.hinh_anh || '';
    if (imgPath && !imgPath.startsWith('/')) {
        imgPath = imgPath.startsWith('img/') ? '/' + imgPath : '/img/' + imgPath;
    }
    return {
        _id: s.ma_sach,
        name: s.ten_sach,
        price: s.gia_tien,
        stock: s.so_luong,
        image: imgPath,
        description: s.mo_ta,
        category: s.the_loai,
        trailer_url: s.trailer_url
    };
};

exports.getAll = async (req, res) => {
    try {
        const { minPrice, maxPrice, keyword, category, page, limit } = req.query;
        
        if (page && limit) {
            const pageNum = parseInt(page) || 1;
            const limitNum = parseInt(limit) || 12;
            const offset = (pageNum - 1) * limitNum;
            
            const total = await SachDAO.getTotalSach(minPrice, maxPrice, keyword, category);
            const data = await SachDAO.getSachByPage(offset, limitNum, minPrice, maxPrice, keyword, category);
            
            res.json({
                success: true,
                products: data.map(mapProduct),
                total,
                page: pageNum,
                totalPages: Math.ceil(total / limitNum)
            });
        } else {
            const data = await SachDAO.getAll();
            res.json({ success: true, products: data.map(mapProduct) });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

exports.getById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const sach = await SachDAO.findByMaSach(id);
        if (sach) {
            res.json({ success: true, product: mapProduct(sach) });
        } else {
            res.status(404).json({ success: false, error: 'Sách không tồn tại' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

exports.getRelated = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const limit = parseInt(req.query.limit) || 4;
        const data = await SachDAO.getRelatedSach(id, limit);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.create = async (req, res) => {
    try {
        const sach = req.body;
        if (req.file) {
            sach.hinh_anh = `/uploads/${req.file.filename}`;
        }
        const insertId = await SachDAO.insert(sach);
        res.status(201).json({ id: insertId, message: 'Thêm sách thành công' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.update = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const sach = req.body;
        sach.ma_sach = id;
        
        if (req.file) {
            sach.hinh_anh = `/uploads/${req.file.filename}`;
        }

        const success = await SachDAO.update(sach);
        if (success) {
            res.json({ message: 'Cập nhật thành công' });
        } else {
            res.status(404).json({ error: 'Không tìm thấy sách để cập nhật' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.delete = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const success = await SachDAO.delete(id);
        if (success) {
            res.json({ message: 'Xóa sách thành công' });
        } else {
            res.status(404).json({ error: 'Không tìm thấy sách để xóa' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
