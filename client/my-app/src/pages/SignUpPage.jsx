import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function SignUpPage() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''   
    })
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSignUp = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        if (formData.password !== formData.confirmPassword) {
            setError('Mật khẩu không khớp')
            return
        }

        try {
            const response = await axios.post('http://localhost:3000/api/v1/signup', {
                email: formData.email,
                password: formData.password,
                firstName: formData.firstName,
                lastName: formData.lastName,
                phone: formData.phone
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log("response", response);

            if (response.data) {
                alert('Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.')
                setTimeout(() => {
                    navigate('/login')
                }, 3000)
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.')
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">Đăng ký tài khoản</h2>
                    <p className="text-gray-600 mt-2">Tạo tài khoản để đặt phòng dễ dàng hơn</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                        {success}
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSignUp}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Họ
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                                placeholder="Nhập họ"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tên
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                                placeholder="Nhập tên"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                            placeholder="Nhập email của bạn"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Số điện thoại
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                            placeholder="Nhập số điện thoại"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                            placeholder="Nhập mật khẩu"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Xác nhận mật khẩu
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                            placeholder="Nhập lại mật khẩu"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#F2A900] text-white py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-colors duration-200"
                    >
                        Đăng ký
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-600">
                    Đã có tài khoản?{' '}
                    <a href="/login" className="font-medium text-yellow-600 hover:text-yellow-500">
                        Đăng nhập ngay
                    </a>
                </p>
            </div>
        </div>
    )
}

export default SignUpPage