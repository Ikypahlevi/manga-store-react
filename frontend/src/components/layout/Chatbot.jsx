import React, { useState, useEffect, useRef } from 'react';

const mascotSkins = {
  'luffy': { name: 'Monkey D. Luffy', img: 'onepiece.png', dialogues: ["Đói bụng quá! Có cuốn nào hay cho ăn... à nhầm, cho đọc không?", "Ta sẽ trở thành Vua Truyện Tranh!"] },
  'doraemon': { name: 'Doraemon', img: 'doraemon.png', dialogues: ["Bảo bối của tớ là... Nạp Xu Siêu Tốc!", "Trời ơi, lại nợ tiền bánh rán rồi..."] },
  'jinwoo': { name: 'Sung Jin-Woo', img: 'sololeveling.png', dialogues: ["ARISE! Hãy trỗi dậy và chốt đơn đi!", "Tôi không bao giờ bỏ cuộc... kể cả khi hết xu."] },
  'slime': { name: 'Rimuru Tempest', img: 'slime.png', dialogues: ["Ta không phải slime xấu đâu nha!", "Chà, dạo này quốc gia Jura của ta cũng đọc bộ này đấy."] },
  'tanjiro': { name: 'Kamado Tanjiro', img: 'kimetsunoyaiba.png', dialogues: ["Hơi thở của Wibu... Thức thứ nhất: Chốt Đơn!", "Nezuko cũng thích đọc bộ này lắm đó."] },
  'inosuke': { name: 'Hashibira Inosuke', img: 'kimetsunoyaiba.png', dialogues: ["ĐẤU VỚI TA ĐI! Tên khốn nào không nạp xu hả?!", "Trư Đột Mãnh Tiến!!! Truyện nào hay nhào hết vô đây!"] },
  'gojo': { name: 'Gojo Satoru', img: 'jujutsukaisen.png', dialogues: ["Yowai mo... Vì bạn quá yếu nên mới hết xu đúng không?", "Đừng lo, thầy mạnh nhất mà."] }
};

const Chatbot = () => {
  const [currentSkin, setCurrentSkin] = useState(localStorage.getItem('mascotSkin') || 'doraemon');
  const [showSkinModal, setShowSkinModal] = useState(false);
  const [dialogue, setDialogue] = useState("Xin chào! Tớ là trợ lý của sếp đây.");
  const [showBubble, setShowBubble] = useState(false);
  const widgetRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('mascotSkin', currentSkin);
  }, [currentSkin]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.3) {
        showRandomDialogue();
      }
    }, 20000);
    return () => clearInterval(interval);
  }, [currentSkin]);

  const showRandomDialogue = () => {
    const skin = mascotSkins[currentSkin];
    if (skin) {
      const randomMsg = skin.dialogues[Math.floor(Math.random() * skin.dialogues.length)];
      setDialogue(randomMsg);
      setShowBubble(true);
      setTimeout(() => setShowBubble(false), 5000);
    }
  };

  const handlePoke = () => {
    showRandomDialogue();
    // Simulate bounce
  };

  return (
    <>
      <div ref={widgetRef} className="fixed z-[99999] flex flex-col items-center" style={{ left: '20px', bottom: '20px', cursor: 'grab' }}>
        <div className={`bg-white border-4 border-black p-4 mb-2 shadow-[4px_4px_0_0_#000] relative max-w-xs transform transition-all duration-300 origin-bottom cursor-default ${showBubble ? 'scale-100' : 'scale-0'}`}>
          <div className="font-bold text-sm text-dark text-center">{dialogue}</div>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-t-[14px] border-t-black border-r-[10px] border-r-transparent"></div>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-t-[8px] border-t-white border-r-[6px] border-r-transparent"></div>
          
          <button onClick={() => setShowSkinModal(true)} className="mt-2 w-full text-xs font-black text-primary hover:text-accent uppercase underline text-center">Đổi Waifu/Husbando</button>
        </div>

        <div className="relative cursor-pointer" onClick={handlePoke}>
          <img src={`/img/${mascotSkins[currentSkin]?.img || 'doraemon.png'}`} 
               alt="mascot"
               className="w-32 h-32 object-contain filter drop-shadow-[4px_4px_0_rgba(0,0,0,1)] hover:drop-shadow-[6px_6px_0_rgba(0,0,0,1)] transition-all" />
        </div>
      </div>

      {showSkinModal && (
        <div className="fixed inset-0 z-[9999] bg-black/80 flex flex-col items-center justify-center p-4">
          <div className="bg-white border-[8px] border-black p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-[16px_16px_0_0_#F00] transform rotate-1">
            <div className="flex justify-between items-center mb-6 border-b-4 border-black pb-2">
              <h2 className="font-comic text-4xl uppercase" style={{ WebkitTextStroke: '1px black' }}>Kho Skin Waifu & Husbando</h2>
              <button onClick={() => setShowSkinModal(false)} className="font-black text-2xl hover:text-red-600">X</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Object.keys(mascotSkins).map(key => (
                <div key={key} onClick={() => { setCurrentSkin(key); setShowSkinModal(false); showRandomDialogue(); }} className={`border-4 border-black p-4 flex flex-col items-center justify-center cursor-pointer transition-transform hover:-translate-y-1 min-h-[80px] ${currentSkin === key ? 'bg-yellow-300 shadow-[8px_8px_0_0_#000]' : 'bg-gray-100 shadow-[4px_4px_0_0_#000]'}`}>
                  <span className={`font-black text-center text-sm md:text-base uppercase break-words ${currentSkin === key ? 'text-red-600' : 'text-black'}`}>{mascotSkins[key].name}</span>
                  {currentSkin === key && <span className="bg-black text-white text-xs px-2 mt-2">Đang Dùng</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
