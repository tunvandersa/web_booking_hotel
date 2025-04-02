  // components/layout/Header.jsx
  import SVLogo from "../../assets/SV_logo.webp";
  import { useAuth } from "../hook/AuthContext";
  const Header = () => {
    const { user, logout } = useAuth();
    console.log("user", user);
    return (
      <header className="bg-white py-4 px-6 shadow-md ">
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
            {user ? (
               <div>
               <p>Xin chào, {user.firstName} {user.lastName}!</p>
               <p>Email: {user.email}</p>
               <button onClick={logout}>Đăng xuất</button>
           </div>
            ) : (
              <button className="text-gray-700 hover:text-gray-900">Đăng nhập</button>
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
