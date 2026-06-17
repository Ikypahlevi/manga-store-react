import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Chatbot from './Chatbot';

const MainLayout = () => {
  return (
    <>
      <Header />
      <div className="flex flex-grow w-full max-w-screen-2xl mx-auto px-4 md:px-8 gap-8 relative mt-8 mb-8 items-start">
        <Sidebar />
        <main className="flex-grow min-w-0">
          <Outlet />
        </main>
      </div>
      <Chatbot />
      <Footer />
    </>
  );
};

export default MainLayout;
