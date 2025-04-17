import React, { useState, useEffect } from 'react';
import { Table, Space, Button, Popconfirm, Typography, Input, Image, message } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Title } = Typography;

const AmenitiesRoomTypesList = () => {
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const fetchAmenities = async () => {
    const response = await axios.get('http://localhost:3000/api/v1/room/getroomamenities', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(response.data.roomAmenities);
    setAmenities(response.data.roomAmenities);
}

  useEffect( () => {  
    fetchAmenities();
  }, []);

  const handleDelete = async (id) => {
    try {
    console.log(id);
      // Thay đổi URL API tùy theo backend của bạn
      const response = await axios.delete(`http://localhost:3000/api/v1/room/deleteamenities/${id}`, {
        headers: {
           
            'Content-Type': 'application/json'
        },
        withCredentials: true,
      });
      console.log(response);

      fetchAmenities();
    } catch (error) {
        if (error.response?.status === 401) {
            alert('Vui lòng đăng nhập lại để tiếp tục!');
            navigate('/login');
          } else {
            console.error('Lỗi khi xóa tiện nghi phòng:', error);
            message.error(error.response?.data?.message || 'Xảy ra lỗi khi xóa tiện nghi!');
          }
    }
  };

  const handleEdit = async (record) => {
        await navigate(`/amenities-room-types/edit/${record.id}`);
        console.log('Chỉnh sửa tiện nghi phòng:', record);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredAmenities = amenities.filter(amenity => 
    amenity.name?.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
        title: 'STT',
        dataIndex: 'index',
        key: 'index',
        width: 70,
        render: (_, record, index) => index + 1,
    },
    {
      title: 'Tên tiện nghi',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },

    {
        title: 'Ảnh',
        dataIndex: 'image',
        key: 'image',
        width: 100,
        render: (image) => (
            image ? (
                <Image
                    src={`http://localhost:3000/uploads/${image}`}
                    width={100}
                    height={100}
                    alt="Ảnh tiện nghi"
                />
            ) : (
                'Không có ảnh'
            )
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
        <Title level={2} className="text-blue-800 m-0">Quản lý tiện nghi phòng</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          className="bg-blue-500 hover:bg-blue-700"
          onClick={() => navigate('/amenities-room-types/add')}
        >
          Thêm tiện nghi phòng
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
        dataSource={filteredAmenities}
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

export default AmenitiesRoomTypesList;
