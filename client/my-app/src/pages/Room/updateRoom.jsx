import React, { useState, useEffect  } from 'react';
import { Form, Input, InputNumber, Select, Button, Upload, Typography, Switch, message, Card, Divider } from 'antd';
import { PlusOutlined, UploadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useHotel } from '../../components/hook/HotelContext';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const UpdateRoom = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { selectedHotel } = useHotel();
  const navigate = useNavigate();
  const { id } = useParams();
  const [roomTypes, setRoomTypes] = useState([]);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      const response = await axios.get('http://localhost:3000/api/v1/room/getroomtype');
      setRoomTypes(response.data.roomTypes);
    };
    fetchRoomTypes();
  }, []);

  useEffect(() => {
    const fetchRoom = async () => {
      const response = await axios.get(`http://localhost:3000/api/v1/room/getroombyid/${id}`);
      const data = response.data;
      console.log(data.room);
      form.setFieldsValue({
       roomNumber: data.room.roomNumber,
       floor: data.room.floor,
       status: data.room.status,
       roomTypeId: data.room.roomTypeId,
      });
    };
    fetchRoom();
  }, []);
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const formData = new FormData();

      const roomData = {
        roomNumber: values.roomNumber,
        floor: values.floor,
        status: values.status,
        roomTypeId: values.roomTypeId,
        hotelId: selectedHotel,
      };
      console.log(roomData);
      formData.append('room', JSON.stringify(roomData));
      
      const response = await axios.put(`http://localhost:3000/api/v1/room/update/${id}`, formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
        }
      });

      if (response.data) {
        alert('Cập nhật phòng thành công!');
        navigate('/rooms');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật phòng:', error);
      message.error('Đã xảy ra lỗi khi cập nhật phòng. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 w-full">
      <div className="flex items-center mb-6">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/rooms')}
          className="mr-4"
        >
          Quay lại
        </Button>
        <Title level={2} className="text-blue-800 m-0">Cập nhật phòng</Title>
      </div>

      <Card className="shadow-md">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Form.Item
                name="roomNumber"
                label="Số phòng"
                rules={[{ required: true, message: 'Vui lòng nhập số phòng!' }]}
              >
                <Input placeholder="Nhập số phòng" />
              </Form.Item>

              <Form.Item
                name="floor"
                label="Tầng"
                rules={[{ required: true, message: 'Vui lòng nhập tầng!' }]}
              >
              <Input placeholder="Nhập tầng" />
              </Form.Item>

              <Form.Item
                name="roomTypeId"
                label="Loại phòng"
                rules={[{ required: true, message: 'Vui lòng chọn loại phòng!' }]}
              >
                <Select>
                    {roomTypes.map(roomType => (
                        <Option key={roomType.id} value={roomType.id}>{roomType.name}</Option>
                    ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="status"
                label="Trạng thái"
                rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
              >
                <Select>
                    <Option value="available">Còn trống</Option>
                </Select>
              </Form.Item>
            </div>
          </div>

          <Divider />

          <div className="flex justify-end">
            <Button 
              onClick={() => navigate('/rooms')} 
              className="mr-2"
            >
              Hủy
            </Button>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              className="bg-blue-500 hover:bg-blue-700"
            >
              Cập nhật phòng
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default UpdateRoom;

