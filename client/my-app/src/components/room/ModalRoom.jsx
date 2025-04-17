import React, { useState } from 'react';
import wardrobe from '../../assets/wardrobe_1709957976.png';
const ModalRoom = ({ room, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "https://booking.muongthanh.com/images/hotels/rooms/original/__thumbs_1613_1080_crop_muong-thanh-luxury-nha-trang-deluxe-twin-1_1578300694.jpg",
    "https://booking.muongthanh.com/images/hotels/rooms/original/__thumbs_1613_1080_crop_muong-thanh-luxury-nha-trang-deluxe-twin-2_1578300694.jpg",
    "https://booking.muongthanh.com/images/hotels/rooms/original/__thumbs_1613_1080_crop_muong-thanh-luxury-nha-trang-deluxe-twin-3_1578300694.jpg"
  ];

  const amenities = [
    { icon: "checkroom", text: "Tủ quần áo" },
    { icon: "smoke_free", text: "Phòng không hút thuốc" },
    { icon: "ac_unit", text: "Điều hòa" },
    { icon: "dry", text: "Máy sấy tóc" },
    { icon: "security", text: "Két sắt an toàn" },
    { icon: "bathroom", text: "Đồ phòng tắm" },
    { icon: "phone", text: "Điện thoại" },
    { icon: "desk", text: "Bàn làm việc" },
    { icon: "bed", text: "Ga trải giường, gối" },
    { icon: "shower", text: "Vòi sen" },
    { icon: "local_laundry_service", text: "Dịch vụ giặt ủi" },
    { icon: "bathtub", text: "Phòng có bồn tắm" },
    { icon: "wifi", text: "Wifi" },
    { icon: "dry_cleaning", text: "Khăn tắm" },
    { icon: "light", text: "Đèn bàn" }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[1000px] max-h-[90vh] overflow-y-auto relative">
        {/* Nút đóng */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 z-10 text-gray-600 hover:text-gray-800"
        >
          <span className="material-icons text-3xl">close</span>
        </button>

        <div className="p-8">
          {/* Tiêu đề */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Phòng Deluxe Twin</h2>

          <div className="flex gap-8">
            {/* Phần hình ảnh */}
            <div className="w-1/2 relative">
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <img 
                  src={images[currentImageIndex]}
                  alt="Room"
                  className="w-full h-full object-cover"
                />
                {/* Nút điều hướng ảnh */}
                <button 
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-75"
                >
                  <span className="material-icons">chevron_left</span>
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-75"
                >
                  <span className="material-icons">chevron_right</span>
                </button>
              </div>
            </div>

            {/* Phần thông tin */}
            <div className="w-1/2">
              <div className="mb-6">
                <p className="text-xl mb-2">37 m² |</p>
                <p className="text-gray-600">
                  Phòng Deluxe sẽ giúp quý khách quên đi sự mệt mỏi của cuộc sống với và ngoài kia.
                </p>
              </div>

              {/* Tiện ích trong phòng */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Tiện ích trong phòng:</h3>
                <div className="grid grid-cols-2 gap-4">
                  {amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <img src="src/assets/wardrobe_1709957976.png" className="w-6 h-6" />
                      <span className="text-gray-600">{amenity.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalRoom;
