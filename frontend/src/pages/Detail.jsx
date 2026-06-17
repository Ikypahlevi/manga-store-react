import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [showReader, setShowReader] = useState(false);
  const [readerPage, setReaderPage] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products/${id}`);
        if (response.data.success) {
          setProduct(response.data.product);
          setReviews(response.data.reviews || []);
          setIsFavorite(response.data.isFavorite || false);
        } else {
          mockData();
        }
      } catch (error) {
        mockData();
      } finally {
        setLoading(false);
      }
    };

    const mockData = () => {
      setProduct({
        _id: id,
        name: 'One Piece Tập 100',
        price: 25000,
        stock: 10,
        image: 'onepiece.jpg',
        description: 'Bộ truyện cực kỳ hấp dẫn đang làm mưa làm gió trên bảng xếp hạng Oricon. Một khi đã đọc là không thể rời mắt. Mua ngay để bổ sung vào bộ sưu tập của bạn!'
      });
      setReviews([
        { id: 1, username: 'Wibu_Chúa', rating: 5, comment: 'Truyện hay xuất sắc!', createdAt: new Date() }
      ]);
    };

    fetchProduct();
  }, [id]);

  const addToCart = () => {
    alert('Đã thêm vào giỏ hàng!');
    // Trigger header update event or context
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (loading) return <div className="text-center py-20 text-2xl font-comic">Đang tải dữ liệu siêu phẩm...</div>;
  if (!product) return <div className="text-center py-20 text-2xl font-comic text-red-500">Không tìm thấy truyện!</div>;

  return (
    <div className="max-w-5xl mx-auto mb-8 flex flex-col px-4 md:px-0">
      <button onClick={() => navigate(-1)} className="fixed left-2 top-24 md:left-8 md:top-32 z-50 flex items-center justify-center bg-white dark:bg-gray-800 border-4 border-black dark:border-white p-2 md:p-3 hover:bg-secondary dark:hover:bg-yellow-600 hover:-translate-x-1 hover:-translate-y-1 shadow-comic dark:shadow-comic-dark transition-all">
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
      </button>

      <div className="bg-white dark:bg-gray-800 border-4 border-black dark:border-white shadow-comic-lg dark:shadow-comic-lg-dark overflow-hidden transition-colors">
        <div className="flex flex-col md:flex-row">
          <div data-aos="fade-right" className="w-full md:w-5/12 bg-secondary dark:bg-yellow-700 border-b-4 md:border-b-0 md:border-r-4 border-black dark:border-white p-4 relative flex items-center justify-center bg-[url('data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'2\' cy=\'2\' r=\'2\' fill=\'%23000000\'/%3E%3C/svg%3E')] dark:bg-[url('data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'2\' cy=\'2\' r=\'2\' fill=\'%23ffffff\' opacity=\'0.2\'/%3E%3C/svg%3E')]">
            <div className="relative z-10 w-full flex justify-center">
              <div className="relative w-full max-w-[320px] md:max-w-[380px]">
                <div className="absolute -top-3 -right-3 z-20">
                  <div className="bg-primary border-4 border-black p-2 rounded-full w-16 h-16 flex items-center justify-center flex-col shadow-comic transform rotate-12">
                    <span className="font-comic text-white text-sm leading-none">HOT</span>
                    <span className="font-black text-secondary text-xs">DEAL!</span>
                  </div>
                </div>

                {product.image ? (
                  <img src={`/img/${product.image}`} alt={product.name} className="w-full h-auto object-contain border-4 border-black dark:border-white shadow-comic dark:shadow-comic-dark animate-float-comic" style={{ imageRendering: '-webkit-optimize-contrast' }} />
                ) : (
                  <div className="w-full h-40 md:h-80 flex flex-col items-center justify-center font-comic text-2xl md:text-3xl text-gray-400">NO IMAGE</div>
                )}
              </div>
            </div>
          </div>

          <div data-aos="fade-left" className="w-full md:w-7/12 p-6 md:p-8 flex flex-col relative bg-white dark:bg-gray-800">
            <h1 className="text-3xl md:text-4xl font-black uppercase text-dark dark:text-white leading-tight mb-4">{product.name}</h1>

            <div className="bg-gray-100 dark:bg-gray-700 border-4 border-black dark:border-white p-3 shadow-comic dark:shadow-comic-dark mb-4 transform rotate-1">
              <h4 className="font-comic text-xl text-primary tracking-wide mb-1">THÔNG TIN SIÊU PHẨM:</h4>
              <p className="font-bold text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{product.description}</p>
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="bg-white dark:bg-gray-700 border-4 border-black dark:border-white px-4 py-2 shadow-comic dark:shadow-comic-dark">
                <div className="font-black text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">TRẠNG THÁI</div>
                <div className={`font-comic text-2xl ${product.stock > 0 ? 'text-accent' : 'text-primary'} tracking-widest`} style={{ WebkitTextStroke: '1px black' }}>
                  {product.stock > 0 ? 'CÒN HÀNG' : 'HẾT HÀNG'} ({product.stock})
                </div>
              </div>

              <div className="bg-white dark:bg-gray-700 border-4 border-black dark:border-white px-4 py-2 shadow-comic dark:shadow-comic-dark">
                <div className="font-black text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">GIÁ BÁN</div>
                <div className="font-comic text-3xl text-primary tracking-widest" style={{ WebkitTextStroke: '1px black' }}>
                  {product.price.toLocaleString()}Đ
                </div>
              </div>
            </div>

            <div className="mt-auto pt-6 flex flex-col sm:flex-row gap-4">
              {product.stock > 0 ? (
                <button onClick={addToCart} className="flex-1 bg-primary border-4 border-black text-white font-comic text-2xl md:text-3xl tracking-widest py-3 md:py-4 rounded shadow-comic-lg hover:shadow-comic-hover hover:translate-y-1 hover:translate-x-1 hover:bg-secondary hover:text-dark transition-all uppercase flex items-center justify-center gap-2" style={{ WebkitTextStroke: '1px black' }}>
                  MÚC NGAY!
                </button>
              ) : (
                <button disabled className="flex-1 bg-gray-400 border-4 border-black text-white font-comic text-2xl md:text-3xl tracking-widest py-3 md:py-4 rounded shadow-comic cursor-not-allowed uppercase flex items-center justify-center gap-2" style={{ WebkitTextStroke: '1px black' }}>
                  HẾT HÀNG RỒI!
                </button>
              )}
              
              <button type="button" onClick={() => setShowReader(true)} className="flex-1 bg-accent border-4 border-black text-white font-comic text-xl md:text-2xl tracking-widest py-3 md:py-4 rounded shadow-comic hover:shadow-comic-hover hover:translate-y-1 hover:translate-x-1 hover:bg-teal-300 hover:text-dark transition-all uppercase flex items-center justify-center gap-2" style={{ WebkitTextStroke: '1px black' }}>
                ĐỌC THỬ
              </button>

              <button type="button" onClick={toggleFavorite} className={`sm:flex-none bg-white dark:bg-gray-700 border-4 border-black dark:border-white ${isFavorite ? 'text-primary dark:text-primary' : 'text-dark dark:text-white'} font-comic text-xl md:text-2xl tracking-widest py-3 px-6 rounded shadow-comic dark:shadow-comic-dark hover:shadow-comic-hover dark:hover:shadow-comic-hover-dark hover:translate-y-1 hover:translate-x-1 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all uppercase flex items-center justify-center gap-2`}>
                <svg className="w-8 h-8" fill={isFavorite ? 'currentColor' : 'none'} stroke="black" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Review Section */}
      <div data-aos="fade-up" className="max-w-5xl mx-auto mt-8 mb-8 pl-14 md:pl-0 w-full">
        <div className="bg-white dark:bg-gray-800 border-4 border-black dark:border-white shadow-comic dark:shadow-comic-dark p-6 md:p-8 transition-colors">
          <h2 className="text-3xl font-comic text-dark dark:text-white uppercase mb-6" style={{ WebkitTextStroke: '1px black' }}>ĐÁNH GIÁ TỪ ĐỘC GIẢ</h2>
          <div className="space-y-6">
            {reviews.map((rv, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-700 border-4 border-black dark:border-white p-4 shadow-comic dark:shadow-comic-dark relative">
                <div className="flex items-center gap-2 mb-2">
                  <div className="font-black text-dark dark:text-white text-lg">{rv.username}</div>
                  <div className="flex text-primary font-black text-lg items-center gap-2">
                    {rv.rating === 5 && <span>🔥 Siêu phẩm</span>}
                    {rv.rating === 4 && <span>😭 Cảm động</span>}
                    {rv.rating < 4 && <span>🤣 Hài hước</span>}
                  </div>
                </div>
                <p className="text-gray-800 dark:text-gray-200 font-medium">{rv.comment}</p>
              </div>
            ))}
            {reviews.length === 0 && <p className="font-bold text-gray-500 text-center italic">Chưa có đánh giá nào. Hãy là người đầu tiên bóc tem!</p>}
          </div>
        </div>
      </div>
      
      {/* Reader Modal */}
      {showReader && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute top-0 w-full p-4 flex justify-between items-center z-50 bg-gradient-to-b from-black/80 to-transparent">
            <h3 className="text-white font-comic text-xl md:text-2xl opacity-80 uppercase tracking-wider">{product.name} - Đọc thử</h3>
            <button onClick={() => setShowReader(false)} className="text-white hover:text-primary transition-colors flex items-center justify-center w-12 h-12 rounded-full bg-black/50 hover:bg-black border-2 border-transparent hover:border-white">
              X
            </button>
          </div>
          <div className="text-white font-comic text-2xl">Page {readerPage}</div>
          <div className="flex gap-4 mt-4">
            <button onClick={() => setReaderPage(Math.max(1, readerPage - 1))} className="bg-white text-black px-4 py-2 font-bold">Prev</button>
            <button onClick={() => setReaderPage(Math.min(3, readerPage + 1))} className="bg-white text-black px-4 py-2 font-bold">Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
