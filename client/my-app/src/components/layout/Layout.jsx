import Header from './Header';
import Footer from './Footer';
import { AuthProvider } from '../hook/AuthContext';
import { Outlet } from 'react-router-dom';
const Layout = () => {
  return (
      <div className=" flex flex-col min-h-screen">
      <Header />
      <main className=" flex-1 bg-gray-100">
      <Outlet />
      </main>
      <Footer />
      </div>
  );
};
export default Layout;