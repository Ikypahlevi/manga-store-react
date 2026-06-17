import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrLoading, setQrLoading] = useState(false);
  const [qrSuccess, setQrSuccess] = useState(false);
  const navigate = useNavigate();

  const { user } = useAuth();
  const [customerName, setCustomerName] = useState(user?.username || '');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  const submitOrder = async () => {
    try {
      await axios.post('http://localhost:5000/api/orders/place', {
        customerName,
        customerPhone,
        customerAddress,
        voucherCode: null,
        discountAmount: 0
      });
      alert('Chốt đơn thành công!');
      window.dispatchEvent(new Event('cartUpdated'));
      navigate('/customer');
    } catch (err) {
      console.error(err);
      alert('Có lỗi xảy ra khi đặt hàng!');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
        alert('Vui lòng đăng nhập để đặt hàng!');
        navigate('/auth/login');
        return;
    }
    if (paymentMethod === 'QR' && !qrSuccess) {
      setShowQRModal(true);
    } else {
      submitOrder();
    }
  };

  const handleQRConfirm = () => {
    setQrLoading(true);
    setTimeout(() => {
      setQrSuccess(true);
      setQrLoading(false);
      setTimeout(() => {
        setShowQRModal(false);
        submitOrder();
      }, 1500);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto mb-16 px-4">
      <div data-aos="zoom-in" className="mb-10 text-center">
        <div className="inline-block bg-accent dark:bg-teal-700 border-4 border-black dark:border-white px-6 py-2 transform -rotate-2 shadow-comic dark:shadow-comic-dark mb-4 animate-float-comic">
          <span className="font-black text-xl text-dark dark:text-white tracking-widest">BƯỚC CUỐI CÙNG!</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-comic text-dark dark:text-white tracking-wider uppercase" style={{ WebkitTextStroke: '2px black', textShadow: '4px 4px 0 #06D6A0' }}>
          CHỐT ĐƠN SIÊU TỐC
        </h1>
      </div>

      {!user && (
        <div className="bg-primary dark:bg-red-800 border-4 border-black dark:border-white p-4 mb-8 flex items-center justify-between shadow-comic dark:shadow-comic-dark transform rotate-1 transition-colors">
          <div className="flex items-center gap-3 text-white">
            <span className="font-black text-lg">HẸP! Đăng nhập để đơn hàng được lưu vào hồ sơ VIP nhé!</span>
          </div>
          <button onClick={() => navigate('/auth/login')} className="bg-white dark:bg-gray-700 text-dark dark:text-white font-black px-4 py-2 border-2 border-black dark:border-white hover:bg-secondary dark:hover:bg-yellow-600 transition shadow-comic dark:shadow-comic-dark uppercase text-sm">
            Đăng Nhập Ngay
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div data-aos="fade-right" className="bg-white dark:bg-gray-800 border-4 border-black dark:border-white p-8 shadow-comic-lg dark:shadow-comic-lg-dark flex flex-col transition-colors">
          <h2 className="text-3xl font-comic text-dark dark:text-white border-b-4 border-black dark:border-white pb-3 mb-6 uppercase">Thông Tin Phóng Ship</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col">
              <label className="font-black text-dark dark:text-white uppercase mb-1">Tên Người Nhận <span className="text-primary">*</span></label>
              <input type="text" required minLength="2" placeholder="Ví dụ: Lufy Mũ Rơm" value={customerName} onChange={e => setCustomerName(e.target.value)} className="w-full bg-gray-50 dark:bg-gray-700 border-4 border-black dark:border-white p-3 font-bold text-dark dark:text-white focus:bg-yellow-50 focus:outline-none focus:-translate-y-1 shadow-comic" />
            </div>
            <div className="flex flex-col">
              <label className="font-black text-dark dark:text-white uppercase mb-1">Số Điện Thoại <span className="text-primary">*</span></label>
              <input type="text" required placeholder="0987xxxxxx" value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} className="w-full bg-gray-50 dark:bg-gray-700 border-4 border-black dark:border-white p-3 font-bold text-dark dark:text-white focus:bg-yellow-50 focus:outline-none focus:-translate-y-1 shadow-comic" />
            </div>
            <div className="flex flex-col flex-grow">
              <label className="font-black text-dark dark:text-white uppercase mb-1">Địa Chỉ <span className="text-primary">*</span></label>
              <textarea required minLength="5" rows="3" placeholder="Ghi rõ số nhà..." value={customerAddress} onChange={e => setCustomerAddress(e.target.value)} className="w-full bg-gray-50 dark:bg-gray-700 border-4 border-black dark:border-white p-3 font-bold text-dark dark:text-white focus:bg-yellow-50 focus:outline-none focus:-translate-y-1 shadow-comic resize-none"></textarea>
            </div>
            <div className="flex flex-col mt-2">
              <label className="font-black text-dark dark:text-white uppercase mb-2">Phương thức thanh toán <span className="text-primary">*</span></label>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-3 p-3 border-4 border-black dark:border-white bg-gray-50 cursor-pointer hover:bg-yellow-50 transition-colors shadow-sm text-black">
                  <input type="radio" name="paymentMethod" value="COD" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} className="w-5 h-5 text-primary focus:ring-primary border-black" />
                  <span className="font-bold uppercase">Thanh toán khi nhận hàng (COD)</span>
                </label>
                <label className="flex items-center gap-3 p-3 border-4 border-black dark:border-white bg-gray-50 cursor-pointer hover:bg-yellow-50 transition-colors shadow-sm text-black">
                  <input type="radio" name="paymentMethod" value="QR" checked={paymentMethod === 'QR'} onChange={() => setPaymentMethod('QR')} className="w-5 h-5 text-primary focus:ring-primary border-black" />
                  <span className="font-bold uppercase">Chuyển khoản QR</span>
                </label>
              </div>
            </div>
            <button type="submit" className="w-full bg-primary dark:bg-red-800 border-4 border-black dark:border-white text-white font-comic text-3xl tracking-widest py-4 rounded shadow-comic-lg hover:shadow-comic-hover hover:translate-y-1 hover:bg-dark transition-all uppercase flex items-center justify-center gap-3 mt-4">
              XÁC NHẬN CHỐT ĐƠN!
            </button>
          </form>
        </div>
      </div>

      {showQRModal && (
        <div className="fixed inset-0 z-[200] bg-black/90 flex flex-col items-center justify-center p-4">
          <div className="bg-white border-[8px] border-black p-8 max-w-sm w-full flex flex-col items-center shadow-[16px_16px_0_0_#06D6A0] transform rotate-1 relative">
            <h2 className="font-comic text-3xl text-center uppercase mb-4" style={{ WebkitTextStroke: '1px black' }}>Quét Mã Nhanh</h2>
            <div className="bg-gray-100 p-4 border-4 border-black w-full flex justify-center mb-4 relative">
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=MOMO|0987654321|100000|MUASACH`} alt="QR" className="w-48 h-48 object-contain" />
            </div>
            {!qrSuccess ? (
              <>
                <button type="button" onClick={handleQRConfirm} className="w-full bg-primary border-4 border-black text-white font-black text-xl py-3 hover:bg-dark hover:text-primary transition-colors uppercase shadow-[4px_4px_0_0_#000]">
                  Tôi Đã Chuyển Khoản
                </button>
                <button type="button" onClick={() => setShowQRModal(false)} className="mt-4 font-bold text-gray-500 hover:text-black uppercase text-sm underline tracking-wide">
                  Hủy & Đổi Phương Thức
                </button>
              </>
            ) : (
              <p className="font-black text-2xl text-center uppercase text-accent">Chuyển tiền thành công!</p>
            )}
            {qrLoading && (
              <div className="absolute inset-0 bg-white/95 z-10 flex flex-col items-center justify-center border-[8px] border-black">
                <p className="font-black text-2xl text-center uppercase animate-pulse text-dark">Đang xác nhận...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
