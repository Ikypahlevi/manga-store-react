import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminOrders = () => {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');

    // Mock data
    const [listOrders, setListOrders] = useState([
        { id: '101', customerName: 'Nguyen Van A', customerPhone: '0123456789', customerAddress: '123 ABC Street', totalAmount: 55000, orderDate: new Date(), status: 'PENDING' },
        { id: '102', customerName: 'Tran Thi B', customerPhone: '0987654321', customerAddress: '456 XYZ Lane', totalAmount: 120000, orderDate: new Date(), status: 'SHIPPING' },
        { id: '103', customerName: 'Le Van C', customerPhone: '0112233445', customerAddress: '789 DEF Blvd', totalAmount: 30000, orderDate: new Date(), status: 'COMPLETED' }
    ]);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Search:', search, 'Status:', statusFilter);
    };

    const handleUpdateStatus = (id, newStatus) => {
        if (newStatus === 'CANCELLED' && !window.confirm('Chắc chắn muốn hủy đơn này?')) return;
        
        setListOrders(prev => prev.map(order => 
            order.id === id ? { ...order, status: newStatus } : order
        ));
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
                        <option value="PENDING">CHỜ DUYỆT</option>
                        <option value="SHIPPING">ĐANG GIAO</option>
                        <option value="COMPLETED">ĐÃ GIAO</option>
                        <option value="CANCELLED">ĐÃ HỦY</option>
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
                                            <div className="font-bold text-dark uppercase">{order.customerName}</div>
                                            <div className="text-xs text-gray-500 mt-1">📞 {order.customerPhone}</div>
                                            <div className="text-xs text-gray-500 mt-1 truncate max-w-[200px]" title={order.customerAddress}>📍 {order.customerAddress}</div>
                                        </td>
                                        <td className="px-6 py-4 border-r-4 border-black text-primary text-xl font-comic tracking-widest"
                                            style={{ WebkitTextStroke: '1px black' }}>
                                            {order.totalAmount.toLocaleString('vi-VN')}đ
                                        </td>
                                        <td className="px-6 py-4 border-r-4 border-black text-gray-600">
                                            {order.orderDate.toLocaleString('vi-VN')}
                                        </td>
                                        <td className="px-6 py-4 border-r-4 border-black">
                                            {order.status === 'PENDING' && <span className="bg-secondary border-2 border-black px-3 py-1 text-dark shadow-comic font-bold uppercase">CHỜ DUYỆT</span>}
                                            {order.status === 'SHIPPING' && <span className="bg-accent border-2 border-black px-3 py-1 text-dark shadow-comic font-bold uppercase">ĐANG GIAO</span>}
                                            {order.status === 'COMPLETED' && <span className="bg-[#06D6A0] border-2 border-black px-3 py-1 text-dark shadow-comic font-bold uppercase">ĐÃ GIAO</span>}
                                            {order.status === 'CANCELLED' && <span className="bg-primary text-white border-2 border-black px-3 py-1 shadow-comic font-bold uppercase">ĐÃ HỦY</span>}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {order.status === 'PENDING' && (
                                                <div className="flex items-center justify-center gap-2">
                                                    <button onClick={() => handleUpdateStatus(order.id, 'SHIPPING')} className="bg-accent border-2 border-black px-3 py-2 shadow-comic hover:-translate-y-1 transition text-dark font-bold uppercase text-xs">DUYỆT & GIAO</button>
                                                    <button onClick={() => handleUpdateStatus(order.id, 'CANCELLED')} className="bg-primary text-white border-2 border-black px-3 py-2 shadow-comic hover:-translate-y-1 transition font-bold uppercase text-xs">HỦY!</button>
                                                </div>
                                            )}
                                            {order.status === 'SHIPPING' && (
                                                <button onClick={() => handleUpdateStatus(order.id, 'COMPLETED')} className="inline-block bg-[#06D6A0] border-2 border-black px-3 py-2 shadow-comic hover:-translate-y-1 transition text-dark font-bold uppercase text-xs">XÁC NHẬN ĐÃ GIAO</button>
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
