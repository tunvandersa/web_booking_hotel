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
          key: 'staff',
          icon: <TeamOutlined />,
          label: <Link to="/staff">Quản lý nhân viên</Link>,
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
  const [selectedHotel, setSelectedHotel] = useState(null);

  useEffect(() => {
    // Giả lập dữ liệu khách sạn - thay thế bằng API call thực tế
    const mockHotels = [
      { id: 1, name: 'Khách sạn Hà Nội' },
      { id: 2, name: 'Khách sạn Đà Nẵng' },
      { id: 3, name: 'Khách sạn Hồ Chí Minh' },
      { id: 4, name: 'Khách sạn Nha Trang' },
    ];
    setHotels(mockHotels);
    setSelectedHotel(mockHotels[0]?.id);
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
