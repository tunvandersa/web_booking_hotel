import React from "react";

const HotelSearchCard = ({ hotels, handleDetailHotel }) => {
  return (
    <div className="space-y-6">
      {hotels.map((hotel) => (
        <div key={hotel.hotelId} className="bg-white shadow-md overflow-hidden flex p-4">
          {/* Ảnh khách sạn */}
          <div className="relative w-1/4">
            <img
              src="https://booking.muongthanh.com/images/hotels/hotels/original/muong-thanh-luxury-ha-long-centre_1729839613.jpg"
              alt={hotel.hotelName}
              className="w-[300px] h-[200px] object-cover rounded-lg"
            />
            <button className="absolute bottom-4 left-4 bg-white/80 justify-center rounded flex items-center gap-2 text-sm h-[30px] w-[150px] hover:bg-white/90">
              <span className="material-icons">photo_library</span>
              Xem thêm ảnh
            </button>
          </div>

          {/* Thông tin khách sạn */}
          <div className="px-6 flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-[#00205B] flex mb-2">
                {hotel.hotelName}
              </h2>
              <div className="flex gap-1 mb-2">
                <span className="material-icons text-gray-600">location_on</span>
                <p className="text-gray-600">{hotel.address}, {hotel.city}</p>
              </div>

              {/* Đánh giá giả lập */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-green-500 text-2xl">●</span>
                  ))}
                </div>
                <span className="text-gray-600">5/5 (30 reviews)</span>
              </div>
            </div>

            {/* Giá và nút đặt phòng */}
            <div className="flex items-center justify-between mt-auto">
              <div>
                <p className="text-gray-500">Chỉ từ</p>
                <div className="flex items-baseline gap-1">
                  <p className="text-2xl font-bold text-orange-500">
                    {parseInt(hotel.minPrice).toLocaleString("vi-VN")}
                  </p>
                  <p className="text-orange-500">VND</p>
                </div>
                <p className="text-gray-500">phòng/đêm</p>
              </div>

              <button
                onClick={() => handleDetailHotel(hotel.hotelId)}
                className="bg-[#00205B] text-white px-8 py-3 rounded hover:bg-blue-800 transition font-semibold"
              >
                ĐẶT NGAY
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HotelSearchCard;
