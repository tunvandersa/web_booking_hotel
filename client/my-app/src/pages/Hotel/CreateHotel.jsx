import React, { useState } from 'react';
import { Form, Input, InputNumber, Select, Button, Upload, Typography, Switch, message, Card, Divider } from 'antd';
import { PlusOutlined, UploadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const CreateHotel = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();

  const amenitiesOptions = [
    { label: 'Hồ bơi', value: 'Hồ bơi' },
    { label: 'Spa', value: 'Spa' },
    { label: 'Nhà hàng', value: 'Nhà hàng' },
    { label: 'Phòng gym', value: 'Phòng gym' },
    { label: 'Quầy bar', value: 'Quầy bar' },
    { label: 'Wifi miễn phí', value: 'Wifi miễn phí' },
    { label: 'Đưa đón sân bay', value: 'Đưa đón sân bay' },
    { label: 'Sân golf', value: 'Sân golf' },
    { label: 'Phòng hội nghị', value: 'Phòng hội nghị' },
  ];

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
          formData.append('images', file.originFileObj);
        }
      });
      
      // Thêm các trường dữ liệu khác
      Object.keys(values).forEach(key => {
        if (key !== 'images') {
          if (key === 'amenities') {
            formData.append(key, JSON.stringify(values[key]));
          } else {
            formData.append(key, values[key]);
          }
        }
      });
      
      // Gửi request tạo khách sạn mới
      // await axios.post('http://localhost:8080/api/hotels', formData, {
      //   headers: { 'Content-Type': 'multipart/form-data' }
      // });
      
      message.success('Tạo khách sạn mới thành công!');
      navigate('/hotels');
    } catch (error) {
      console.error('Lỗi khi tạo khách sạn:', error);
      message.error('Đã xảy ra lỗi khi tạo khách sạn. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 w-full">
      <div className="flex items-center mb-6">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/hotels')}
          className="mr-4"
        >
          Quay lại
        </Button>
        <Title level={2} className="text-blue-800 m-0">Thêm khách sạn mới</Title>
      </div>

      <Card className="shadow-md">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            status: true,
            stars: 3,
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
                name="stars"
                label="Số sao"
                rules={[{ required: true, message: 'Vui lòng chọn số sao!' }]}
              >
                <InputNumber min={1} max={5} className="w-full" />
              </Form.Item>

              <Form.Item
                name="minPrice"
                label="Giá phòng thấp nhất (VNĐ)"
                rules={[{ required: true, message: 'Vui lòng nhập giá phòng thấp nhất!' }]}
              >
                <InputNumber
                  min={0}
                  step={100000}
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  className="w-full"
                  placeholder="Nhập giá phòng thấp nhất"
                />
              </Form.Item>

              <Form.Item
                name="status"
                label="Trạng thái"
                valuePropName="checked"
              >
                <Switch checkedChildren="Hoạt động" unCheckedChildren="Tạm ngưng" />
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
                  options={amenitiesOptions}
                />
              </Form.Item>

              <Form.Item
                name="images"
                label="Hình ảnh khách sạn"
                rules={[{ required: true, message: 'Vui lòng tải lên ít nhất một hình ảnh!' }]}
              >
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={handleUploadChange}
                  beforeUpload={() => false}
                  multiple
                >
                  {fileList.length >= 5 ? null : (
                    <div>
                      <PlusOutlined />
                      <div className="mt-2">Tải lên</div>
                    </div>
                  )}
                </Upload>
                <Text type="secondary">Tải lên tối đa 5 hình ảnh. Kích thước tối đa: 2MB/ảnh</Text>
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
              Tạo khách sạn
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default CreateHotel;
