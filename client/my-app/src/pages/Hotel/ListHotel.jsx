import React, { useState, useEffect } from 'react';
import { Table, Space, Button, Popconfirm, Typography, Input } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title } = Typography;

const ListHotel = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setLoading(true);   
    // Dữ liệu tĩnh cho danh sách khách sạn
    const mockHotels = [
      {
        id: 1,
        name: 'Khách sạn Hà Nội',
        address: '1 Tràng Tiền, Hoàn Kiếm, Hà Nội',
        stars: 5,
        minPrice: 1500000,
        status: true,
        description: 'Khách sạn 5 sao sang trọng tại trung tâm Hà Nội',
        amenities: ['Hồ bơi', 'Spa', 'Nhà hàng', 'Phòng gym'],
        images: ['/images/hotel1.jpg', '/images/hotel2.jpg']
      },
      {
        id: 2,
        name: 'Khách sạn Đà Nẵng',
        address: '123 Bạch Đằng, Hải Châu, Đà Nẵng',
        stars: 4,
        minPrice: 1200000,
        status: false,
        description: 'Khách sạn 4 sao với view biển tuyệt đẹp',
        amenities: ['Hồ bơi', 'Nhà hàng', 'Phòng gym'],
        images: ['/images/hotel3.jpg', '/images/hotel4.jpg']
      },
      {
        id: 3,
        name: 'Khách sạn Hồ Chí Minh',
        address: '45 Nguyễn Huệ, Quận 1, TP.HCM',
        stars: 5,
        minPrice: 1800000,
        status: true,
        description: 'Khách sạn 5 sao đẳng cấp quốc tế',
        amenities: ['Hồ bơi', 'Spa', 'Nhà hàng', 'Phòng gym', 'Quầy bar'],
        images: ['/images/hotel5.jpg', '/images/hotel6.jpg']
      },
      {
        id: 4,
        name: 'Khách sạn Nha Trang',
        address: '78 Trần Phú, Nha Trang, Khánh Hòa',
        stars: 4,
        minPrice: 1000000,
        status: true,
        description: 'Khách sạn 4 sao ven biển Nha Trang',
        amenities: ['Hồ bơi', 'Spa', 'Nhà hàng'],
        images: ['/images/hotel7.jpg', '/images/hotel8.jpg']
      },
      {
        id: 5,
        name: 'Khách sạn Phú Quốc',
        address: '12 Trần Hưng Đạo, Phú Quốc, Kiên Giang',
        stars: 5,
        minPrice: 2000000,
        status: true,
        description: 'Khu nghỉ dưỡng 5 sao đẳng cấp quốc tế',
        amenities: ['Hồ bơi', 'Spa', 'Nhà hàng', 'Phòng gym', 'Quầy bar', 'Sân golf'],
        images: ['/images/hotel9.jpg', '/images/hotel10.jpg']
      }
    ];
    setTimeout(() => {
      setHotels(mockHotels);
      setLoading(false);
    }, 1000);
  }, []);

  const handleDelete = async (id) => {
    try {
      // Thay đổi URL API tùy theo backend của bạn
      await axios.delete(`http://localhost:8080/api/hotels/${id}`);
      setHotels(hotels.filter(hotel => hotel.id !== id));
    } catch (error) {
      console.error('Lỗi khi xóa khách sạn:', error);
    }
  };

  const handleEdit = (record) => {
    // Xử lý chỉnh sửa khách sạn
    console.log('Chỉnh sửa khách sạn:', record);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredHotels = hotels.filter(hotel => 
    hotel.name?.toLowerCase().includes(searchText.toLowerCase()) ||
    hotel.address?.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 70,
    },
    {
      title: 'Tên khách sạn',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Số sao',
      dataIndex: 'stars',
      key: 'stars',
      width: 100,
      render: (stars) => '⭐'.repeat(stars),
      sorter: (a, b) => a.stars - b.stars,
    },
    {
      title: 'Giá từ',
      dataIndex: 'minPrice',
      key: 'minPrice',
      render: (price) => `${price?.toLocaleString('vi-VN')} VND`,
      sorter: (a, b) => a.minPrice - b.minPrice,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span className={`px-2 py-1 rounded-full text-xs ${status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {status ? 'Hoạt động' : 'Ngừng hoạt động'}
        </span>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            size="small" 
            className="bg-blue-500 hover:bg-blue-700"
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa khách sạn này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button 
              type="primary" 
              danger 
              icon={<DeleteOutlined />} 
              size="small"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="text-blue-800 m-0">Quản lý khách sạn</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          className="bg-blue-500 hover:bg-blue-700"
        >
          Thêm khách sạn
        </Button>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Tìm kiếm theo tên hoặc địa chỉ"
          prefix={<SearchOutlined className="text-gray-400" />}
          onChange={handleSearch}
          className="w-72"
        />
      </div>

      <Table
        columns={columns}
        dataSource={filteredHotels}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Tổng cộng ${total} khách sạn`,
        }}
        className="bg-white rounded-lg shadow"
      />
    </div>
  );
};

export default ListHotel;
