import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username.trim() || username.length < 3) {
      setError('Tên đăng nhập phải từ 3 ký tự trở lên!');
      return;
    }
    if (!password || password.length < 3) {
      setError('Mật khẩu phải từ 3 ký tự trở lên!');
      return;
    }
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      
      login(response.data.token, response.data.user);
      
      navigate('/customer');
    } catch (err) {
      setError(err.response?.data?.error || 'Tên đăng nhập hoặc mật khẩu không đúng!');
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 w-full min-h-screen bg-halftone">
      <div className="bg-white dark:bg-gray-800 border-4 border-black dark:border-white p-8 shadow-comic-lg dark:shadow-comic-lg-dark w-full max-w-md transform rotate-1 transition-colors">
        
        <div className="text-center mb-8 border-b-4 border-black dark:border-white pb-4 transform -rotate-1">
          <h2 className="text-4xl font-comic text-dark dark:text-white tracking-widest uppercase" style={{ WebkitTextStroke: '1px black', textShadow: '2px 2px 0 #FFD166' }}>
            ĐĂNG NHẬP
          </h2>
          <p className="font-black text-xs text-gray-500 dark:text-gray-400 mt-1 uppercase">Cổng vào kho truyện tranh siêu cấp</p>
        </div>
        
        {error && <div className="bg-red-500 text-white p-3 mb-4 font-bold border-2 border-black">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-6" noValidate>
          <div>
            <label className="block text-sm font-black text-dark dark:text-white uppercase mb-2">Tên đăng nhập</label>
            <input type="text" required minLength="3"
                className={`w-full px-4 py-3 border-4 ${error.includes('Tên') ? 'border-primary' : 'border-black dark:border-white'} font-bold text-dark dark:text-white rounded bg-white dark:bg-gray-700 shadow-comic dark:shadow-comic-dark hover:shadow-comic-hover dark:hover:shadow-comic-hover-dark focus:translate-y-0.5 focus:translate-x-0.5 outline-none transition-all placeholder:text-gray-400`}
                placeholder="Nhập tên đăng nhập (>= 3 ký tự)"
                value={username}
                onChange={(e) => setUsername(e.target.value)} />
          </div>
          
          <div>
            <label className="block text-sm font-black text-dark dark:text-white uppercase mb-2">Mật khẩu</label>
            <input type="password" required minLength="3"
                className={`w-full px-4 py-3 border-4 ${error.includes('Mật khẩu') ? 'border-primary' : 'border-black dark:border-white'} font-bold text-dark dark:text-white rounded bg-white dark:bg-gray-700 shadow-comic dark:shadow-comic-dark hover:shadow-comic-hover dark:hover:shadow-comic-hover-dark focus:translate-y-0.5 focus:translate-x-0.5 outline-none transition-all placeholder:text-gray-400`}
                placeholder="Nhập mật khẩu (>= 3 ký tự)"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
          </div>
          
          <button type="submit" className="w-full bg-primary dark:bg-red-800 border-4 border-black dark:border-white text-white font-comic text-2xl tracking-widest py-3 rounded shadow-comic-lg dark:shadow-comic-lg-dark hover:shadow-comic-hover dark:hover:shadow-comic-hover-dark hover:translate-y-1 hover:translate-x-1 hover:bg-secondary dark:hover:bg-yellow-600 hover:text-dark transition-all uppercase flex items-center justify-center gap-2" style={{ WebkitTextStroke: '0.5px black' }}>
            ĐĂNG NHẬP NGAY!
          </button>
          
          <div className="text-center pt-4 border-t-2 border-dashed border-black dark:border-white">
            <span className="font-black text-sm text-gray-500 dark:text-gray-400 uppercase">Chưa có tài khoản?</span>
            <Link to="/auth/register" className="inline-block ml-1 font-black text-sm text-primary dark:text-red-400 uppercase hover:underline decoration-2">
              ĐĂNG KÝ NGAY!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
