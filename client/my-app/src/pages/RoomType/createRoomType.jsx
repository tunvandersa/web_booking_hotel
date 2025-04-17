import React, { useState } from 'react';
import { Form, Input, Button, Upload, Typography, message, Card, Divider, InputNumber } from 'antd';
import { PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Title, Text } = Typography;
const { TextArea } = Input;

const CreateRoomType = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const navigate = useNavigate();

    const handleUploadChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const onFinish = async (values) => {
        try {
            setLoading(true);
    
            const formData = new FormData();
            
            formData.append('name', values.name);
            formData.append('description', values.description || '');
            formData.append('capacity', values.capacity);
            formData.append('basePrice', values.basePrice);
            formData.append('sizeSqm', values.sizeSqm);
            
            // Thêm tất cả các file ảnh vào FormData
            fileList.forEach((file, index) => {
                if (file.originFileObj) {
                    formData.append('image', file.originFileObj);
                }
            });

            const response = await axios.post('http://localhost:3000/api/v1/room/createroomtype', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log(response.data);
    
            if (response.data) {
                alert('Tạo loại phòng mới thành công!');
                navigate('/room-types');
            }
        } catch (error) {
            console.error('Lỗi khi tạo loại phòng:', error);
            message.error(error.response?.data?.message || 'Đã xảy ra lỗi khi tạo loại phòng. Vui lòng thử lại!');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="p-6 w-full">
            <div className="flex flex-col mb-6">
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate('/room-types')}
                    className="mr-4 w-fit"
                >
                    Quay lại
                </Button>
                <Title level={2} className="text-blue-800 m-0 mt-5">Thêm loại phòng mới</Title>
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
                                name="name"
                                label="Tên loại phòng"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập tên loại phòng!' },
                                    { max: 100, message: 'Tên loại phòng không được quá 100 ký tự!' }
                                ]}
                            >
                                <Input placeholder="Nhập tên loại phòng" />
                            </Form.Item>

                            <Form.Item
                                name="description"
                                label="Mô tả"
                                rules={[
                                    { max: 500, message: 'Mô tả không được quá 500 ký tự!' }
                                ]}
                            >
                                <TextArea rows={4} placeholder="Nhập mô tả loại phòng" />
                            </Form.Item>
                            <Form.Item
                                name="capacity"
                                label="Sức chứa"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập sức chứa!' }
                                ]}
                            >
                                <InputNumber className='w-full' min={1} max={2} placeholder="Nhập sức chứa" />
                            </Form.Item>
                            <Form.Item
                                name="basePrice"
                                label="Giá cơ bản"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập giá cơ bản!' }
                                ]} 
                            >
                                <InputNumber className='w-full' placeholder="Nhập giá cơ bản" />
                            </Form.Item>
                            <Form.Item
                                name="sizeSqm"
                                label="Diện tích"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập diện tích!' }
                                ]}
                            >
                                <InputNumber className='w-full' placeholder="Nhập diện tích" />
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item
                                name="images"
                                label="Hình ảnh loại phòng"
                                rules={[
                                    { message: 'Vui lòng tải lên ít nhất một hình ảnh!' }
                                ]}
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
                                <Text type="secondary">Tải lên tối đa 5 hình ảnh. Kích thước tối đa mỗi ảnh: 2MB</Text>
                            </Form.Item>
                        </div>
                    </div>
                    <Divider />
                    <div className="flex justify-end">
                        <Button
                            onClick={() => navigate('/room-types')}
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
                            Tạo loại phòng
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default CreateRoomType;

