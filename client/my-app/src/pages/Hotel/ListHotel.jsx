import React, { useState, useEffect } from 'react';
import { Table, Space, Button, Popconfirm, Typography, Input } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Title } = Typography;

const ListHotel = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const fetchHotels = async () => {
    const response = await axios.get('http://localhost:3000/api/v1/hotel/list');
    setHotels(response.data.hotel);
    console.log(response.data.hotel);
  }

  useEffect(() => {
    setLoading(true); 
    setTimeout(() => {
      fetchHotels();
      setLoading(false);
    }, 1000);
  }, []);

  const handleDelete = async (id) => {
    try {
      // Thay đổi URL API tùy theo backend của bạn
      await axios.delete(`http://localhost:3000/api/v1/hotel/delete/${id}`);
      fetchHotels();
    } catch (error) {
      console.error('Lỗi khi xóa khách sạn:', error);
    }
  };

  const handleEdit = (record) => {
    navigate(`/hotels/edit/${record.id}`);
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
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      width: 70,
      render: (text, record, index) => index + 1,
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
      title: 'Thành phố',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Số sao',
      dataIndex: 'starRating',
      key: 'starRating',
      width: 100,
      render: (starRating) => '⭐'.repeat(starRating),
      sorter: (a, b) => a.starRating - b.starRating,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive) => (
        <span className={`px-2 py-1 rounded-full text-xs ${isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {isActive ? 'Hoạt động' : 'Ngừng hoạt động'}
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
          onClick={() => navigate('/hotels/add')}
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
          pageSize: 5,
          showSizeChanger: true,
          showTotal: (total) => `Tổng cộng ${total} khách sạn`,
        }}
        className="bg-white rounded-lg shadow"
      />
    </div>
  );
};

export default ListHotel;
