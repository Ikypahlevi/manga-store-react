import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cartSize, setCartSize] = useState(0);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  useEffect(() => {
    // Init Dark Mode
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    const loadCart = async () => {
      if (user) {
         try {
             const res = await axios.get('http://localhost:5000/api/cart');
             const totalItems = res.data.reduce((sum, item) => sum + item.quantity, 0);
             setCartSize(totalItems);
         } catch (e) {
             console.error('Error fetching cart', e);
         }
      } else {
         const guestCart = JSON.parse(localStorage.getItem('guestCart')) || [];
         const totalItems = guestCart.reduce((sum, item) => sum + item.quantity, 0);
         setCartSize(totalItems);
      }
    };
    
    loadCart();

    const handleCartUpdate = () => {
        loadCart();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, [user]);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/auth/login');
  };

  return (
    <header data-aos="slide-down" data-aos-duration="500" className="bg-secondary dark:bg-gray-800 border-b-4 border-black dark:border-white sticky top-0 z-50 shadow-comic-lg dark:shadow-comic-lg-dark w-full transition-colors">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        
        <Link to="/customer" className="text-4xl text-white font-comic tracking-wider flex items-center gap-2 transform -rotate-2 hover:rotate-0 transition-transform" style={{ WebkitTextStroke: '2px black' }}>
          💥 MANGA STORE
        </Link>

        <nav className="flex items-center gap-4">
          <Link to="/customer" className="text-lg font-black uppercase text-dark dark:text-white hover:bg-white dark:hover:bg-gray-700 border-2 border-transparent hover:border-black dark:hover:border-white hover:shadow-comic dark:hover:shadow-comic-dark px-3 py-1 transition-all rounded">
            Shop Truyện
          </Link>
          
          <Link to="/gacha" className="text-lg font-black uppercase text-dark dark:text-white hover:bg-accent dark:hover:bg-teal-700 border-2 border-transparent hover:border-black dark:hover:border-white hover:shadow-comic dark:hover:shadow-comic-dark px-3 py-1 transition-all rounded">
            🎰 Gacha
          </Link>

          {/* Dark Mode Toggle */}
          <button onClick={toggleDarkMode} className="relative flex items-center justify-center bg-dark text-white dark:bg-white dark:text-dark border-2 border-black p-2 rounded shadow-comic hover:shadow-comic-lg hover:-translate-y-0.5 transition-all group" title="Bật/Tắt Dark Mode">
            {isDarkMode ? (
              <svg className="w-6 h-6 block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            ) : (
              <svg className="w-6 h-6 block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
              </svg>
            )}
          </button>

          {/* Cart Icon */}
          <Link to="/customer/cart" className="relative flex items-center justify-center bg-white dark:bg-gray-700 border-2 border-black dark:border-white p-2 rounded shadow-comic dark:shadow-comic-dark hover:shadow-comic-lg dark:hover:shadow-comic-lg-dark hover:-translate-y-0.5 transition-all text-dark dark:text-white mr-2" title="Xem Giỏ Hàng">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
            <div className="absolute -top-2.5 -right-2.5 bg-primary border-2 border-black dark:border-white text-white text-xs font-black rounded-full w-6 h-6 flex items-center justify-center shadow-comic-hover dark:shadow-comic-hover-dark">
              {cartSize}
            </div>
          </Link>

          {user ? (
            <>
              {/* Notification Bell */}
              <div className="relative ml-2 flex items-center">
                <button onClick={() => setShowNotifDropdown(!showNotifDropdown)} className="relative flex items-center justify-center bg-white dark:bg-gray-700 border-2 border-black dark:border-white p-2 rounded shadow-comic dark:shadow-comic-dark hover:shadow-comic-lg dark:hover:shadow-comic-lg-dark hover:-translate-y-0.5 transition-all text-dark dark:text-white" title="Thông báo">
                  <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                  {/* Badge */}
                  {/* <div className="absolute -top-2.5 -right-2.5 bg-accent border-2 border-black dark:border-white text-dark text-xs font-black rounded-full w-6 h-6 flex items-center justify-center shadow-comic-hover">0</div> */}
                </button>
                
                {/* Notification Dropdown */}
                {showNotifDropdown && (
                  <div className="absolute right-0 top-full mt-3 w-80 bg-white dark:bg-gray-800 border-4 border-black dark:border-white shadow-comic-lg dark:shadow-comic-lg-dark transition-all flex flex-col z-[100] transform origin-top-right max-h-96 overflow-y-auto">
                    <div className="px-4 py-3 border-b-4 border-black dark:border-white bg-accent dark:bg-teal-700 text-dark dark:text-white font-black uppercase text-lg sticky top-0 z-10 flex justify-between items-center">
                      THÔNG BÁO MỚI
                    </div>
                    <div className="flex flex-col">
                      <div className="p-4 text-center text-gray-500 font-bold italic">Không có thông báo mới.</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Dropdown */}
              <div className="relative group pl-4 border-l-4 border-black dark:border-white ml-4 h-10 flex items-center" onMouseEnter={() => setShowProfileDropdown(true)} onMouseLeave={() => setShowProfileDropdown(false)}>
                <button className="flex items-center gap-2 text-lg font-black text-dark dark:text-white bg-white dark:bg-gray-700 border-2 border-black dark:border-white px-3 py-1 rounded shadow-comic dark:shadow-comic-dark group-hover:-translate-y-0.5 group-hover:shadow-comic-lg dark:group-hover:shadow-comic-lg-dark transition-all">
                  {user.avatar ? (
                    <img src={user.avatar} className="w-6 h-6 rounded-full border border-black object-cover bg-white" alt="Avatar" />
                  ) : (
                    <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${user.username}&backgroundColor=FFD166`} className="w-6 h-6 rounded-full border border-black bg-secondary" alt="Avatar" />
                  )}
                  YO, {user.username}!
                  <span className="bg-secondary text-dark text-xs px-2 py-0.5 border-2 border-black rounded-full whitespace-nowrap shadow-comic-hover">💰 {user.mangaCoin || 0}</span>
                  <svg className="w-4 h-4 transform group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>

                {showProfileDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-800 border-4 border-black dark:border-white shadow-comic-lg dark:shadow-comic-lg-dark transition-all flex flex-col z-[100] transform origin-top-right">
                    <Link to="/customer/profile" className="flex items-center gap-2 px-4 py-3 font-black text-dark dark:text-white hover:bg-secondary dark:hover:bg-gray-700 border-b-4 border-black dark:border-white uppercase text-sm transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                      Hồ Sơ VIP
                    </Link>
                    {user.role === 'ADMIN' && (
                      <Link to="/admin" className="flex items-center gap-2 px-4 py-3 font-black text-dark dark:text-white hover:bg-accent dark:hover:bg-gray-700 border-b-4 border-black dark:border-white uppercase text-sm transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        Quản Trị Admin
                      </Link>
                    )}
                    <button onClick={handleLogout} className="flex w-full items-center gap-2 px-4 py-3 font-black text-primary hover:bg-gray-100 dark:hover:bg-gray-700 uppercase text-sm transition-colors text-left">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                      </svg>
                      Đăng Xuất Nhé!
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/auth/login" className="px-5 py-2 text-lg font-comic tracking-wider bg-primary text-white border-2 border-black dark:border-white rounded shadow-comic dark:shadow-comic-dark hover:-translate-y-0.5 hover:shadow-comic-lg dark:hover:shadow-comic-lg-dark transition-all">
                ĐĂNG NHẬP
              </Link>
              <Link to="/auth/register" className="px-5 py-2 text-lg font-comic tracking-wider bg-accent text-dark border-2 border-black dark:border-white rounded shadow-comic dark:shadow-comic-dark hover:-translate-y-0.5 hover:shadow-comic-lg dark:hover:shadow-comic-lg-dark transition-all">
                ĐĂNG KÝ
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
