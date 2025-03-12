// src/components/Layout.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from './Button';
import Dropdown from './Dropdown';

// Giả lập user data
const user = {
  fullName: 'John Doe',
  avatar: 'https://via.placeholder.com/40', // URL ảnh đại diện
};

// Menu con cho navigation
const subMenus: { [key: string]: string[] } = {
  overview: [],
  traceability: [
    'products',
    'labelTemplates',
    'printLabels',
    'activate',
    'sell',
    'cancel',
    'lookup',
  ],
  administration: ['entities', 'inviteUsers', 'employees', 'userProfile'],
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t, i18n } = useTranslation();
  const [activeNav, setActiveNav] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Trạng thái sidebar/menu trên mobile
  const [hoveredNav, setHoveredNav] = useState<string | null>(null); // Trạng thái hover trên header

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'vi', label: 'Vietnamese' },
  ];

  const navItems = ['overview', 'traceability', 'administration'];

  // Lấy tất cả menu cấp 2 cho mobile
  const allSubMenus = [
    ...subMenus.traceability,
    ...subMenus.administration,
  ];

  const handleNavClick = (nav: string) => {
    setActiveNav(nav);
    setIsSidebarOpen(false); // Đóng menu trên mobile khi chọn
  };

  const handleLogout = () => {
    // Logic đăng xuất (có thể gọi API hoặc xóa token)
    console.log('Logged out');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex items-center justify-between fixed top-0 w-full z-20 md:flex md:items-center md:justify-between">
        {/* Logo và Hamburger */}
        <div className="flex items-center space-x-4">
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>
          <img
            src="https://via.placeholder.com/40"
            alt="Business Logo"
            className="w-10 h-10 hidden md:block"
          />
        </div>

        {/* Navigation chính (ẩn trên mobile, hiển thị trên desktop) */}
        <nav className="hidden md:flex space-x-4 items-center flex-1 justify-center">
          {navItems.map((nav) => (
            <div
              key={nav}
              className="relative"
              onMouseEnter={() => setHoveredNav(nav)}
              onMouseLeave={() => setHoveredNav(null)}
            >
              <button
                onClick={() => handleNavClick(nav)}
                className={`px-4 py-2 rounded h-full ${
                  activeNav === nav ? 'bg-blue-800' : 'hover:bg-blue-700 cursor-pointer'
                }`}
              >
                {t(`layout.${nav}`)}
              </button>
              {/* Menu con khi hover */}
              {hoveredNav === nav && subMenus[nav].length > 0 && (
                <div className="absolute bg-white text-black rounded shadow-lg py-2 w-48 top-full left-0">
                  {subMenus[nav].map((subItem) => (
                    <button
                      key={subItem}
                      onClick={() => handleNavClick(nav)}
                      className="block px-4 py-2 hover:bg-gray-100 w-full text-left cursor-pointer"
                    >
                      {t(`layout.${subItem}`)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* User info + Logout + Language (ẩn trên mobile, hiển thị trên desktop) */}
        <div className="flex items-center space-x-4 hidden md:flex">
          <img src={user.avatar} alt="User Avatar" className="w-8 h-8 rounded-full" />
          <span>{user.fullName}</span>
          <Button text="logout" onClick={handleLogout} variant="danger" />
          <div className="w-40">
            <Dropdown
              options={languages}
              selected={i18n.language}
              onSelect={(value) => i18n.changeLanguage(value)}
            />
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar/Menu (ẩn hẳn trên mobile khi không mở, hiển thị trên desktop) */}
        <aside
          className={`bg-gray-800 text-white w-64 p-4 fixed top-16 bottom-0 transform transition-transform duration-300 md:static md:translate-x-0 z-10 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          {/* Nội dung menu trên mobile khi mở */}
          {isSidebarOpen && (
            <div className="md:hidden flex flex-col h-full">
              {/* Logo căn giữa */}
              <div className="flex justify-center mb-4">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Business Logo"
                  className="w-10 h-10"
                />
              </div>

              {/* Menu */}
              <nav className="flex flex-col space-y-2 flex-1">
                {/* Tổng quan */}
                <button
                  onClick={() => handleNavClick('overview')}
                  className={`px-4 py-2 rounded bg-gray-800 ${
                    activeNav === 'overview' ? 'bg-blue-800' : 'hover:bg-blue-700 cursor-pointer'
                  }`}
                >
                  {t('layout.overview')}
                </button>

                {/* Tất cả menu cấp 2 */}
                {allSubMenus.map((subItem) => (
                  <button
                    key={subItem}
                    onClick={() => handleNavClick(subItem)}
                    className={`px-4 py-2 rounded bg-gray-800 ${
                      activeNav === subItem ? 'bg-blue-800' : 'hover:bg-blue-700 cursor-pointer'
                    }`}
                  >
                    {t(`layout.${subItem}`)}
                  </button>
                ))}
              </nav>

              {/* Dropdown và Logout cố định ở dưới */}
              <div className="fixed bottom-4 left-4 w-56 space-y-2">
                <div className="w-40">
                  <Dropdown
                    options={languages}
                    selected={i18n.language}
                    onSelect={(value) => i18n.changeLanguage(value)}
                  />
                </div>
                <Button text="logout" onClick={handleLogout} variant="danger" />
              </div>
            </div>
          )}

          {/* Nội dung sidebar trên desktop */}
          {!isSidebarOpen && (
            <div className="hidden md:block">
              <h2 className="text-xl font-bold mb-4">{t('layout.companyName')}</h2>
              <nav>
                {subMenus[activeNav].length > 0 ? (
                  subMenus[activeNav].map((item) => (
                    <button
                      key={item}
                      onClick={() => handleNavClick(activeNav)}
                      className="block px-4 py-2 hover:bg-gray-700 rounded w-full text-left cursor-pointer"
                    >
                      {t(`layout.${item}`)}
                    </button>
                  ))
                ) : (
                  <p className="text-gray-400">{t('layout.overview')}</p>
                )}
              </nav>
            </div>
          )}
        </aside>

        {/* Overlay để đóng menu trên mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-0 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Main */}
        <main className="flex-1 p-4 md:ml-64 bg-gray-100 min-h-screen">{children}</main>
      </div>

      {/* ToastContainer */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Layout;