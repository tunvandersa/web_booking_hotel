import React, { useState } from 'react';
import { Form, Input, Button, Upload, Typography, Switch, message, Card, Divider } from 'antd';
import { PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Title, Text } = Typography;
const { TextArea } = Input;

const AddAmenitiesRoomType = () => {
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
    
            if (fileList.length > 0 && fileList[0].originFileObj) {
                formData.append('image', fileList[0].originFileObj);
            }
            console.log(formData);
            const response = await axios.post('http://localhost:3000/api/v1/room/createamenities', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log(response.data);
    
            if (response.data) {
                message.success('Tạo tiện nghi phòng mới thành công!');
                navigate('/amenities-room-types');
            }
        } catch (error) {
            console.error('Lỗi khi tạo tiện nghi phòng:', error);
            message.error(error.response?.data?.message || 'Đã xảy ra lỗi khi tạo tiện nghi phòng. Vui lòng thử lại!');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="p-6 w-full">
            <div className="flex flex-col mb-6">
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate('/amenities-room-types')}
                    className="mr-4 w-fit"
                >
                    Quay lại
                </Button>
                <Title level={2} className="text-blue-800 m-0 mt-5">Thêm tiện nghi phòng mới</Title>
            </div>

            <Card className="shadow-md">
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{
                        isFree: true
                    }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Form.Item
                                name="name"
                                label="Tên tiện nghi"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập tên tiện nghi!' },
                                    { max: 100, message: 'Tên tiện nghi không được quá 100 ký tự!' }
                                ]}
                            >
                                <Input placeholder="Nhập tên tiện nghi" />
                            </Form.Item>

                            <Form.Item
                                name="description"
                                label="Mô tả"
                                rules={[
                                    { max: 500, message: 'Mô tả không được quá 500 ký tự!' }
                                ]}
                            >
                                <TextArea rows={4} placeholder="Nhập mô tả tiện nghi" />
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item
                                name="image"
                                label="Hình ảnh tiện nghi"
                            >
                                <Upload
                                    listType="picture-card"
                                    fileList={fileList}
                                    onChange={handleUploadChange}
                                    beforeUpload={() => false}
                                    maxCount={1}
                                >
                                    {fileList.length >= 1 ? null : (
                                        <div>
                                            <PlusOutlined />
                                            <div className="mt-2">Tải lên</div>
                                        </div>
                                    )}
                                </Upload>
                                <Text type="secondary">Tải lên một hình ảnh. Kích thước tối đa: 2MB</Text>
                            </Form.Item>
                        </div>
                    </div>
                    <Divider />
                    <div className="flex justify-end">
                        <Button
                            onClick={() => navigate('/amenities-room-types')}
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
                            Tạo tiện nghi
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default AddAmenitiesRoomType;

