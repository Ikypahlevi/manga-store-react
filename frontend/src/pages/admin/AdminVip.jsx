import React from 'react';

const AdminVip = () => {
    // Mock data
    const listVip = [
        { user: { username: 'whales123', rankTier: 'DIAMOND', mangaCoin: 5000 }, totalBooks: 120, totalSpent: 25000000 },
        { user: { username: 'richkid_hn', rankTier: 'PLATINUM', mangaCoin: 3000 }, totalBooks: 85, totalSpent: 15000000 },
        { user: { username: 'wibu_chua', rankTier: 'GOLD', mangaCoin: 1500 }, totalBooks: 40, totalSpent: 8000000 }
    ];

    return (
        <div className="p-8">
            <div data-aos="fade-down" className="flex items-center justify-between mb-8 pb-4 border-b-4 border-black">
                <div>
                    <h1 className="text-5xl font-comic text-dark tracking-widest uppercase transform -rotate-1" style={{ WebkitTextStroke: '1px black', textShadow: '2px 2px 0 #FFD166' }}>KHÁCH HÀNG VIP</h1>
                    <p className="font-black text-gray-500 mt-2 uppercase">Vinh danh các Wibu chịu chi nhất</p>
                </div>
            </div>

            <div data-aos="zoom-in" className="bg-white border-4 border-black shadow-comic-lg mb-8">
                <table className="w-full text-center">
                    <thead className="bg-secondary border-b-4 border-black text-dark font-comic text-xl tracking-widest sticky top-0 z-10 shadow-sm">
                        <tr>
                            <th className="px-6 py-4 border-r-4 border-black">TOP</th>
                            <th className="px-6 py-4 border-r-4 border-black">TÀI KHOẢN</th>
                            <th className="px-6 py-4 border-r-4 border-black">CẤP BẬC</th>
                            <th className="px-6 py-4 border-r-4 border-black">MANGA COIN</th>
                            <th className="px-6 py-4 border-r-4 border-black">TỔNG SÁCH ĐÃ MUA</th>
                            <th className="px-6 py-4 text-center">TỔNG ĐÃ CHI</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y-4 divide-black font-black text-sm uppercase">
                        {listVip.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-12 text-center text-gray-500 font-comic text-2xl">
                                    CHƯA CÓ AI ĐẠT VIP!
                                </td>
                            </tr>
                        ) : (
                            listVip.map((vip, loopIndex) => (
                                <tr key={loopIndex} data-aos="fade-up" data-aos-delay={loopIndex * 100} className="hover:bg-gray-100 transition-colors">
                                    <td className={`px-6 py-4 border-r-4 border-black text-2xl font-comic ${loopIndex === 0 ? 'text-primary' : (loopIndex === 1 ? 'text-accent' : (loopIndex === 2 ? 'text-secondary' : 'text-gray-500'))}`} 
                                        style={loopIndex < 3 ? { WebkitTextStroke: '1px black' } : {}}>
                                        #{loopIndex + 1}
                                    </td>
                                    <td className="px-6 py-4 border-r-4 border-black text-left">
                                        <div className="font-bold text-dark uppercase flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-secondary border-2 border-black flex items-center justify-center font-comic text-dark shadow-comic-hover">
                                                {vip.user.username.substring(0, 1).toUpperCase()}
                                            </div>
                                            {vip.user.username}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 border-r-4 border-black">
                                        <span className="bg-dark text-white px-2 py-1 rounded border-2 border-black">{vip.user.rankTier}</span>
                                    </td>
                                    <td className="px-6 py-4 border-r-4 border-black text-secondary text-lg" style={{ WebkitTextStroke: '1px black' }}>💰 {vip.user.mangaCoin}</td>
                                    <td className="px-6 py-4 border-r-4 border-black text-xl font-comic tracking-widest text-accent" style={{ WebkitTextStroke: '1px black' }}>📚 {vip.totalBooks} QUYỂN</td>
                                    <td className="px-6 py-4 text-primary text-xl font-comic tracking-widest" style={{ WebkitTextStroke: '1px black' }}>
                                        {vip.totalSpent.toLocaleString('vi-VN')}đ
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminVip;
