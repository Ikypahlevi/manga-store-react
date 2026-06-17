import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminOrders = () => {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [listOrders, setListOrders] = useState([]);

    const loadOrders = async (keyword = '', status = '') => {
        try {
            const res = await axios.get('http://localhost:5000/api/orders/all', {
                params: { keyword, status: status === 'ALL' ? '' : status }
            });
            setListOrders(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        loadOrders(search, statusFilter);
    };

    const handleUpdateStatus = async (id, newStatus) => {
        if (newStatus === 'Đã hủy' && !window.confirm('Chắc chắn muốn hủy đơn này?')) return;
        
        try {
            await axios.put(`http://localhost:5000/api/orders/${id}/status`, { status: newStatus });
            loadOrders(search, statusFilter);
        } catch (err) {
            console.error(err);
            alert('Lỗi khi cập nhật trạng thái');
        }
    };

    return (
        <div className="p-8">
            <div data-aos="fade-down" className="flex items-center justify-between mb-8 pb-4 border-b-4 border-black">
                <div>
                    <h1 className="text-5xl font-comic text-dark tracking-widest uppercase transform -rotate-1"
                        style={{ WebkitTextStroke: '1px black', textShadow: '2px 2px 0 #FFD166' }}>ĐƠN HÀNG MỚI</h1>
                    <p className="font-black text-gray-500 mt-2 uppercase">Quản lý hóa đơn và vận chuyển</p>
                </div>
                <div className="flex items-center gap-4">
                    <Link to="/admin/products"
                        className="flex items-center gap-2 bg-white hover:bg-secondary text-dark px-6 py-3 border-4 border-black rounded shadow-comic hover:shadow-comic-lg transition font-black uppercase transform -rotate-1">
                        KHO TRUYỆN TRANH
                    </Link>
                </div>
            </div>

            <div data-aos="fade-up" className="mb-6 bg-white border-4 border-black p-4 shadow-comic">
                <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center gap-4">
                    <input type="text" name="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tên khách hàng, Số điện thoại..." className="flex-grow w-full md:w-auto bg-gray-50 border-4 border-black p-3 font-bold uppercase focus:bg-yellow-50 focus:outline-none focus:-translate-y-1 focus:shadow-comic transition-all" />
                    <select name="status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full md:w-auto bg-gray-50 border-4 border-black p-3 font-bold uppercase focus:bg-yellow-50 focus:outline-none focus:-translate-y-1 focus:shadow-comic transition-all cursor-pointer">
                        <option value="ALL">TẤT CẢ TRẠNG THÁI</option>
                        <option value="Chờ xác nhận">CHỜ XÁC NHẬN</option>
                        <option value="Đang giao">ĐANG GIAO</option>
                        <option value="Hoàn thành">HOÀN THÀNH</option>
                        <option value="Đã hủy">ĐÃ HỦY</option>
                    </select>
                    <button type="submit" className="w-full md:w-auto bg-dark text-white font-black px-8 py-3 border-4 border-black shadow-comic hover:bg-primary hover:text-white transition hover:-translate-y-1 uppercase tracking-widest">TÌM KIẾM</button>
                </form>
            </div>
            
            <div data-aos="zoom-in" className="bg-white border-4 border-black shadow-comic-lg mb-8">
                <div>
                    <table className="w-full text-center">
                        <thead className="bg-secondary border-b-4 border-black text-dark font-comic text-xl tracking-widest sticky top-0 z-10 shadow-sm">
                            <tr>
                                <th className="px-6 py-4 border-r-4 border-black">MÃ ĐƠN</th>
                                <th className="px-6 py-4 border-r-4 border-black">NGƯỜI NHẬN</th>
                                <th className="px-6 py-4 border-r-4 border-black">TỔNG TIỀN</th>
                                <th className="px-6 py-4 border-r-4 border-black">NGÀY ĐẶT</th>
                                <th className="px-6 py-4 border-r-4 border-black">TRẠNG THÁI</th>
                                <th className="px-6 py-4 text-center">HÀNH ĐỘNG</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y-4 divide-black font-black text-sm">
                            {listOrders.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500 font-comic text-2xl">
                                        CHƯA CÓ ĐƠN HÀNG NÀO TỚI!
                                    </td>
                                </tr>
                            ) : (
                                listOrders.map((order, index) => (
                                    <tr key={order.id} data-aos="fade-up" data-aos-delay={index * 50} className="hover:bg-gray-100 transition-colors">
                                        <td className="px-6 py-4 border-r-4 border-black text-gray-500 font-bold uppercase">#{order.id}</td>
                                        <td className="px-6 py-4 border-r-4 border-black text-left">
                                            <div className="font-bold text-dark uppercase">{order.customer_name}</div>
                                            <div className="text-xs text-gray-500 mt-1">📞 {order.customer_phone}</div>
                                            <div className="text-xs text-gray-500 mt-1 truncate max-w-[200px]" title={order.customer_address}>📍 {order.customer_address}</div>
                                        </td>
                                        <td className="px-6 py-4 border-r-4 border-black text-primary text-xl font-comic tracking-widest"
                                            style={{ WebkitTextStroke: '1px black' }}>
                                            {order.total_amount.toLocaleString('vi-VN')}đ
                                        </td>
                                        <td className="px-6 py-4 border-r-4 border-black text-gray-600">
                                            {new Date(order.created_at).toLocaleString('vi-VN')}
                                        </td>
                                        <td className="px-6 py-4 border-r-4 border-black">
                                            {order.status === 'Chờ xác nhận' && <span className="bg-secondary border-2 border-black px-3 py-1 text-dark shadow-comic font-bold uppercase">CHỜ DUYỆT</span>}
                                            {order.status === 'Đang giao' && <span className="bg-accent border-2 border-black px-3 py-1 text-dark shadow-comic font-bold uppercase">ĐANG GIAO</span>}
                                            {order.status === 'Hoàn thành' && <span className="bg-[#06D6A0] border-2 border-black px-3 py-1 text-dark shadow-comic font-bold uppercase">ĐÃ GIAO</span>}
                                            {order.status === 'Đã hủy' && <span className="bg-primary text-white border-2 border-black px-3 py-1 shadow-comic font-bold uppercase">ĐÃ HỦY</span>}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {order.status === 'Chờ xác nhận' && (
                                                <div className="flex items-center justify-center gap-2">
                                                    <button onClick={() => handleUpdateStatus(order.id, 'Đang giao')} className="bg-accent border-2 border-black px-3 py-2 shadow-comic hover:-translate-y-1 transition text-dark font-bold uppercase text-xs">DUYỆT & GIAO</button>
                                                    <button onClick={() => handleUpdateStatus(order.id, 'Đã hủy')} className="bg-primary text-white border-2 border-black px-3 py-2 shadow-comic hover:-translate-y-1 transition font-bold uppercase text-xs">HỦY!</button>
                                                </div>
                                            )}
                                            {order.status === 'Đang giao' && (
                                                <button onClick={() => handleUpdateStatus(order.id, 'Hoàn thành')} className="inline-block bg-[#06D6A0] border-2 border-black px-3 py-2 shadow-comic hover:-translate-y-1 transition text-dark font-bold uppercase text-xs">XÁC NHẬN ĐÃ GIAO</button>
                                            )}
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

export default AdminOrders;
