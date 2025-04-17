import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function LoginPages() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/v1/login', {
        email: formData.email,
        password: formData.password
      }, {
        withCredentials: true,
      });
      console.log(formData.email, formData.password);
      console.log(response.data.user);
      if (response.data.user) {
        toast.success('Đăng nhập thành công!');
        navigate('/search');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại');
      toast.error('Đăng nhập thất bại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Đăng nhập</h2>
          <p className="text-gray-600 mt-2">Chào mừng bạn đến với hệ thống đặt phòng</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <span className="material-icons text-[20px]">email</span>
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Nhập email của bạn"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mật khẩu
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <span className="material-icons text-[20px]">lock</span>
              </span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Nhập mật khẩu"
                required
              />
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Ghi nhớ đăng nhập
              </label>
            </div>
            <a href="#" className="text-sm text-yellow-600 hover:text-yellow-500">
              Quên mật khẩu?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F2A900] text-white py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50"
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        {/* Divider */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Hoặc đăng nhập với
              </span>
            </div>
          </div>
        </div>

        {/* Social Buttons */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button className="flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
            <img
              className="h-5 w-5 mr-2"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
            />
            Google
          </button>
          <button className="flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
            <img
              className="h-5 w-5 mr-2"
              src="https://www.svgrepo.com/show/475647/facebook-color.svg"
              alt="Facebook"
            />
            Facebook
          </button>
        </div>

        {/* Sign up Link */}
        <p className="mt-8 text-center text-sm text-gray-600">
          Chưa có tài khoản?{' '}
          <a href="#" className="font-medium text-yellow-600 hover:text-yellow-500">
            Đăng ký ngay
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginPages;
