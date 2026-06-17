import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  
  const currentPage = parseInt(searchParams.get('page') || '1');
  const keyword = searchParams.get('keyword') || '';
  const category = searchParams.get('category') || 'Tất cả';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';

  const [searchInput, setSearchInput] = useState(keyword);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/api/products', {
          params: {
            page: currentPage,
            keyword,
            category,
            minPrice,
            maxPrice
          }
        });
        if (response.data.success) {
          setProducts(response.data.products || []);
          setTotalPages(response.data.totalPages || 1);
        } else {
          // Mock data if backend is not ready
          setProducts([
            { _id: '1', name: 'One Piece Tập 100', price: 25000, stock: 10, image: 'onepiece.jpg' },
            { _id: '2', name: 'Naruto Tập 72', price: 20000, stock: 5, image: 'naruto.jpg' },
            { _id: '3', name: 'Jujutsu Kaisen Tập 0', price: 30000, stock: 0, image: 'jjk.jpg' },
            { _id: '4', name: 'Demon Slayer Tập 23', price: 25000, stock: 15, image: 'kny.jpg' }
          ]);
        }
      } catch (error) {
        console.error('Error fetching products', error);
        // Fallback mock data
        setProducts([
          { _id: '1', name: 'One Piece Tập 100', price: 25000, stock: 10, image: 'onepiece.jpg' },
          { _id: '2', name: 'Naruto Tập 72', price: 20000, stock: 5, image: 'naruto.jpg' },
          { _id: '3', name: 'Jujutsu Kaisen Tập 0', price: 30000, stock: 0, image: 'jjk.jpg' },
          { _id: '4', name: 'Demon Slayer Tập 23', price: 25000, stock: 15, image: 'kny.jpg' }
        ]);
        setTotalPages(3);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentPage, keyword, category, minPrice, maxPrice]);

  const handleSearch = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (searchInput) newParams.set('keyword', searchInput);
    else newParams.delete('keyword');
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const handleCategoryChange = (e) => {
    const newParams = new URLSearchParams(searchParams);
    if (e.target.value !== 'Tất cả') newParams.set('category', e.target.value);
    else newParams.delete('category');
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  return (
    <div className="w-full">
      {/* Hero Banner Comic */}
      <div data-aos="zoom-out-down" className="relative bg-primary dark:bg-red-900 border-4 border-black dark:border-white shadow-comic-lg dark:shadow-comic-lg-dark mb-12 p-8 md:p-16 text-center transform -rotate-1 transition-colors">
        <div className="absolute inset-0 opacity-10 dark:opacity-20 bg-[url('data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'2\' cy=\'2\' r=\'2\' fill=\'%23000000\'/%3E%3C/svg%3E')]"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <div className="inline-block bg-secondary dark:bg-yellow-600 border-4 border-black dark:border-white px-6 py-2 transform rotate-3 shadow-comic dark:shadow-comic-dark mb-4 animate-float-comic">
            <span className="font-black text-xl text-dark dark:text-white">🔥 KHO SIÊU PHẨM 🔥</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-comic text-white tracking-wider uppercase mb-8" style={{ WebkitTextStroke: '2px black', textShadow: '4px 4px 0 #000' }}>
            TÌM KIẾM TRUYỆN YÊU THÍCH!
          </h1>
          
          {/* Thanh Tìm Kiếm & Lọc Chủ Đề */}
          <form onSubmit={handleSearch} className="w-full max-w-4xl flex flex-col md:flex-row items-center gap-2 transform rotate-1">
            <select value={category} onChange={handleCategoryChange} className="w-full md:w-auto bg-white dark:bg-gray-800 border-4 border-black dark:border-white px-4 py-4 text-xl font-black text-dark dark:text-white focus:outline-none shadow-comic dark:shadow-comic-dark cursor-pointer">
              <option value="Tất cả">Tất cả Thể loại</option>
              <option value="Hành động">Hành động</option>
              <option value="Kỳ ảo">Kỳ ảo</option>
              <option value="Tình cảm">Tình cảm</option>
              <option value="Hài hước">Hài hước</option>
              <option value="Thể thao">Thể thao</option>
              <option value="Tâm lý">Tâm lý</option>
              <option value="Trinh thám">Trinh thám</option>
              <option value="Võ thuật">Võ thuật</option>
              <option value="Khác">Khác</option>
            </select>

            <input 
              type="text" 
              value={searchInput} 
              onChange={(e) => setSearchInput(e.target.value)} 
              placeholder="Gõ tên truyện vào đây..." 
              autoComplete="off"
              className="w-full flex-grow bg-white dark:bg-gray-800 border-4 border-black dark:border-white px-6 py-4 text-xl md:text-2xl font-black text-dark dark:text-white focus:outline-none focus:bg-yellow-50 dark:focus:bg-gray-700 shadow-comic dark:shadow-comic-dark" 
            />
            
            <button type="submit" className="w-full md:w-auto bg-accent dark:bg-teal-700 text-dark dark:text-white border-4 border-black dark:border-white px-8 py-4 font-comic text-2xl md:text-3xl tracking-widest uppercase shadow-comic dark:shadow-comic-dark hover:-translate-y-1 hover:shadow-comic-lg dark:hover:shadow-comic-lg-dark transition-all flex items-center justify-center gap-2">
              <span>TÌM!</span>
              {loading && (
                <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Grid Wrapper */}
      <div className="relative overflow-hidden w-full">
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4 w-full flex-shrink-0 transition-opacity duration-300 ${loading ? 'opacity-50' : 'opacity-100'}`}>
          {products.length === 0 && !loading ? (
            <div className="col-span-full text-center py-16">
              <h3 className="font-comic text-4xl text-dark dark:text-white tracking-widest uppercase" style={{ WebkitTextStroke: '1px black' }}>KHÔNG TÌM THẤY TRUYỆN NÀO! 😭</h3>
              <p className="font-black text-gray-500 mt-4 uppercase">Thử gõ từ khóa khác xem sao nha wibu!</p>
            </div>
          ) : (
            products.map((sach, index) => (
              <div key={sach._id} data-aos="fade-up" data-aos-delay={(index % 8) * 50} className="manga-card-tilt bg-white dark:bg-gray-800 border-4 border-black dark:border-white shadow-comic dark:shadow-comic-dark hover:shadow-comic-lg dark:hover:shadow-comic-lg-dark transition-all flex flex-col group relative overflow-hidden transform animate-pulse-shadow">
                
                {sach.stock <= 0 && (
                  <div className="absolute inset-0 bg-black/60 z-20 flex items-center justify-center">
                    <span className="bg-primary dark:bg-red-800 text-white font-comic tracking-widest text-3xl border-4 border-black dark:border-white px-4 py-2 transform -rotate-12 shadow-comic dark:shadow-comic-dark">HẾT HÀNG!</span>
                  </div>
                )}

                <div className="absolute top-0 right-0 z-10 transform translate-x-2 -translate-y-2">
                  <div className="bg-secondary dark:bg-yellow-600 border-4 border-black dark:border-white text-dark dark:text-white font-black text-sm uppercase px-3 py-1 shadow-comic dark:shadow-comic-dark rotate-12">NEW!</div>
                </div>

                <div className="h-80 bg-gray-100 dark:bg-gray-700 border-b-4 border-black dark:border-white relative overflow-hidden">
                  {sach.image ? (
                    <img src={sach.image} alt={sach.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-600">
                      <span className="font-comic text-2xl text-gray-400 dark:text-gray-300 transform -rotate-12">NO IMAGE</span>
                    </div>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-grow bg-white dark:bg-gray-800">
                  <h3 className="font-black text-xl text-dark dark:text-white line-clamp-2 mb-3 uppercase group-hover:text-primary dark:group-hover:text-primary transition-colors leading-tight">
                    {sach.name}
                  </h3>

                  <div className="mt-auto pt-4 border-t-4 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-between justify-center">
                    <div>
                      <div className="text-2xl font-comic text-primary tracking-widest" style={{ WebkitTextStroke: '1px black' }}>
                        {sach.price.toLocaleString()}đ
                      </div>
                      <div className="text-xs font-black text-gray-500 dark:text-gray-400 uppercase">Kho: {sach.stock > 0 ? sach.stock : '0'} cuốn</div>
                    </div>
                    <Link to={`/customer/detail/${sach._id}`} className="bg-accent dark:bg-teal-700 border-4 border-black dark:border-white text-dark dark:text-white text-center mt-4 font-black px-4 py-2 hover:bg-secondary dark:hover:bg-yellow-600 transition-colors shadow-comic dark:shadow-comic-dark hover:shadow-comic-hover dark:hover:shadow-comic-hover-dark hover:translate-x-1 hover:translate-y-1">
                      XEM!
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-16 gap-8 pb-10">
          <div className="flex gap-3">
            {currentPage > 1 && (
              <>
                <Link to={`/customer?page=1${keyword ? `&keyword=${keyword}` : ''}`} className="px-5 py-2 border-4 border-black dark:border-white bg-white dark:bg-gray-800 font-black text-dark dark:text-white hover:bg-secondary dark:hover:bg-yellow-600 hover:-translate-y-1 shadow-comic dark:shadow-comic-dark transition-all uppercase" title="Trang Đầu">&lt;&lt;</Link>
                <Link to={`/customer?page=${currentPage - 1}${keyword ? `&keyword=${keyword}` : ''}`} className="px-5 py-2 border-4 border-black dark:border-white bg-white dark:bg-gray-800 font-black text-dark dark:text-white hover:bg-secondary dark:hover:bg-yellow-600 hover:-translate-y-1 shadow-comic dark:shadow-comic-dark transition-all uppercase">Trang Trước</Link>
              </>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(i => i >= currentPage - 1 && i <= currentPage + 1)
              .map(i => (
                <Link key={i} to={`/customer?page=${i}${keyword ? `&keyword=${keyword}` : ''}`} className={`px-5 py-2 border-4 border-black dark:border-white font-black transition-all shadow-comic dark:shadow-comic-dark uppercase ${i === currentPage ? 'bg-primary dark:bg-red-800 text-white -translate-y-1' : 'bg-white dark:bg-gray-800 text-dark dark:text-white hover:bg-secondary dark:hover:bg-yellow-600 hover:-translate-y-1'}`}>
                  {i}
                </Link>
              ))}

            {currentPage < totalPages && (
              <>
                <Link to={`/customer?page=${currentPage + 1}${keyword ? `&keyword=${keyword}` : ''}`} className="px-5 py-2 border-4 border-black dark:border-white bg-white dark:bg-gray-800 font-black text-dark dark:text-white hover:bg-secondary dark:hover:bg-yellow-600 hover:-translate-y-1 shadow-comic dark:shadow-comic-dark transition-all uppercase">Trang Kế</Link>
                <Link to={`/customer?page=${totalPages}${keyword ? `&keyword=${keyword}` : ''}`} className="px-5 py-2 border-4 border-black dark:border-white bg-white dark:bg-gray-800 font-black text-dark dark:text-white hover:bg-secondary dark:hover:bg-yellow-600 hover:-translate-y-1 shadow-comic dark:shadow-comic-dark transition-all uppercase" title="Trang Cuối">&gt;&gt;</Link>
              </>
            )}
          </div>
          
          <div className="font-black text-dark dark:text-white text-lg bg-white dark:bg-gray-800 px-4 py-2 border-4 border-black dark:border-white shadow-comic dark:shadow-comic-dark transform rotate-2">
            Trang {currentPage} / {totalPages}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
