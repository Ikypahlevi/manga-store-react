import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminAddProduct = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        tenSach: '',
        giaTien: '',
        soLuong: '1',
        theLoai: 'Khác',
        trailerUrl: '',
    });
    const [hinhAnh, setHinhAnh] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setHinhAnh(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const { tenSach, giaTien, soLuong, theLoai, trailerUrl } = formData;
        let errorMsg = '';

        if (!tenSach.trim() || tenSach.trim().length < 3) {
            errorMsg = 'Tên truyện phải từ 3 ký tự!';
        } else if (!giaTien || parseInt(giaTien) < 1000) {
            errorMsg = 'Giá tiền phải lớn hơn 1000 VNĐ!';
        } else if (!soLuong || parseInt(soLuong) < 0) {
            errorMsg = 'Số lượng không được âm!';
        } else if (!hinhAnh) {
            errorMsg = 'Vui lòng chọn ảnh bìa!';
        }

        if (errorMsg) {
            alert(errorMsg);
            return;
        }

        const data = new FormData();
        data.append('ten_sach', tenSach);
        data.append('gia_tien', giaTien);
        data.append('so_luong', soLuong);
        data.append('the_loai', theLoai);
        data.append('trailer_url', trailerUrl);
        data.append('image', hinhAnh);

        try {
            await axios.post('http://localhost:5000/api/products', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('Thêm truyện thành công!');
            navigate('/admin/products');
        } catch (err) {
            console.error(err);
            alert('Có lỗi xảy ra khi thêm!');
        }
    };

    return (
        <div className="p-8">
            <div className="max-w-3xl mx-auto bg-white border-4 border-black shadow-comic-lg overflow-hidden mt-8 transform rotate-1">
                <div className="bg-secondary border-b-4 border-black p-6 flex items-center justify-between">
                    <h2 className="text-4xl font-comic text-dark tracking-widest uppercase" style={{ WebkitTextStroke: '1px black' }}>THÊM MANGA MỚI!</h2>
                    <span className="text-4xl">💥</span>
                </div>
                
                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                        <div className="bg-gray-100 p-6 border-4 border-black shadow-comic transform -rotate-1">
                            <label className="block text-xl font-black text-dark mb-2 uppercase">TÊN TRUYỆN TRANH <span className="text-primary">*</span></label>
                            <input type="text" name="tenSach" value={formData.tenSach} onChange={handleChange} required minLength="3" className="w-full px-4 py-3 border-4 border-black focus:ring-0 focus:outline-none focus:border-primary font-bold bg-white text-lg" placeholder="Nhập tên siêu phẩm..." />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-100 p-6 border-4 border-black shadow-comic transform rotate-1">
                                <label className="block text-xl font-black text-dark mb-2 uppercase">GIÁ BÁN (VNĐ) <span className="text-primary">*</span></label>
                                <input type="number" name="giaTien" value={formData.giaTien} onChange={handleChange} required min="1000" className="w-full text-black px-4 py-3 border-4 border-black focus:ring-0 focus:outline-none focus:border-primary font-bold bg-white text-lg" />
                            </div>
                            <div className="bg-gray-100 p-6 border-4 border-black shadow-comic transform -rotate-1">
                                <label className="block text-xl font-black text-dark mb-2 uppercase">SỐ LƯỢNG NHẬP <span className="text-primary">*</span></label>
                                <input type="number" name="soLuong" value={formData.soLuong} onChange={handleChange} required min="0" className="w-full px-4 py-3 border-4 border-black focus:ring-0 focus:outline-none focus:border-primary font-bold bg-white text-lg" />
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-100 p-6 border-4 border-black shadow-comic transform -rotate-1">
                                <label className="block text-xl font-black text-dark mb-2 uppercase">CHỦ ĐỀ (THỂ LOẠI) <span className="text-primary">*</span></label>
                                <select name="theLoai" value={formData.theLoai} onChange={handleChange} className="w-full px-4 py-3 border-4 border-black focus:ring-0 focus:outline-none focus:border-primary font-bold bg-white text-lg cursor-pointer">
                                    <option value="Hành động">Hành động</option>
                                    <option value="Kỳ ảo">Kỳ ảo</option>
                                    <option value="Tình cảm">Tình cảm</option>
                                    <option value="Hài hước">Hài hước</option>
                                    <option value="Thể thao">Thể thao</option>
                                    <option value="Tâm lý">Tâm lý</option>
                                    <option value="Trinh thám">Trinh thám</option>
                                    <option value="Võ thuật">Võ thuật</option>
                                    <option value="Khác">Khác</option>
                                </select>
                            </div>

                            <div className="bg-gray-100 p-6 border-4 border-black shadow-comic transform rotate-1">
                                <label className="block text-xl font-black text-dark mb-2 uppercase">LINK TRAILER YOUTUBE (Tùy chọn)</label>
                                <input type="text" name="trailerUrl" value={formData.trailerUrl} onChange={handleChange} className="w-full px-4 py-3 border-4 border-black focus:ring-0 focus:outline-none focus:border-primary font-bold bg-white text-lg" placeholder="Ví dụ: https://www.youtube.com/embed/S8_YwFLCh4U" />
                            </div>
                        </div>

                        <div className="bg-gray-100 p-6 border-4 border-black shadow-comic transform rotate-1">
                            <label className="block text-xl font-black text-dark mb-2 uppercase">ẢNH BÌA <span className="text-primary">*</span></label>
                            <input type="file" name="hinhAnh" onChange={handleFileChange} required accept="image/*" className="w-full text-black px-4 py-3 border-4 border-dashed border-black bg-white font-bold cursor-pointer" />
                        </div>
                        
                        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <Link to="/admin/products" className="w-full sm:w-auto text-center font-black uppercase border-4 border-black px-8 py-3 bg-white hover:bg-gray-200 shadow-comic transition">QUAY XE</Link>
                            <button type="submit" className="w-full sm:w-auto bg-primary text-white font-comic text-3xl tracking-widest uppercase border-4 border-black px-12 py-3 shadow-comic hover:shadow-comic-lg hover:-translate-y-1 transition" style={{ WebkitTextStroke: '1px black' }}>
                                LÊN KỆ NGAY!
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminAddProduct;
