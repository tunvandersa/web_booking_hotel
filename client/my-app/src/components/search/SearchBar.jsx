// //components/search/SearchBar.jsx
// import { useState, useEffect } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import HotelSearchCard from "../hotel/HotelSearchCard";
// import axios from "axios";
// import { useNavigate, useSearchParams } from "react-router-dom";

// const SearchBar = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [startDate, setStartDate] = useState(searchParams.get("checkin") ? new Date(searchParams.get("checkin")) : null);
//   const [endDate, setEndDate] = useState(searchParams.get("checkout") ? new Date(searchParams.get("checkout")) : null);
//   const [location, setLocation] = useState(searchParams.get("city") || "");
//   const [roomSearchNumber, setRoomSearchNumber] = useState(searchParams.get("roomNumber") || 1);
//   const [hotels, setHotels] = useState([]);

//   const handleLocationChange = (e) => {
//     setLocation(e.target.value);
//     console.log(e.target.value);
//   }


//   const handleDetailHotel = (hotelId) => {
//     const params = new URLSearchParams();
//     if (hotelId) params.append("hotelid", hotelId);
//     if (startDate) params.append("checkin", formatDate(startDate));
//     if (endDate) params.append("checkout", formatDate(endDate));
//     if (roomSearchNumber) params.append("roomNumber", roomSearchNumber.toString());
//     navigate(`/booking?${params.toString()}`);
//   }

//   const formatDate = (date) => {
//     if (!date) return "";
//     return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0");
//   };

//   const navigate = useNavigate(); // Khai báo useNavigate()

//   const handleSearch = async () => {
//     try {
//       const params = new URLSearchParams();

//       if (location) params.append("city", location);
//       if (startDate) params.append("checkin", formatDate(startDate));
//       if (endDate) params.append("checkout", formatDate(endDate));
//       if (roomSearchNumber) params.append("roomNumber", roomSearchNumber.toString());

//       const url = `http://localhost:3000/api/v1/booking/location?${params.toString()}`;

//       const response = await axios.get(url, { headers: { "Content-Type": "application/json" } });

//       if (response.data.AvailableRooms?.length === 0) {
//         alert("Không tìm thấy phòng trống");
//         setHotels([]);
//       } else {
//         setHotels(response.data.AvailableRooms);
//       }

//       navigate(`/search?${params.toString()}`);
//     } catch (error) {
//       setHotels([]);
//       console.error("Lỗi khi lấy danh sách phòng khả dụng:", error);
//     }
//   };

//   useEffect(() => {
//     if (location && startDate && endDate && roomSearchNumber) {
//       handleSearch(); // Nếu có dữ liệu từ URL, tự động tìm kiếm
//     }
//   }, []);
//   return (
//     <div>
//       <div className="bg-[#00205B] py-4 sticky top-0 z-40">
//         <div className="container mx-auto px-3">
//           <div className="grid grid-cols-1 md:grid-cols-6 gap-6 justify-center items-center">
//             <div className="min-h-[90px]"> {/* Thêm min-height để giữ chiều cao cố định */}
//               <label className="text-white mb-2 block text-sm h-8">Bạn muốn nghỉ dưỡng ở đâu ?</label>
//               <div className="relative h-[42px] flex items-center justify-center"> {/* Cố định chiều cao cho input container */}
//                 <span className="absolute left-3 flex text-gray-400">
//                   <span className="material-icons text-[20px]">location_on</span>
//                 </span>
//                 <select
//                   className="w-full h-full pl-10 rounded outline-none text-sm bg-white appearance-none "
//                   defaultValue=""
//                   onChange={(e) => handleLocationChange(e)}
//                 >
//                   <option value="" disabled>
//                     Chọn điểm đến
//                   </option>
//                   <option value="1">Hà Nội</option>
//                   <option value="3">Quảng Ninh</option>
//                   <option value="2">Đà Nẵng</option>
//                 </select>
//                 <span className="absolute right-3 bottom-1 text-gray-400">
//                   <span className="material-icons text-[20px]">arrow_drop_down</span>
//                 </span>
//               </div>
//             </div>

//             <div className="min-h-[90px] ">
//               <label className="text-white mb-2 block text-sm h-8">Ngày nhận</label>
//               <div className="relative w-full h-[42px] flex justify-center items-center rounded border border-gray-300 bg-white">
//                 <span className="absolute left-3 flex text-gray-400">
//                   <span className="material-icons text-xl">calendar_today</span>
//                 </span>
//                 <DatePicker
//                   className="max-w-[75px] h-[42px] text-sm rounded outline-none tranform translate-x-5"
//                   selected={startDate}
//                   onChange={(date) => setStartDate(date)}
//                   placeholderText="Ngày nhận"
//                   dateFormat="dd/MM/yyyy"
//                 />
//               </div>
//             </div>
//             <div className="min-h-[90px] ">
//               <label className="text-white mb-2 block text-sm h-8">Ngày trả</label>
//               <div className="relative w-full h-[42px] flex justify-center items-center rounded border border-gray-300 bg-white">
//                 <span className="absolute left-3 flex text-gray-400">
//                   <span className="material-icons text-xl">calendar_today</span>
//                 </span>
//                 <DatePicker
//                   className="max-w-[75px] h-[42px] text-sm rounded outline-none translate-x-5"
//                   selected={endDate}
//                   onChange={(date) => setEndDate(date)}
//                   placeholderText="Ngày trả"
//                   dateFormat="dd/MM/yyyy"
//                 />
//               </div>
//             </div>

//             <div className="min-h-[90px]">
//               <label className="text-white mb-2 block text-sm h-8">Số phòng</label>
//               <div className="relative h-[42px] flex justify-center items-center">
//                 <span className="absolute left-3 flex text-gray-400">
//                   <span className="material-icons text-[20px]">home</span>
//                 </span>
//                 <input
//                   type="number"
//                   className="w-full h-full px-2 pl-10 rounded border border-gray-300 text-sm"
//                   value={roomSearchNumber}
//                   min={1}
//                   onChange={(e) => setRoomSearchNumber(Number(e.target.value))}
//                 />
//               </div>
//             </div>

//             <div className="min-h-[90px]">
//               <label className="text-white mb-2 block text-sm h-8">Mã khuyến mãi/Voucher</label>
//               <div className="relative h-[42px] flex justify-center items-center">
//                 <span className="absolute left-3 flex justify-center items-center  text-gray-400">
//                   <span className="material-icons text-[20px]">local_offer</span>
//                 </span>
//                 <input
//                   type="text"
//                   className="w-full h-full px-2 pl-10 rounded border border-gray-300 text-sm"
//                   placeholder="Nhập mã khuyến mãi"
//                 />
//               </div>
//             </div>
//             <div className="min-h-[90px] flex items-center justify-center pt-8 ">
//               <button onClick={handleSearch} className="w-full h-[42px] bg-yellow-500 text-white rounded hover:bg-yellow-600 flex items-center justify-center gap-2 text-sm font-medium">
//                 <span className="material-icons text-[20px]">search</span>
//                 TÌM KIẾM
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="mt-6 space-y-6">
//         <HotelSearchCard
//           hotels={hotels}
//           handleDetailHotel={handleDetailHotel}
//         />
//       </div>
//     </div>

//   );
// };


// export default SearchBar;


import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import axios from "axios";

const SearchBar = ({ location, setLocation, startDate, setStartDate, endDate, setEndDate, roomSearchNumber, setRoomSearchNumber, handleSearch }) => {
  const [local, setLocal] = useState([]);
  useEffect(() => {
    const fetchLocal = async () => {
      const response = await axios.get("http://localhost:3000/api/v1/booking/locationhotel");
      setLocal(response.data.local);
    };
    fetchLocal();
  }, []);
  return (
    <div className="bg-[#00205B] py-4 sticky top-0 z-40">
      <div className="container mx-auto px-3">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 justify-center items-center">
          <div className="min-h-[90px]"> {/* Thêm min-height để giữ chiều cao cố định */}
            <label className="text-white mb-2 block text-sm h-8">Bạn muốn nghỉ dưỡng ở đâu ?</label>
            <div className="relative h-[42px] flex items-center justify-center"> {/* Cố định chiều cao cho input container */}
              <span className="absolute left-3 flex text-gray-400">
                <span className="material-icons text-[20px]">location_on</span>
              </span>
              <select
                className="w-full h-full pl-10 rounded outline-none text-sm bg-white appearance-none "
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="" disabled>
                  Chọn điểm đến
                </option>
                {local.map((item) => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
              <span className="absolute right-3 bottom-1 text-gray-400">
                <span className="material-icons text-[20px]">arrow_drop_down</span>
              </span>
            </div>
          </div>

          <div className="min-h-[90px] ">
            <label className="text-white mb-2 block text-sm h-8">Ngày nhận</label>
            <div className="relative w-full h-[42px] flex justify-center items-center rounded border border-gray-300 bg-white">
              <span className="absolute left-3 flex text-gray-400">
                <span className="material-icons text-xl">calendar_today</span>
              </span>
              <DatePicker
                className="max-w-[75px] h-[42px] text-sm rounded outline-none tranform translate-x-5"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                placeholderText="Ngày nhận"
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>
          <div className="min-h-[90px] ">
            <label className="text-white mb-2 block text-sm h-8">Ngày trả</label>
            <div className="relative w-full h-[42px] flex justify-center items-center rounded border border-gray-300 bg-white">
              <span className="absolute left-3 flex text-gray-400">
                <span className="material-icons text-xl">calendar_today</span>
              </span>
              <DatePicker
                className="max-w-[75px] h-[42px] text-sm rounded outline-none translate-x-5"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                placeholderText="Ngày trả"
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>

          <div className="min-h-[90px]">
            <label className="text-white mb-2 block text-sm h-8">Số phòng</label>
            <div className="relative h-[42px] flex justify-center items-center">
              <span className="absolute left-3 flex text-gray-400">
                <span className="material-icons text-[20px]">home</span>
              </span>
              <input
                type="number"
                className="w-full h-full px-2 pl-10 rounded border border-gray-300 text-sm"
                value={roomSearchNumber}
                min={1}
                onChange={(e) => setRoomSearchNumber(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="min-h-[90px] flex items-center justify-center pt-8 ">
            <button onClick={handleSearch} className="w-full h-[42px] bg-yellow-500 text-white rounded hover:bg-yellow-600 flex items-center justify-center gap-2 text-sm font-medium">
              <span className="material-icons text-[20px]">search</span>
              TÌM KIẾM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
