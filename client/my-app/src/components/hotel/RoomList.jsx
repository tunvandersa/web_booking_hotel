const RoomList = () => {
  const rooms = [
    {
      id: 1,
      name: "Phòng Grand Deluxe Giường Đôi",
      price: 1368000,
      size: 32,
      capacity: 2,
      image: "https://booking.muongthanh.com/images/hotels/rooms/original/phong-grand-deluxe-giuong-doi_1693944343.jpg",
      amenities: ["TV", "Minibar", "Điều hòa", "Wifi", "Két sắt"]
    },
    {
      id: 2,
      name: "Phòng Grand Suite",
      price: 2568000,
      size: 48,
      capacity: 3,
      image: "https://booking.muongthanh.com/images/hotels/rooms/original/phong-grand-suite_1693944368.jpg",
      amenities: ["TV", "Minibar", "Điều hòa", "Wifi", "Két sắt", "Bồn tắm"]
    }
  ];

  return (
    <div className="space-y-6">
      {rooms.map(room => (
        <div key={room.id} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex gap-6">
            <div className="w-1/3">
              <img 
                src={room.image} 
                alt={room.name}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[#00205B] mb-3">{room.name}</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="material-icons text-gray-500">straighten</span>
                  <span>{room.size} m²</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-icons text-gray-500">person</span>
                  <span>{room.capacity} người</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-4">
                {room.amenities.map(amenity => (
                  <div key={amenity} className="flex items-center gap-1 text-sm bg-gray-100 px-3 py-1 rounded">
                    <span className="material-icons text-blue-600 text-sm">check_circle</span>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-1/4 flex flex-col items-end justify-between">
              <div className="text-right">
                <p className="text-gray-500">Giá từ</p>
                <p className="text-2xl font-bold text-orange-500">
                  {room.price.toLocaleString('vi-VN')} VNĐ
                </p>
                <p className="text-gray-500">/ đêm</p>
              </div>
              
              <button className="bg-[#00205B] text-white px-8 py-3 rounded hover:bg-blue-800 transition">
                ĐẶT NGAY
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoomList;
