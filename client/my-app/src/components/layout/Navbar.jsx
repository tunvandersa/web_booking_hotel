import React, { useState, useEffect } from 'react';
import { Layout, Menu, Select, Typography, Divider } from 'antd';
import { 
  HomeOutlined, 
  BankOutlined, 
  TeamOutlined, 
  UserOutlined, 
  KeyOutlined,
  SettingOutlined,
  DashboardOutlined,
  CalendarOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import SVLogo from "../../assets/SV_logo.webp";
import axios from 'axios';
import { useHotel } from '../hook/HotelContext';

const { Sider } = Layout;
const { Option } = Select;
const { Title } = Typography;

const Navbar = () => {
    const items = [
        {
          key: 'dashboard',
          icon: <DashboardOutlined />,
          label: <Link to="/dashboard">Tổng quan</Link>,
        },
        {
          key: 'hotel',
          icon: <BankOutlined />,
          label: 'Quản lý khách sạn',
          children: [
            {
              key: 'hotel-list',
              label: <Link to="/hotels">Danh sách khách sạn</Link>,
            },
            {
              key: 'hotel-add',
              label: <Link to="/hotels/add">Thêm khách sạn</Link>,
            },
          ],
        },
        {
          key: 'room-types',
          icon: <SettingOutlined />,
          label: 'Quản lý hạng phòng',
          children: [
            {
              key: 'room-types-list',
              label: <Link to="/room-types">Danh sách hạng phòng</Link>,
            },
            {
              key: 'room-types-add',
              label: <Link to="/room-types/add">Thêm hạng phòng</Link>,
            },
          ],
        },
        {
          key: 'rooms',
          icon: <KeyOutlined />,
          label: 'Quản lý phòng',
          children: [
            {
              key: 'rooms-list',
              label: <Link to="/rooms">Danh sách phòng</Link>,
            },
            {
              key: 'rooms-add',
              label: <Link to="/rooms/add">Thêm phòng</Link>,
            },
          ],
        },
        {
          key: 'customers',
          icon: <UserOutlined />,
          label: 'Quản lý khách hàng',
          children: [
            {
              key: 'customers-list',
              label: <Link to="/customers">Danh sách khách hàng</Link>,
            },
            {
              key: 'customers-add',
              label: <Link to="/customers/add">Thêm khách hàng</Link>,
            },
          ],
        },
        {
          key: 'bookings',
          icon: <CalendarOutlined />,
          label: <Link to="/bookings">Quản lý đặt phòng</Link>,
        },
        {
          key: 'amenities-room-types',
          icon: <SettingOutlined />,
          label: <Link to="/amenities-room-types">Quản lý tiện ích phòng</Link>,
          children: [
            {
              key: 'amenities-room-types-list',
              label: <Link to="/amenities-room-types">Danh sách tiện ích phòng</Link>,
            },
            {
              key: 'amenities-room-types-add',
              label: <Link to="/amenities-room-types/add">Thêm tiện ích phòng</Link>,
            },
          ],
        },
        {
          key: 'amenities-hotel',
          icon: <SettingOutlined />,
          label: <Link to="/amenities-hotel">Quản lý tiện ích khách sạn</Link>,
          children: [
            {
              key: 'amenities-hotel-list',
              label: <Link to="/amenities-hotel">DS tiện ích khách sạn</Link>,
            },
            {
              key: 'amenities-hotel-add',
              label: <Link to="/amenities-hotel/add">Thêm tiện ích khách sạn</Link>,
            },
          ],
        },
        {
          type: 'divider',
        },
        {
          key: 'logout',
          icon: <LogoutOutlined />,
          label: <Link to="/logout" className="text-red-500">Đăng xuất</Link>,
        },
      ];

  const [collapsed, setCollapsed] = useState(false);
  const [hotels, setHotels] = useState([]);
  const { selectedHotel, setSelectedHotel } = useHotel();

  useEffect(() => {
    const fetchHotels = async () => {
      const response = await axios.get('http://localhost:3000/api/v1/hotel/list');
      setHotels(response.data.hotel);
      if (!selectedHotel && response.data.hotel.length > 0) {
        setSelectedHotel(response.data.hotel[0].id);
      }
      console.log(selectedHotel);
    };
    fetchHotels();
  }, []);

  const handleHotelChange = (value) => {
    setSelectedHotel(value);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      className="min-h-screen bg-white shadow-md"
      width={250}
    >
      <div className="p-4">
        <div className="flex items-center justify-center mb-4">
          <img 
            src={SVLogo} 
            alt="Logo" 
            className="h-10 w-10 mr-2" 
          />
          {!collapsed && (
            <Title level={4} className="m-0 text-blue-800">
              Hotel Admin
            </Title>
          )}
        </div>
        
        {!collapsed && (
          <div className="mb-4">
            <Select
              placeholder="Chọn khách sạn"
              onChange={handleHotelChange}
              value={selectedHotel}
              className="w-full"
              popupMatchSelectWidth={false}
            >
              {hotels.map(hotel => (
                <Option key={hotel.id} value={hotel.id}>
                  {hotel.name}
                </Option>
              ))}
            </Select>
          </div>
        )}
      </div>

      <Divider className="my-0" />

     <Menu
  theme="light"
  defaultSelectedKeys={['dashboard']}
  mode="inline"
  className="border-r-0"
  items={items}
/> 


    </Sider>
  );
};

export default Navbar;
