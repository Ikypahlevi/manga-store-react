import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const AdminProducts = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [listSach, setListSach] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    
    const currentPage = parseInt(searchParams.get('page') || '1');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products', {
                    params: { page: currentPage, limit: 10 }
                });
                if (response.data.success) {
                    setListSach(response.data.products);
                    setTotalPages(response.data.totalPages);
                }
            } catch (error) {
                console.error('Error fetching products', error);
            }
        };
        fetchProducts();
    }, [currentPage]);

    const handleDelete = async (e, id) => {
        if (!window.confirm('Chắc chắn muốn phi tang cuốn truyện này chưa?')) {
            e.preventDefault();
        } else {
            try {
                const res = await axios.delete(`http://localhost:5000/api/products/${id}`);
                if (res.data.message) {
                    alert('Đã phi tang thành công!');
                    setListSach(listSach.filter(s => s._id !== id));
                }
            } catch (err) {
                console.error(err);
                alert('Có lỗi xảy ra khi xóa!');
            }
        }
    };

    return (
        <div className="p-8">
            <div data-aos="fade-down" className="flex items-center justify-between mb-8 pb-4 border-b-4 border-black">
                <div>
                    <h1 className="text-5xl font-comic text-dark tracking-widest uppercase transform -rotate-1"
                        style={{ WebkitTextStroke: '1px black', textShadow: '2px 2px 0 #FFD166' }}>KHO TRUYỆN TRANH</h1>
                    <p className="font-black text-gray-500 mt-2 uppercase">Khu vực quản lý dành riêng cho các Wibu chúa</p>
                </div>
                <div className="flex items-center gap-4">
                    <Link to="/admin/products/add"
                        className="flex items-center gap-2 bg-primary hover:bg-white text-white hover:text-primary px-6 py-3 border-4 border-black rounded shadow-comic hover:shadow-comic-lg transition font-black uppercase transform -rotate-1">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path>
                        </svg>
                        NHẬP TRUYỆN MỚI!
                    </Link>
                </div>
            </div>

            <div id="gridWrapper" className="relative overflow-hidden w-full">
                <div id="mangaGrid" data-aos="zoom-in" className="bg-white border-4 border-black shadow-comic-lg mb-8 w-full flex-shrink-0 transition-transform duration-500 ease-in-out">
                    <div>
                        <table className="w-full text-center">
                            <thead className="bg-secondary border-b-4 border-black text-dark font-comic text-xl tracking-widest sticky top-0 z-10 shadow-sm">
                                <tr>
                                    <th className="px-6 py-4 border-r-4 border-black">MÃ SỐ</th>
                                    <th className="px-6 py-4 border-r-4 border-black">TRUYỆN TRANH</th>
                                    <th className="px-6 py-4 border-r-4 border-black">CHỦ ĐỀ</th>
                                    <th className="px-6 py-4 border-r-4 border-black">GIÁ BÁN</th>
                                    <th className="px-6 py-4 border-r-4 border-black">SỐ LƯỢNG</th>
                                    <th className="px-6 py-4 text-center">THAO TÁC</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y-4 divide-black font-black uppercase text-sm">
                                {listSach.map((sach) => (
                                    <tr key={sach._id} className="hover:bg-gray-100 transition-colors">
                                        <td className="px-6 py-4 border-r-4 border-black text-gray-500">#{sach._id}</td>
                                        <td className="px-6 py-4 border-r-4 border-black">
                                            <div className="flex items-center gap-4">
                                                {sach.image ? (
                                                    <div className="w-12 h-16 bg-white border-2 border-black shadow-comic overflow-hidden">
                                                        <img src={sach.image} alt={sach.name} className="w-full h-full object-cover" />
                                                    </div>
                                                ) : (
                                                    <div className="w-12 h-16 bg-gray-200 border-2 border-black flex items-center justify-center text-[10px] text-gray-400 font-comic">NO IMG</div>
                                                )}
                                                <span className="text-base text-dark">{sach.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 border-r-4 border-black text-gray-700">
                                            <span className="bg-yellow-200 border-2 border-black px-2 py-1">{sach.category || 'Khác'}</span>
                                        </td>
                                        <td className="px-6 py-4 border-r-4 border-black text-primary text-xl font-comic tracking-widest" style={{ WebkitTextStroke: '1px black' }}>
                                            {sach.price.toLocaleString('vi-VN')}đ
                                        </td>
                                        <td className="px-6 py-4 border-r-4 border-black">
                                            {sach.stock > 10 ? (
                                                <span className="bg-accent border-2 border-black px-3 py-1 text-dark shadow-comic">{sach.stock}</span>
                                            ) : sach.stock > 0 ? (
                                                <span className="bg-secondary border-2 border-black px-3 py-1 text-dark shadow-comic">{sach.stock}</span>
                                            ) : (
                                                <span className="bg-primary text-white border-2 border-black px-3 py-1 shadow-comic">CHÁY HÀNG!</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex items-center justify-center gap-3">
                                                <Link to={`/admin/products/edit/${sach._id}`} className="bg-white border-2 border-black px-4 py-2 hover:bg-accent shadow-comic hover:-translate-y-1 transition text-dark">SỬA</Link>
                                                <button onClick={(e) => handleDelete(e, sach._id)} className="bg-primary text-white border-2 border-black px-4 py-2 shadow-comic hover:bg-dark hover:-translate-y-1 transition">XÓA!</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {totalPages > 1 && (
                <div id="paginationContainer" className="flex justify-center items-center mb-8 gap-8">
                    <div className="flex gap-3">
                        {currentPage > 1 && (
                            <>
                                <Link to={`/admin/products?page=1`} className="px-5 py-2 border-4 border-black bg-white font-black text-dark hover:bg-secondary hover:-translate-y-1 shadow-comic transition-all uppercase" title="Trang Đầu">&lt;&lt;</Link>
                                <Link to={`/admin/products?page=${currentPage - 1}`} className="px-5 py-2 border-4 border-black bg-white font-black text-dark hover:bg-secondary hover:-translate-y-1 shadow-comic transition-all uppercase">Trang Trước</Link>
                            </>
                        )}

                        {/* Simplified pagination logic for React representation */}
                        {[1, 2, 3].map(i => (
                            <Link key={i} to={`/admin/products?page=${i}`}
                                className={`px-5 py-2 border-4 border-black font-black transition-all shadow-comic uppercase ${i === currentPage ? 'bg-primary text-white -translate-y-1' : 'bg-white text-dark hover:bg-secondary hover:-translate-y-1'}`}>
                                {i}
                            </Link>
                        ))}

                        {currentPage < totalPages && (
                            <>
                                <Link to={`/admin/products?page=${currentPage + 1}`} className="px-5 py-2 border-4 border-black bg-white font-black text-dark hover:bg-secondary hover:-translate-y-1 shadow-comic transition-all uppercase">Trang Kế</Link>
                                <Link to={`/admin/products?page=${totalPages}`} className="px-5 py-2 border-4 border-black bg-white font-black text-dark hover:bg-secondary hover:-translate-y-1 shadow-comic transition-all uppercase" title="Trang Cuối">&gt;&gt;</Link>
                            </>
                        )}
                    </div>
                    
                    <div className="font-black text-dark text-lg bg-white px-4 py-2 border-4 border-black shadow-comic transform rotate-2">
                        Trang {currentPage} / {totalPages}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProducts;
