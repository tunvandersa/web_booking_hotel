import React, { useState, useEffect  } from 'react';
import { Form, Input, InputNumber, Select, Button, Upload, Typography, Switch, message, Card, Divider } from 'antd';
import { PlusOutlined, UploadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const UpdateHotel = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const navigate = useNavigate();
  const {id} = useParams();
  useEffect(() => {
    const fetchAmenities = async () => {
      const response = await axios.get('http://localhost:3000/api/v1/hotel/getamenitieshotel');
      setAmenities(response.data.amenitiesHotel);
    };
    fetchAmenities();
  }, []);

  useEffect(() => {
    const fetchRoomAmenities = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/hotel/gethotelbyid/${id}`);
            const data = response.data;
            
            console.log(data.hotel.name);
            
            form.setFieldsValue({
                name: data.hotel.name,
                description: data.hotel.description,
                image: data.hotel.image,
                address: data.hotel.address,
                city: data.hotel.city,
                country: data.hotel.country,
                phone: data.hotel.phone,
                email: data.hotel.email,
                starRating: data.hotel.starRating,
                checkInTime: data.hotel.checkInTime,
                checkOutTime: data.hotel.checkOutTime,
            });

            // Nếu có ảnh từ backend, hiển thị lên Upload
            if (data.hotel.image) {
                setFileList([
                    {
                        uid: '-1',
                        name: 'image.png',
                        status: 'done',
                        url: "http://localhost:3000/uploads/" + data.hotel.image, // Đường dẫn ảnh từ server
                    }
                ]);
            }
        } catch (error) {
            console.error("Lỗi khi lấy tiện nghi phòng:", error);
        }
    };

    fetchRoomAmenities();
}, []);

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      
      // Xử lý hình ảnh
      const formData = new FormData();
      fileList.forEach(file => {
        if (file.originFileObj) {
          formData.append('image', file.originFileObj);
        }
      });
      
      // Thêm các trường dữ liệu khác
      const hotelData = {
        name: values.name,
        address: values.address,
        city: values.city,
        country: values.country,
        description: values.description,
        starRating: values.starRating,
        amenities: values.amenities,
        checkInTime: values.checkInTime,
        checkOutTime: values.checkOutTime,
        phone: values.phone,
        email: values.email,
      };
      console.log(hotelData);
      formData.append('hotel', JSON.stringify(hotelData));
      
      console.log(formData);

      const response = await axios.put(`http://localhost:3000/api/v1/hotel/update/${id}`, formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
        }
      });
      
      if (response.data) {
       alert('Cập nhật khách sạn thành công!');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật khách sạn:', error);
    message.error('Đã xảy ra lỗi khi cập nhật khách sạn. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 w-full">
      <div className="flex flex-col mb-6">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/hotels')}
          className="mr-4 w-fit"
        >
          Quay lại
        </Button>
        <Title level={2} className="text-blue-800 m-0"> Cập nhật khách sạn</Title>
      </div>

      <Card className="shadow-md">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            country: 'Việt Nam',
            checkInTime: '14:00',
            checkOutTime: '12:00'
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Form.Item
                name="name"
                label="Tên khách sạn"
                rules={[{ required: true, message: 'Vui lòng nhập tên khách sạn!' }]}
              >
                <Input placeholder="Nhập tên khách sạn" />
              </Form.Item>

              <Form.Item
                name="address"
                label="Địa chỉ"
                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ khách sạn!' }]}
              >
                <Input placeholder="Nhập địa chỉ khách sạn" />
              </Form.Item>

              <Form.Item
                name="city"
                label="Thành phố"
                rules={[{ required: true, message: 'Vui lòng nhập thành phố!' }]}
              >
                <Input placeholder="Nhập thành phố" />
              </Form.Item>

              <Form.Item
                name="country"
                label="Quốc gia"
                rules={[{ required: true, message: 'Vui lòng nhập quốc gia!' }]}
              >
                <Input placeholder="Nhập quốc gia" />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[
                  { required: true, message: 'Vui lòng nhập số điện thoại!' },
                  { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ!' }
                ]}
              >
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Vui lòng nhập email!' },
                  { type: 'email', message: 'Email không hợp lệ!' }
                ]}
              >
                <Input placeholder="Nhập email" />
              </Form.Item>


              <Form.Item
                name="starRating"
                label="Số sao"
                rules={[{ required: true, message: 'Vui lòng chọn số sao!' }]}
              >
                <InputNumber min={1} max={5} className="w-full" />
              </Form.Item>


              <Form.Item
                name="checkInTime"
                label="Giờ nhận phòng"
                rules={[{ required: true, message: 'Vui lòng nhập giờ nhận phòng!' }]}
              >
                <Input placeholder="VD: 14:00" />
              </Form.Item>

              <Form.Item
                name="checkOutTime"
                label="Giờ trả phòng"
                rules={[{ required: true, message: 'Vui lòng nhập giờ trả phòng!' }]}
              >
                <Input placeholder="VD: 12:00" />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                name="description"
                label="Mô tả"
                rules={[{ required: true, message: 'Vui lòng nhập mô tả khách sạn!' }]}
              >
                <TextArea rows={4} placeholder="Nhập mô tả về khách sạn" />
              </Form.Item>

              <Form.Item
                name="amenities"
                label="Tiện nghi"
                rules={[{ required: true, message: 'Vui lòng chọn ít nhất một tiện nghi!' }]}
              >
                <Select
                  mode="multiple"
                  placeholder="Chọn tiện nghi"
                  options={amenities.map(amenity => ({
                    value: amenity.id,
                    label: amenity.name
                  })) }
                />
              </Form.Item>

              <Form.Item
                name="images"
                label="Hình ảnh khách sạn"
                rules={[{ message: 'Vui lòng tải lên ít nhất một hình ảnh!' }]}
              >
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={handleUploadChange}
                  beforeUpload={() => false}
                  multiple={false}
                  maxCount={1}
                >
                  {fileList.length >= 1 ? null : (
                    <div>
                      <PlusOutlined />
                      <div className="mt-2">Tải lên</div>
                    </div>
                  )}
                </Upload>
                <Text type="secondary">Tải lên tối đa 1 hình ảnh. Kích thước tối đa: 2MB/ảnh</Text>
              </Form.Item>
            </div>
          </div>

          <Divider />

          <div className="flex justify-end">
            <Button 
              onClick={() => navigate('/hotels')} 
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
              Cập nhật khách sạn
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default UpdateHotel;
