import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const { user } = useAuth();

  const loadCart = async () => {
    if (user) {
      try {
        const res = await axios.get('http://localhost:5000/api/cart');
        const cartData = res.data;
        const cartArray = Object.values(cartData).map(item => {
            let imgPath = item.sach.hinh_anh || '';
            if (imgPath && !imgPath.startsWith('/')) {
                imgPath = imgPath.startsWith('img/') ? '/' + imgPath : '/img/' + imgPath;
            }
            return {
                id: item.sach.ma_sach,
                name: item.sach.ten_sach,
                price: item.sach.gia_tien,
                quantity: item.quantity,
                image: imgPath
            };
        });
        setCart(cartArray);
      } catch (err) {
        console.error('Error loading cart', err);
      }
    } else {
      const guestCart = JSON.parse(localStorage.getItem('guestCart')) || [];
      const cartArray = guestCart.map(item => {
          let imgPath = item.image || '';
          if (imgPath && !imgPath.startsWith('/')) {
              imgPath = imgPath.startsWith('img/') ? '/' + imgPath : '/img/' + imgPath;
          }
          return {
              id: item.maSach,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              image: imgPath
          };
      });
      setCart(cartArray);
    }
  };

  useEffect(() => {
    loadCart();
  }, [user]);

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const updateQuantity = async (id, delta) => {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    const newQty = item.quantity + delta;
    if (newQty <= 0) return;

    if (user) {
        try {
            await axios.put('http://localhost:5000/api/cart/update', { maSach: id, quantity: newQty });
            loadCart();
            window.dispatchEvent(new Event('cartUpdated'));
        } catch (err) {
            console.error('Error updating quantity', err);
        }
    } else {
        const guestCart = JSON.parse(localStorage.getItem('guestCart')) || [];
        const existingItem = guestCart.find(i => i.maSach === id);
        if (existingItem) existingItem.quantity = newQty;
        localStorage.setItem('guestCart', JSON.stringify(guestCart));
        loadCart();
        window.dispatchEvent(new Event('cartUpdated'));
    }
  };

  const removeItem = async (id) => {
    if (user) {
        try {
            await axios.delete(`http://localhost:5000/api/cart/remove/${id}`);
            loadCart();
            window.dispatchEvent(new Event('cartUpdated'));
        } catch (err) {
            console.error('Error removing item', err);
        }
    } else {
        const guestCart = JSON.parse(localStorage.getItem('guestCart')) || [];
        const newCart = guestCart.filter(i => i.maSach !== id);
        localStorage.setItem('guestCart', JSON.stringify(newCart));
        loadCart();
        window.dispatchEvent(new Event('cartUpdated'));
    }
  };

  return (
    <div className="max-w-6xl mx-auto mb-12 px-4 md:px-0">
      <div data-aos="fade-down" className="mb-8 pb-4 border-b-4 border-black dark:border-white">
        <h1 className="text-5xl font-comic text-dark dark:text-white tracking-widest uppercase transform -rotate-1" style={{ WebkitTextStroke: '1px black', textShadow: '2px 2px 0 #FFD166' }}>
          GIỎ TRUYỆN CỦA BẠN
        </h1>
        <p className="font-black text-gray-500 dark:text-gray-400 mt-2 uppercase">Lựa chọn tối thượng trước khi thanh toán</p>
      </div>

      {cart.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 border-4 border-black dark:border-white p-12 text-center shadow-comic-lg dark:shadow-comic-lg-dark my-12 transform rotate-1 transition-colors">
          <h2 className="text-4xl font-comic text-primary tracking-wider mb-4" style={{ WebkitTextStroke: '1px black' }}>GIỎ HÀNG ĐANG TRỐNG RỖNG!</h2>
          <Link to="/customer" className="inline-block bg-accent dark:bg-teal-700 hover:bg-white dark:hover:bg-gray-700 text-dark dark:text-white border-4 border-black dark:border-white px-8 py-4 font-comic text-2xl tracking-widest shadow-comic dark:shadow-comic-dark hover:shadow-comic-lg hover:-translate-y-1 transition uppercase">
            QUAY LẠI CỬA HÀNG HỐT TRUYỆN!
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-8/12 flex flex-col gap-6">
            <div className="bg-white dark:bg-gray-800 border-4 border-black dark:border-white shadow-comic-lg dark:shadow-comic-lg-dark p-6 flex flex-col gap-6 transition-colors">
              {cart.map((item, idx) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between border-b-4 border-black dark:border-white pb-6 last:border-b-0 last:pb-0 gap-4">
                  <div className="flex items-center gap-4 w-full sm:w-1/2">
                    <div className="w-16 h-24 bg-secondary dark:bg-yellow-700 border-2 border-black dark:border-white p-1 shadow-comic dark:shadow-comic-dark flex-shrink-0 flex items-center justify-center">
                      <img src={`/img/${item.image}`} alt={item.name} className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-black text-lg text-dark dark:text-white uppercase line-clamp-2">{item.name}</h3>
                      <p className="font-comic text-primary text-md mt-1 tracking-wider" style={{ WebkitTextStroke: '0.5px black' }}>
                        Đơn giá: {item.price.toLocaleString()}đ
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-1/2">
                    <div className="flex items-center border-4 border-black dark:border-white shadow-comic dark:shadow-comic-dark bg-white dark:bg-gray-700 rounded text-dark dark:text-white">
                      <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1 font-black hover:bg-secondary dark:hover:bg-yellow-600 border-r-4 border-black dark:border-white transition-colors">-</button>
                      <span className="px-4 font-black text-base">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1 font-black hover:bg-secondary dark:hover:bg-yellow-600 border-l-4 border-black dark:border-white transition-colors">+</button>
                    </div>
                    
                    <div className="text-right min-w-[100px]">
                      <div className="font-black text-xs text-gray-400 uppercase">Thành tiền</div>
                      <div className="font-comic text-xl text-primary tracking-widest mt-0.5" style={{ WebkitTextStroke: '1px black' }}>
                        {(item.price * item.quantity).toLocaleString()}đ
                      </div>
                    </div>
                    
                    <button onClick={() => removeItem(item.id)} className="bg-primary text-white border-2 border-black dark:border-white p-2 shadow-comic dark:shadow-comic-dark hover:bg-dark hover:text-white hover:-translate-y-0.5 transition-all rounded">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="w-full lg:w-4/12">
            <div className="bg-white dark:bg-gray-800 border-4 border-black dark:border-white p-6 shadow-comic-lg dark:shadow-comic-lg-dark flex flex-col gap-6 sticky top-28 transform rotate-1 transition-colors animate-pulse-shadow">
              <div className="bg-secondary dark:bg-yellow-700 border-4 border-black dark:border-white p-4 shadow-comic dark:shadow-comic-dark transform -rotate-1">
                <h4 className="font-comic text-2xl text-dark dark:text-white tracking-wider mb-1">TỔNG ĐƠN HÀNG:</h4>
                <p className="font-bold text-gray-700 dark:text-gray-200 text-sm">Vui lòng rà soát kỹ lưỡng danh sách truyện trước khi tiến hành thanh toán!</p>
              </div>
              <div className="flex flex-col gap-4 border-b-4 border-black dark:border-white pb-4">
                <div className="flex justify-between items-center">
                  <span className="font-black text-gray-500 dark:text-gray-400 uppercase text-xs">Tổng số lượng</span>
                  <span className="font-black text-dark dark:text-white text-lg">{totalItems} cuốn</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-black text-gray-500 dark:text-gray-400 uppercase text-xs">Phí vận chuyển</span>
                  <span className="font-comic text-accent text-lg tracking-wider" style={{ WebkitTextStroke: '0.5px black' }}>FREE SHIP</span>
                </div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-black text-dark dark:text-white uppercase text-sm">Tổng thanh toán</span>
                <div className="font-comic text-3xl text-primary tracking-widest" style={{ WebkitTextStroke: '1px black' }}>
                  {totalAmount.toLocaleString()}đ
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <Link to="/customer/checkout" className="w-full bg-accent dark:bg-teal-700 border-4 border-black dark:border-white text-dark dark:text-white font-comic text-3xl tracking-widest py-3 rounded shadow-comic-lg hover:shadow-comic-hover hover:translate-y-1 hover:translate-x-1 hover:bg-white transition-all uppercase flex items-center justify-center gap-2" style={{ WebkitTextStroke: '1px black' }}>
                  MÚC LUÔN!
                </Link>
                <Link to="/customer" className="w-full bg-white dark:bg-gray-700 border-4 border-black dark:border-white text-dark dark:text-white font-comic text-xl tracking-widest py-3 rounded shadow-comic dark:shadow-comic-dark hover:shadow-comic-hover hover:translate-y-1 hover:translate-x-1 hover:bg-gray-100 transition-all uppercase text-center flex items-center justify-center">
                  TIẾP TỤC HỐT TRUYỆN
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
