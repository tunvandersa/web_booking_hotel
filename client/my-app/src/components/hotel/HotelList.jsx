// components/hotel/HotelList.jsx
import HotelSearchCard from './HotelSearchCard';
import HotelCard from './HotelCard';
const HotelList = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-green-600 font-medium">
          CÓ 6 KHÁCH SẠN GẦN/TẠI "QUẢNG NINH"
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Sắp xếp:</span>
          <select className="border p-2 rounded min-w-[150px]">
            <option>Giá tăng dần</option>
            <option>Giá giảm dần</option>
          </select>
        </div>
      </div>
      <div className="space-y-6">
        <HotelSearchCard />
        <HotelSearchCard />
        <HotelSearchCard />
      </div>
      {/* <div className='grid grid-cols-4 pt-3' >
        <HotelCard />
        <HotelCard />
        <HotelCard />
        <HotelCard />
      </div> */}
    </div>
  );
};

export default HotelList;