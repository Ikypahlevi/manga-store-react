import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuth();
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [favList, setFavList] = useState([]);
  const [listOrders, setListOrders] = useState([]);

  useEffect(() => {
      if (user) {
          // Fetch favorites
          axios.get('http://localhost:5000/api/user/favorites')
              .then(res => setFavList(res.data))
              .catch(err => console.error(err));
          // Fetch orders
          axios.get('http://localhost:5000/api/orders/my-orders')
              .then(res => setListOrders(res.data))
              .catch(err => console.error(err));
      }
  }, [user]);

  if (!user) {
      return <div className="text-center py-20 font-black text-2xl uppercase">Vui lòng đăng nhập!</div>;
  }

  return (
    <div className="max-w-5xl mx-auto mb-16 px-4">
      <div className="mb-10 pb-4 border-b-4 border-black dark:border-white">
        <h1 className="text-5xl font-comic text-dark dark:text-white tracking-widest uppercase transform rotate-1" style={{ WebkitTextStroke: '1px black', textShadow: '2px 2px 0 #FFD166' }}>
          HỒ SƠ VIP
        </h1>
      </div>

      <div data-aos="zoom-in" className="bg-white dark:bg-gray-800 border-4 border-black dark:border-white shadow-comic-lg flex flex-col p-6 mb-8 transform -rotate-1 animate-pulse-shadow">
        <h2 className="text-3xl font-comic text-dark dark:text-white border-b-4 border-black pb-3 mb-6 uppercase">THÔNG TIN TÀI KHOẢN</h2>
        <div className="flex flex-col md:flex-row gap-8 w-full">
          <div className="flex items-center gap-6 md:w-1/2">
            <div className="w-32 h-32 bg-secondary dark:bg-yellow-700 border-4 border-black rounded-full flex items-center justify-center flex-shrink-0">
              {user.avatar ? (
                <img src={user.avatar} className="w-full h-full rounded-full object-cover" alt="Avatar" />
              ) : (
                <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${user.username}`} className="w-full h-full rounded-full" alt="Avatar" />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-black text-2xl uppercase text-dark dark:text-white">Tài Khoản: <span className="text-primary">{user.username}</span></div>
              <div className="font-bold text-gray-500 uppercase tracking-widest">
                CẤP BẬC: 
                <span className="bg-accent text-dark border-2 border-black px-2 py-0.5 ml-1 shadow-comic text-sm">
                  {user.role === 'ADMIN' ? 'TRÙM CUỐI (ADMIN)' : user.rankTier}
                </span>
              </div>
            </div>
          </div>

          {user.role !== 'ADMIN' && (
            <div className="md:w-1/2 border-t-4 border-black md:border-t-0 md:border-l-4 pt-6 md:pt-0 md:pl-8 flex flex-col justify-center">
              <div className="font-black text-dark dark:text-white uppercase text-lg mb-2">Manga Coin: <span className="text-secondary text-2xl" style={{ WebkitTextStroke: '1px black' }}>💰 {user.mangaCoin}</span></div>
              <div className="w-full h-6 bg-gray-200 border-2 border-black shadow-comic-dark overflow-hidden relative">
                <div className="h-full bg-primary" style={{ width: '50%' }}></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <h2 className="text-4xl font-comic text-dark dark:text-white tracking-wider uppercase mb-6" style={{ WebkitTextStroke: '1px black' }}>BỘ SƯU TẬP YÊU THÍCH ❤️</h2>
      {favList.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 border-4 border-black p-10 text-center shadow-comic transform -rotate-1">
          <h3 className="text-3xl font-comic text-gray-400 mb-4">CHƯA THẢ TIM TRUYỆN NÀO!</h3>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-12">
          {favList.map((sach, index) => {
              let imgPath = sach.hinh_anh || '';
              if (imgPath && !imgPath.startsWith('/')) {
                  imgPath = imgPath.startsWith('img/') ? '/' + imgPath : '/img/' + imgPath;
              }
              return (
                <div key={sach.ma_sach} className="manga-card-tilt bg-white dark:bg-gray-800 border-4 border-black dark:border-white shadow-comic dark:shadow-comic-dark hover:shadow-comic-lg transition-all flex flex-col group relative overflow-hidden transform animate-pulse-shadow">
                    <div className="h-48 bg-gray-100 dark:bg-gray-700 border-b-4 border-black dark:border-white relative overflow-hidden">
                        {imgPath ? (
                            <img src={imgPath} alt={sach.ten_sach} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-600">
                                <span className="font-comic text-xl text-gray-400 dark:text-gray-300 transform -rotate-12">NO IMAGE</span>
                            </div>
                        )}
                    </div>
                    <div className="p-3 flex flex-col flex-grow bg-white dark:bg-gray-800">
                        <h3 className="font-black text-sm text-dark dark:text-white line-clamp-2 mb-2 uppercase group-hover:text-primary transition-colors leading-tight">
                            {sach.ten_sach}
                        </h3>
                        <div className="mt-auto pt-2 border-t-2 border-dashed border-gray-300 flex flex-col justify-center">
                            <div className="text-lg font-comic text-primary tracking-widest">
                                {sach.gia_tien.toLocaleString()}đ
                            </div>
                            <Link to={`/customer/detail/${sach.ma_sach}`} className="bg-accent border-2 border-black text-dark text-center mt-2 font-black px-2 py-1 hover:bg-secondary transition-colors text-xs shadow-comic hover:shadow-comic-hover hover:translate-x-1 hover:translate-y-1">
                                XEM LẠI!
                            </Link>
                        </div>
                    </div>
                </div>
              );
          })}
        </div>
      )}

      <h2 className="text-4xl font-comic text-dark dark:text-white tracking-wider uppercase mt-12 mb-6" style={{ WebkitTextStroke: '1px black' }}>LỊCH SỬ CHỐT ĐƠN</h2>
      <div className="bg-white dark:bg-gray-800 border-4 border-black p-10 text-center shadow-comic-lg transform rotate-1 mb-12">
        <button onClick={() => setShowOrderModal(true)} className="inline-block bg-primary text-white border-4 border-black px-8 py-4 font-comic text-2xl tracking-widest shadow-comic uppercase transform -rotate-2">
          XEM LỊCH SỬ CHỐT ĐƠN 📋
        </button>
      </div>

      {showOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70">
          <div className="bg-white border-4 border-black shadow-comic-lg w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col relative text-black">
            <div className="p-4 border-b-4 border-black flex justify-between items-center bg-secondary">
              <h2 className="text-3xl font-comic uppercase">LỊCH SỬ ĐƠN HÀNG</h2>
              <button onClick={() => setShowOrderModal(false)} className="text-4xl font-black">&times;</button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[60vh] min-h-[200px] flex flex-col items-center justify-start gap-4">
              {listOrders.length === 0 ? (
                  <p className="font-comic text-xl mt-10">CHƯA TỪNG MÚC CUỐN NÀO!</p>
              ) : (
                  listOrders.map(order => (
                      <div key={order.id} className="w-full bg-white border-4 border-black p-4 shadow-comic flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div className="flex flex-col">
                              <span className="font-black text-lg">MÃ ĐƠN: #{order.id}</span>
                              <span className="font-bold text-gray-600 text-sm">Ngày đặt: {new Date(order.created_at).toLocaleDateString()}</span>
                              <span className="font-bold text-gray-600 text-sm">Địa chỉ: {order.customer_address}</span>
                          </div>
                          <div className="flex flex-col items-end">
                              <span className="font-comic text-2xl text-primary">{order.total_amount.toLocaleString()}đ</span>
                              <span className={`font-black uppercase px-2 py-1 border-2 border-black ${order.status === 'Chờ xác nhận' ? 'bg-yellow-400' : order.status === 'Đang giao' ? 'bg-blue-400' : order.status === 'Hoàn thành' ? 'bg-green-400' : 'bg-red-400'}`}>
                                  {order.status}
                              </span>
                          </div>
                      </div>
                  ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
