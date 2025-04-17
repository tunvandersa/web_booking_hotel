import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'

const AdminLayout = () => {
  return (  
    <div className='flex '>
    <Navbar />
      <div className="p-4 flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
