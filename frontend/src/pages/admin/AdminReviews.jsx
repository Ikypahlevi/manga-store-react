import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminReviews = () => {
    const [pendingReviews, setPendingReviews] = useState([]);

    const fetchReviews = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/reviews/pending');
            setPendingReviews(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleAction = async (id, subAction) => {
        if (subAction === 'reject' && !window.confirm('Bạn có chắc muốn xóa đánh giá này?')) return;
        
        try {
            if (subAction === 'approve') {
                await axios.put(`http://localhost:5000/api/reviews/${id}/approve`);
            } else {
                await axios.delete(`http://localhost:5000/api/reviews/${id}/reject`);
            }
            fetchReviews();
        } catch (err) {
            console.error(err);
            alert('Lỗi khi thao tác');
        }
    };

    return (
        <div className="p-8">
            <div data-aos="fade-down" className="flex items-center justify-between mb-8 pb-4 border-b-4 border-black">
                <div>
                    <h1 className="text-5xl font-comic text-dark tracking-widest uppercase transform -rotate-1"
                        style={{ WebkitTextStroke: '1px black', textShadow: '2px 2px 0 #FFD166' }}>DUYỆT ĐÁNH GIÁ</h1>
                    <p className="font-black text-gray-500 mt-2 uppercase">Phê duyệt hoặc từ chối đánh giá từ người dùng</p>
                </div>
            </div>

            <div data-aos="zoom-in" className="bg-white border-4 border-black shadow-comic-lg mb-8">
                <div>
                    <table className="w-full text-center">
                        <thead className="bg-secondary border-b-4 border-black text-dark font-comic text-xl tracking-widest sticky top-0 z-10 shadow-sm">
                            <tr>
                                <th className="px-6 py-4 border-r-4 border-black w-1/6">NGƯỜI DÙNG</th>
                                <th className="px-6 py-4 border-r-4 border-black w-1/6">MÃ TRUYỆN</th>
                                <th className="px-6 py-4 border-r-4 border-black w-1/6">CHẤM ĐIỂM</th>
                                <th className="px-6 py-4 border-r-4 border-black w-2/6">NỘI DUNG</th>
                                <th className="px-6 py-4 text-center w-1/6">HÀNH ĐỘNG</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y-4 divide-black font-black text-sm">
                            {pendingReviews.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500 font-comic text-2xl">
                                        HIỆN TẠI KHÔNG CÓ ĐÁNH GIÁ NÀO CẦN DUYỆT!
                                    </td>
                                </tr>
                            ) : (
                                pendingReviews.map((review, index) => (
                                    <tr key={review.ma_review} data-aos="fade-up" data-aos-delay={index * 50} className="hover:bg-gray-100 transition-colors">
                                        <td className="px-6 py-4 border-r-4 border-black text-dark font-bold uppercase">{review.username}</td>
                                        <td className="px-6 py-4 border-r-4 border-black text-gray-500 font-bold uppercase">#{review.ma_sach}</td>
                                        <td className="px-6 py-4 border-r-4 border-black text-primary text-xl font-comic tracking-widest">
                                            {review.rating >= 5 ? '🔥 Siêu phẩm' : review.rating >= 4 ? '😭 Cảm động' : '🤣 Hài hước'}
                                        </td>
                                        <td className="px-6 py-4 border-r-4 border-black text-left text-gray-700 italic">
                                            "{review.comment}"
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex flex-col gap-2">
                                                <button onClick={() => handleAction(review.ma_review, 'approve')}
                                                        className="bg-[#06D6A0] border-2 border-black px-3 py-2 shadow-comic hover:-translate-y-1 transition text-dark font-bold uppercase text-xs">DUYỆT ✅</button>
                                                <button onClick={() => handleAction(review.ma_review, 'reject')}
                                                        className="bg-primary text-white border-2 border-black px-3 py-2 shadow-comic hover:-translate-y-1 transition font-bold uppercase text-xs">TỪ CHỐI ❌</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminReviews;
