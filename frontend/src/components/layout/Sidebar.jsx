import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));
  const currentAction = new URLSearchParams(location.search).get('action') || 'dashboard';

  if (user && user.role === 'ADMIN' && location.pathname.includes('/admin')) {
    return (
      <aside data-aos="fade-right" className="w-72 flex-shrink-0 hidden xl:block">
        <div className="bg-white border-4 border-black shadow-comic p-6 rounded-lg relative w-full">
          <div className="text-center mb-8 pb-6 border-b-4 border-black">
            <h3 className="font-comic text-4xl text-primary tracking-wide transform -rotate-3" style={{ WebkitTextStroke: '1px black' }}>ADMIN PANEL</h3>
            <p className="font-black text-dark bg-secondary inline-block px-2 mt-2 border-2 border-black transform rotate-2">Khu Vực Cấm</p>
          </div>

          <nav className="space-y-4">
            <Link to="/admin?action=dashboard" className={`block w-full text-center py-3 ${currentAction === 'dashboard' ? 'bg-accent' : 'bg-white'} border-4 border-black rounded shadow-comic hover:shadow-comic-lg hover:-translate-y-1 transition-all font-comic text-2xl tracking-widest text-dark`}>THỐNG KÊ TỔNG</Link>
            <Link to="/admin?action=products" className={`block w-full text-center py-3 ${currentAction === 'products' ? 'bg-accent' : 'bg-white'} border-4 border-black rounded shadow-comic hover:shadow-comic-lg hover:-translate-y-1 transition-all font-comic text-2xl tracking-widest text-dark`}>KHO TRUYỆN TRANH</Link>
            <Link to="/admin?action=orders" className={`block w-full text-center py-3 ${currentAction === 'orders' ? 'bg-accent' : 'bg-white'} border-4 border-black rounded shadow-comic hover:shadow-comic-lg hover:-translate-y-1 transition-all font-comic text-2xl tracking-widest text-dark`}>ĐƠN HÀNG MỚI</Link>
            <Link to="/admin?action=vip" className={`block w-full text-center py-3 ${currentAction === 'vip' ? 'bg-accent' : 'bg-white'} border-4 border-black rounded shadow-comic hover:shadow-comic-lg hover:-translate-y-1 transition-all font-comic text-2xl tracking-widest text-dark`}>KHÁCH HÀNG VIP</Link>
            <Link to="/admin?action=reviews" className={`block w-full text-center py-3 ${currentAction === 'reviews' ? 'bg-accent' : 'bg-white'} border-4 border-black rounded shadow-comic hover:shadow-comic-lg hover:-translate-y-1 transition-all font-comic text-2xl tracking-widest text-dark`}>DUYỆT ĐÁNH GIÁ</Link>
          </nav>

          <div className="mt-8 pt-4 border-t-4 border-black text-center">
            {user.avatar ? (
              <img src={user.avatar} className="w-16 h-16 mx-auto rounded-full border-2 border-black bg-white object-cover" alt="Admin Avatar" />
            ) : (
              <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=admin&backgroundColor=FFD166`} className="w-16 h-16 mx-auto rounded-full border-2 border-black bg-secondary" alt="Admin Avatar" />
            )}
            <div className="mt-2 font-black text-dark uppercase">{user.username}</div>
          </div>
        </div>
      </aside>
    );
  }

  if (location.pathname === '/customer' || location.pathname === '/') {
    const query = new URLSearchParams(location.search);
    const minPrice = query.get('minPrice') || '';
    const maxPrice = query.get('maxPrice') || '';

    return (
      <aside data-aos="fade-right" className="w-72 flex-shrink-0 hidden md:block">
        <div className="bg-white border-4 border-black shadow-comic p-6 rounded-lg relative">
          <div className="text-center mb-6 pb-4 border-b-4 border-black">
            <h3 className="font-comic text-3xl text-primary tracking-wide transform -rotate-2" style={{ WebkitTextStroke: '1px black' }}>LỌC TRUYỆN</h3>
            <p className="font-black text-dark bg-secondary inline-block px-2 mt-2 border-2 border-black transform rotate-2">Theo Giá Tiền</p>
          </div>

          <form action="/customer" method="GET" className="space-y-4">
            <input type="hidden" name="action" value="home" />
            <div>
              <label className="block font-black text-dark uppercase mb-1">Giá từ:</label>
              <input type="number" name="minPrice" defaultValue={minPrice} className="w-full px-3 py-2 border-4 border-black font-bold focus:outline-none focus:border-primary shadow-comic transition" placeholder="VNĐ" />
            </div>
            <div>
              <label className="block font-black text-dark uppercase mb-1">Đến:</label>
              <input type="number" name="maxPrice" defaultValue={maxPrice} className="w-full px-3 py-2 border-4 border-black font-bold focus:outline-none focus:border-primary shadow-comic transition" placeholder="VNĐ" />
            </div>

            <button type="submit" className="w-full bg-accent text-dark border-4 border-black font-comic text-2xl py-2 mt-4 shadow-comic hover:shadow-comic-lg hover:-translate-y-1 transition tracking-widest uppercase">
              LỌC NGAY!
            </button>
          </form>
        </div>
      </aside>
    );
  }

  return null;
};

export default Sidebar;
