const Footer = () => {
  return (
    <footer className="bg-[#00205B] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold mb-4">Về chúng tôi</h4>
            <ul className="space-y-2">
              <li>Giới thiệu</li>
              <li>Tuyển dụng</li>
              <li>Liên hệ</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Điều khoản & Chính sách</h4>
            <ul className="space-y-2">
              <li>Điều khoản dịch vụ</li>
              <li>Chính sách bảo mật</li>
              <li>Chính sách đặt phòng</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Thông tin liên hệ</h4>
            <ul className="space-y-2">
              <li>Hotline: 1900 1833</li>
              <li>Email: info@muongthanh.vn</li>
            </ul>
          </div>

          <div className="flex flex-col items-center">
            <h4 className="font-bold mb-4">Kết nối với chúng tôi</h4>
            <div className="flex gap-4 ">
              <span className="material-icons">facebook</span>
              <span className="material-icons">public</span>
              <span className="material-icons">mail</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
