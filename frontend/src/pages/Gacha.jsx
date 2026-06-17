import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Gacha = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [isSpinning, setIsSpinning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [resultTitle, setResultTitle] = useState('');
  const [resultMsg, setResultMsg] = useState('');
  const [flashImage, setFlashImage] = useState('https://api.dicebear.com/7.x/bottts/svg?seed=gacha&backgroundColor=ffb703');
  const [flashName, setFlashName] = useState('SẴN SÀNG!');

  const handleSpin = async () => {
    if (isSpinning) return;
    
    if (!user) {
        alert('Vui lòng đăng nhập để chơi Gacha!');
        navigate('/login');
        return;
    }
    
    if (user.mangaCoin < 100) {
        alert('Không đủ Manga Coin! Hãy nạp thêm.');
        return;
    }

    setIsSpinning(true);

    try {
        const res = await axios.post('http://localhost:5000/api/users/gacha/spin');
        const { reward, newCoins } = res.data;

        const rewardsMock = [
          { name: 'Khóa móc khóa Naruto', image: 'naruto.jpg' },
          { name: '1000 Manga Coin', image: 'coin.jpg' },
          { name: 'Chúc bạn may mắn lần sau', image: 'miss.jpg' }
        ];

        let currentFlashIndex = 0;
        let currentDelay = 30;
        const maxDelay = 400;
        const duration = 3500;
        const startTime = Date.now();

        const flashNext = () => {
          const elapsed = Date.now() - startTime;
          if (elapsed >= duration) {
            setFlashImage(reward.image);
            setFlashName(reward.name);

            setTimeout(() => {
              if (reward.coinValue === 0 && reward.name.includes('may mắn')) {
                setResultTitle('ĐEN THÔI!');
              } else {
                setResultTitle('CHÚC MỪNG!');
              }
              setResultMsg(`Bạn nhận được ${reward.name}`);
              setUser({ ...user, mangaCoin: newCoins });
              setShowResult(true);
              setIsSpinning(false);
            }, 500);
            return;
          }

          currentFlashIndex = (currentFlashIndex + 1) % rewardsMock.length;
          setFlashImage(rewardsMock[currentFlashIndex].image);
          setFlashName(rewardsMock[currentFlashIndex].name);

          const progress = elapsed / duration;
          const easeOut = 1 - Math.pow(1 - progress, 3);
          currentDelay = 30 + easeOut * (maxDelay - 30);

          setTimeout(flashNext, currentDelay);
        };

        flashNext();
    } catch (err) {
        console.error(err);
        alert(err.response?.data?.error || 'Có lỗi xảy ra!');
        setIsSpinning(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 mb-20 px-4">
      <div data-aos="fade-down" className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-comic text-white uppercase tracking-widest transform -rotate-2 inline-block bg-dark px-8 py-8 border-4 border-black shadow-[8px_8px_0_0_#06D6A0] animate-pulse-shadow">
          CỖ MÁY GACHA
        </h1>
        <div className="mt-8">
          <span className="font-black text-xl text-dark uppercase tracking-wider bg-yellow-400 inline-block px-6 py-2 border-4 border-black shadow-[4px_4px_0_0_#000] transform rotate-1 animate-wobble-neo">
            Test nhân phẩm - Săn siêu phẩm!
          </span>
        </div>
      </div>

      <div data-aos="zoom-in" data-aos-delay="200" className="bg-white dark:bg-gray-800 border-[8px] border-black p-6 md:p-12 shadow-[16px_16px_0_0_#000] relative flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'2\' cy=\'2\' r=\'2\' fill=\'%23000000\'/%3E%3C/svg%3E')] pointer-events-none"></div>
        
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center relative z-10 min-h-[350px]">
          <div className={`absolute inset-0 bg-yellow-400 rounded-full blur-[80px] transition-opacity duration-300 pointer-events-none z-0 ${isSpinning ? 'opacity-100' : 'opacity-0'}`}></div>
          
          <div className="relative z-10 w-full max-w-sm mx-auto min-h-[320px] bg-white border-8 border-black shadow-[16px_16px_0_0_#000] flex justify-center items-center p-4 transition-all duration-300">
            <div className="w-full h-full flex flex-col items-center justify-center">
              <img src={flashImage.startsWith('http') ? flashImage : `/img/${flashImage}`} className={`h-32 object-contain mb-4 drop-shadow-[4px_4px_0_rgba(0,0,0,1)] border-2 border-black bg-white ${isSpinning && flashImage.includes('dicebear') ? 'animate-bounce' : ''}`} alt="gacha item" />
              <div className="font-black text-xl md:text-2xl text-center uppercase w-full px-2 text-primary drop-shadow-[2px_2px_0_#000] text-white">{flashName}</div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col items-center bg-gray-100 dark:bg-gray-700 border-4 border-black p-8 transform rotate-1 relative z-10 shadow-[8px_8px_0_0_#000]">
          <div className="w-full flex justify-between items-center bg-dark text-white font-black text-2xl px-6 py-4 border-4 border-black mb-8 shadow-[6px_6px_0_0_#FF9F1C] transform -rotate-1">
            <span>GIÁ QUAY:</span>
            <span className="text-yellow-400 text-3xl">100 XU</span>
          </div>

          <div className="flex items-center gap-4 mb-10 bg-white dark:bg-gray-800 border-4 border-black px-6 py-3 w-full justify-center shadow-[4px_4px_0_0_#000]">
            <span className="font-black text-xl uppercase text-dark dark:text-gray-200">Ví của bạn:</span>
            <span className="font-comic text-4xl text-accent drop-shadow-[2px_2px_0_#000] text-white">
              {user.mangaCoin}
            </span>
          </div>

          <button onClick={handleSpin} disabled={isSpinning} className={`w-full bg-primary border-4 border-black text-white font-black text-4xl py-6 uppercase shadow-[8px_8px_0_0_#000] transition-all focus:outline-none ${isSpinning ? 'opacity-50 cursor-not-allowed' : 'hover:translate-y-2 hover:translate-x-2 hover:shadow-none active:bg-red-700'}`}>
            QUAY NGAY!
          </button>
        </div>
      </div>

      {showResult && (
        <div className="fixed inset-0 z-[9999] bg-black/90 flex flex-col items-center justify-center p-4">
          <div className="bg-white border-[12px] border-black p-8 md:p-12 max-w-2xl w-full flex flex-col items-center shadow-[20px_20px_0_0_#FF9F1C]">
            <h2 className="font-comic text-5xl md:text-7xl uppercase mb-8 text-center" style={{ WebkitTextStroke: `2px ${resultTitle === 'ĐEN THÔI!' ? '#e63946' : '#06D6A0'}`, color: 'white', textShadow: `6px 6px 0 ${resultTitle === 'ĐEN THÔI!' ? '#e63946' : '#06D6A0'}` }}>
              {resultTitle}
            </h2>
            
            <div className="text-xl md:text-2xl font-black text-center mb-12 bg-yellow-300 border-4 border-black px-6 md:px-8 py-6 transform -rotate-2 w-full break-words shadow-[6px_6px_0_0_#000] text-dark">
              {resultMsg}
            </div>
            
            <button onClick={() => setShowResult(false)} className="bg-dark text-white border-4 border-black hover:bg-accent hover:text-dark font-black text-3xl px-12 py-4 uppercase transition-colors shadow-[8px_8px_0_0_#000] hover:translate-y-1 hover:translate-x-1 hover:shadow-[4px_4px_0_0_#000] w-full">
              QUẤT TIẾP!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gacha;
