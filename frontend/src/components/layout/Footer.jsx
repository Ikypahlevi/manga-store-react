import React, { useEffect } from 'react';

const Footer = () => {
  return (
    <footer className="bg-primary dark:bg-red-900 text-white border-t-4 border-black dark:border-white mt-auto relative overflow-hidden transition-colors" data-aos="fade-up">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white dark:bg-gray-800 border-4 border-black dark:border-white p-6 shadow-comic dark:shadow-comic-dark transform -rotate-1">
            <h3 className="text-3xl font-comic text-dark dark:text-white mb-4 tracking-wide">VỀ MANGA STORE</h3>
            <p className="text-dark dark:text-gray-300 font-bold">Căn cứ điểm của mọi Wibu! Nơi cập nhật truyện mới nhanh nhất hệ mặt trời. Mua ngay kẻo lỡ!</p>
          </div>
          
          <div className="bg-secondary dark:bg-yellow-600 border-4 border-black dark:border-white p-6 shadow-comic dark:shadow-comic-dark transform rotate-1">
            <h3 className="text-3xl font-comic text-dark dark:text-white mb-4 tracking-wide">LUẬT LÀNG</h3>
            <ul className="space-y-2 text-dark dark:text-white font-black">
              <li>🔥 Đọc ké bị bế lên phường</li>
              <li>🔥 Hàng mua rồi không đổi trả</li>
              <li>🔥 Nhớ bọc bìa truyện cẩn thận</li>
            </ul>
          </div>
          
          <div className="bg-accent dark:bg-teal-700 border-4 border-black dark:border-white p-6 shadow-comic dark:shadow-comic-dark transform -rotate-2">
            <h3 className="text-3xl font-comic text-dark dark:text-white mb-4 tracking-wide">TỔNG ĐÀI GỌI HỘI</h3>
            <ul className="space-y-2 text-dark dark:text-white font-black">
              <li>📍 Ngõ 123 Làng Mộc Diệp</li>
              <li>📞 0999-WIBU-NEVER-DIE</li>
              <li>✉️ manga@shop.vn</li>
            </ul>
          </div>

        </div>
        
        <div className="mt-12 text-center text-white font-black text-xl bg-black inline-block px-4 py-2 border-2 border-white transform rotate-1">
          &copy; 2026 MANGA STORE CO., LTD.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
