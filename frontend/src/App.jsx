import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Detail from './pages/Detail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import Gacha from './pages/Gacha';
import Header from './components/layout/Header';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminAddProduct from './pages/admin/AdminAddProduct';
import AdminEditProduct from './pages/admin/AdminEditProduct';
import AdminOrders from './pages/admin/AdminOrders';
import AdminReviews from './pages/admin/AdminReviews';
import AdminVip from './pages/admin/AdminVip';


// Placeholder components
const Placeholder = ({ name }) => <div className="p-8 text-center"><h1 className="text-3xl font-comic">{name}</h1></div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/customer" replace />} />
        
        {/* Auth Routes */}
        <Route path="/auth/login" element={<><Header /><Login /></>} />
        <Route path="/auth/register" element={<><Header /><Register /></>} />

        {/* Customer Routes with Layout */}
        <Route path="/customer" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="profile" element={<Profile />} />
          <Route path="gacha" element={<Gacha />} />
        </Route>

        {/* Admin Routes with Layout */}
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/add" element={<AdminAddProduct />} />
          <Route path="products/edit/:id" element={<AdminEditProduct />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="vip" element={<AdminVip />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
