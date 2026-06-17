import React, { useState } from 'react';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user')) || { username: 'Guest', role: 'USER', mangaCoin: 0, rankTier: 'WIBU CHUẨN', avatar: '' };
  const [showOrderModal, setShowOrderModal] = useState(false);
  
  const favList = [];
  const listOrders = [];

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
          {/* list items here */}
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
            <div className="p-4 overflow-y-auto min-h-[200px] flex items-center justify-center">
              <p className="font-comic text-xl">CHƯA TỪNG MÚC CUỐN NÀO!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
