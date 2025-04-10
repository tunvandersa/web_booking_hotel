  // components/layout/Header.jsx
  import SVLogo from "../../assets/SV_logo.webp";
  import { useAuth } from "../hook/AuthContext";
  import { Link } from "react-router-dom";
  import { useState } from "react";
  import { UserOutlined, HistoryOutlined, LogoutOutlined } from '@ant-design/icons';

  const Header = () => {
    const { user, logout } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
      logout();
      setShowDropdown(false);
    };

    console.log("Current user:", user);

    return (
      <header className="bg-white py-4 px-6 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-gray-700">1900 1833</span>
            <div className="flex gap-2">
              <a href="#" className="text-gray-600 hover:text-gray-800">FB</a>
              <a href="#" className="text-gray-600 hover:text-gray-800">IG</a>
              <a href="#" className="text-gray-600 hover:text-gray-800">YT</a>
            </div>
          </div>

          <div className="flex justify-center">
            <img src={SVLogo} className="h-12" />
          </div>

          <div className="flex items-center gap-4">
            {user && user.email ? (
              <div className="relative">
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
                >
                  <UserOutlined className="text-xl" />
                  <span>{user.firstName} {user.lastName}</span>
                </button>
                
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link 
                      to="/profile" 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      <UserOutlined className="mr-2" />
                      Thông tin cá nhân
                    </Link>
                    <Link 
                      to="/booking-history" 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      <HistoryOutlined className="mr-2" />
                      Lịch sử đặt phòng
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogoutOutlined className="mr-2" />
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                to="/login" 
                className="text-gray-700 hover:text-gray-900"
              >
                Đăng nhập
              </Link>
            )}
            <div className="flex items-center gap-2">
              <span>VN</span>
            </div>
          </div>
        </div>
      </header>
    );
  };
  export default Header;
