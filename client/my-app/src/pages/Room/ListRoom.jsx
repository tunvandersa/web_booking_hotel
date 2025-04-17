import React, { useState, useEffect } from 'react';
import { Table, Space, Button, Popconfirm, Typography, Input, Image, message } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useHotel } from '../../components/hook/HotelContext';
import axios from 'axios';

const { Title } = Typography;

const ListRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const { selectedHotel, setSelectedHotel } = useHotel();

  const fetchRooms = async () => {
    const response = await axios.get(`http://localhost:3000/api/v1/room/getroombyhotelid/${selectedHotel}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(selectedHotel);
    setRooms(response.data.rooms);
    console.log(response.data.rooms);
}

  useEffect( () => {  
    fetchRooms();
  }, [selectedHotel]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/v1/room/delete/${id}`, {
        headers: {
           
            'Content-Type': 'application/json'
        },
        withCredentials: true,
      });
      console.log(response);

      fetchRooms();
    } catch (error) {
        if (error.response?.status === 401) {
            alert('Vui lòng đăng nhập lại để tiếp tục!');
            navigate('/login');
          } else {
            console.error('Lỗi khi xóa tiện nghi phòng:', error);
            message.error( 'Xảy ra lỗi khi xóa tiện nghi!');
          }
    }
  };

  const handleEdit = async (record) => {
        await navigate(`/rooms/edit/${record.id}`);
        console.log('Chỉnh sửa tiện nghi phòng:', record);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredRooms = rooms.filter(room =>
    room.roomNumber?.toLowerCase().includes(searchText.toLowerCase())
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
      title: 'Số phòng',
      dataIndex: 'roomNumber',
      key: 'roomNumber',
      sorter: (a, b) => a.roomNumber.localeCompare(b.roomNumber),
    },
    {
        title: 'Tầng',
        dataIndex: 'floor',
        key: 'floor',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => record.status,
    },
    {
        title: 'Giá',
        render: (text, record) => record.roomType?.basePrice,
        key: 'price',
        sorter: (a, b) => a.roomType?.basePrice - b.roomType?.basePrice,
    },
    {
      title: 'Loại phòng',
      render: (text, record) => record.roomType?.name || null,
      key: 'roomType',
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
        <Title level={2} className="text-blue-800 m-0">Quản lý  phòng</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          className="bg-blue-500 hover:bg-blue-700"
          onClick={() => navigate('/rooms/add')}
        >
          Thêm phòng
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
        dataSource={filteredRooms}
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

export default ListRoom;
