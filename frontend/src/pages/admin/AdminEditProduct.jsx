import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const AdminEditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        tenSach: '',
        giaTien: '',
        soLuong: '',
        theLoai: 'Khác',
        trailerUrl: '',
        hinhAnh: ''
    });
    
    // Mock fetch data
    useEffect(() => {
        // Simulating data fetch based on id
        setFormData({
            tenSach: 'Naruto Tập ' + id,
            giaTien: '25000',
            soLuong: '15',
            theLoai: 'Hành động',
            trailerUrl: '',
            hinhAnh: 'naruto.jpg'
        });
    }, [id]);

    const [newHinhAnh, setNewHinhAnh] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setNewHinhAnh(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const { tenSach, giaTien, soLuong } = formData;
        let errorMsg = '';

        if (!tenSach.trim() || tenSach.trim().length < 3) {
            errorMsg = 'Tên truyện phải từ 3 ký tự!';
        } else if (!giaTien || parseInt(giaTien) < 1000) {
            errorMsg = 'Giá tiền phải lớn hơn 1000 VNĐ!';
        } else if (!soLuong || parseInt(soLuong) < 0) {
            errorMsg = 'Số lượng không được âm!';
        }

        if (errorMsg) {
            alert(errorMsg);
            return;
        }

        // Handle success logic here
        console.log('Form updated', formData, newHinhAnh);
        navigate('/admin/products');
    };

    return (
        <div className="p-8">
            <div className="max-w-3xl mx-auto bg-white border-4 border-black shadow-comic-lg overflow-hidden mt-8 transform -rotate-1">
                <div className="bg-accent border-b-4 border-black p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h2 className="text-4xl font-comic text-dark tracking-widest uppercase" style={{ WebkitTextStroke: '1px black' }}>SỬA TRUYỆN TRANH</h2>
                        <span className="bg-white border-4 border-black font-black px-2 shadow-comic transform rotate-3">#{id}</span>
                    </div>
                    <span className="text-4xl">🛠️</span>
                </div>
                
                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                        <div className="bg-gray-100 p-6 border-4 border-black shadow-comic transform rotate-1">
                            <label className="block text-xl font-black text-dark mb-2 uppercase">TÊN TRUYỆN TRANH <span className="text-primary">*</span></label>
                            <input type="text" name="tenSach" value={formData.tenSach} onChange={handleChange} required minLength="3" className="w-full px-4 py-3 border-4 border-black focus:ring-0 focus:outline-none focus:border-primary font-bold bg-white text-lg" />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-100 p-6 border-4 border-black shadow-comic transform -rotate-1">
                                <label className="block text-xl font-black text-dark mb-2 uppercase">GIÁ BÁN (VNĐ) <span className="text-primary">*</span></label>
                                <input type="number" name="giaTien" value={formData.giaTien} onChange={handleChange} required min="1000" className="w-full px-4 py-3 border-4 border-black focus:ring-0 focus:outline-none focus:border-primary font-bold bg-white text-lg" />
                            </div>
                            <div className="bg-gray-100 p-6 border-4 border-black shadow-comic transform rotate-1">
                                <label className="block text-xl font-black text-dark mb-2 uppercase">SỐ LƯỢNG KHO <span className="text-primary">*</span></label>
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

                        <div className="bg-gray-100 p-6 border-4 border-black shadow-comic transform -rotate-1">
                            <label className="block text-xl font-black text-dark mb-4 uppercase">ẢNH BÌA</label>
                            
                            <div className="flex gap-6 items-start bg-white border-4 border-black p-4 shadow-inner">
                                {formData.hinhAnh ? (
                                    <div className="w-24 h-32 flex-shrink-0 border-4 border-black shadow-comic transform rotate-3 relative bg-white">
                                        <img src={`/img/${formData.hinhAnh}`} alt="Cover" className="w-full h-full object-cover" />
                                        <div className="absolute -top-3 -right-3 bg-secondary text-dark text-xs font-black border-2 border-black px-1 transform rotate-12">BÌA CŨ</div>
                                    </div>
                                ) : (
                                    <div className="w-24 h-32 flex-shrink-0 border-4 border-dashed border-black bg-gray-200 flex items-center justify-center font-comic text-xl transform rotate-3">NO IMG</div>
                                )}
                                
                                <div className="flex-grow">
                                    <label className="block text-sm font-black text-dark mb-2 uppercase">CHỌN ẢNH BÌA MỚI NẾU MUỐN ĐỔI:</label>
                                    <input type="file" name="newHinhAnh" onChange={handleFileChange} accept="image/*" className="w-full px-3 py-2 border-4 border-black bg-white cursor-pointer font-bold" />
                                </div>
                            </div>
                        </div>
                        
                        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <Link to="/admin/products" className="w-full sm:w-auto text-center font-black uppercase border-4 border-black px-8 py-3 bg-white hover:bg-gray-200 shadow-comic transition">HỦY BỎ</Link>
                            <button type="submit" className="w-full sm:w-auto bg-primary text-white font-comic text-3xl tracking-widest uppercase border-4 border-black px-12 py-3 shadow-comic hover:shadow-comic-lg hover:-translate-y-1 transition" style={{ WebkitTextStroke: '1px black' }}>
                                LƯU LẠI!
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminEditProduct;
