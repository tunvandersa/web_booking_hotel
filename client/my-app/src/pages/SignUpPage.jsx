import React from 'react'

function SignUpPage() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Đăng ký tài khoản</h2>
              <p className="text-gray-600 mt-2">Tạo tài khoản để đặt phòng dễ dàng hơn</p>
            </div>
    
            {/* Form */}
            <form className="space-y-6">
              {/* Họ và tên */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Họ
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 flex text-gray-400">
                      <span className="material-icons text-[20px]">person</span>
                    </span>
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                      placeholder="Nhập họ"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="Nhập tên"
                  />
                </div>
              </div>
    
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 flex text-gray-400">
                    <span className="material-icons text-[20px]">email</span>
                  </span>
                  <input
                    type="email"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="Nhập email của bạn"
                  />
                </div>
              </div>
    
              {/* Số điện thoại */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 flex text-gray-400">
                    <span className="material-icons text-[20px]">phone</span>
                  </span>
                  <input
                    type="tel"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="Nhập số điện thoại"
                  />
                </div>
              </div>
    
              {/* Mật khẩu */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mật khẩu
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 flex text-gray-400">
                    <span className="material-icons text-[20px]">lock</span>
                  </span>
                  <input
                    type="password"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="Nhập mật khẩu"
                  />
                </div>
              </div>
    
              {/* Xác nhận mật khẩu */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Xác nhận mật khẩu
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 flex text-gray-400">
                    <span className="material-icons text-[20px]">lock</span>
                  </span>
                  <input
                    type="password"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="Nhập lại mật khẩu"
                  />
                </div>
              </div>
    
              {/* Điều khoản */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label className="text-gray-700">
                    Tôi đồng ý với{' '}
                    <a href="#" className="text-yellow-600 hover:text-yellow-500">
                      điều khoản
                    </a>
                    {' '}và{' '}
                    <a href="#" className="text-yellow-600 hover:text-yellow-500">
                      chính sách bảo mật
                    </a>
                  </label>
                </div>
              </div>
    
              {/* Nút đăng ký */}
              <button
                type="submit"
                className="w-full bg-[#F2A900] text-white py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Đăng ký
              </button>
            </form>
    
            {/* Divider */}
            {/* <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Hoặc đăng ký với
                  </span>
                </div>
              </div>
            </div> */}
    
            {/* Social Buttons */}
            {/* <div className="mt-6 grid grid-cols-2 gap-3">
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
            </div> */}
    
            {/* Login Link */}
            <p className="mt-8 text-center text-sm text-gray-600">
              Đã có tài khoản?{' '}
              <a href="#" className="font-medium text-yellow-600 hover:text-yellow-500">
                Đăng nhập ngay
              </a>
            </p>
          </div>
        </div>
    )
}

export default SignUpPage