import React, { useState, useEffect } from 'react'
import Header from '../components/layout/Header'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from 'axios';

const BookingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [startDate, setStartDate] = useState(searchParams.get("checkin") ? new Date(searchParams.get("checkin")) : null);
  const [endDate, setEndDate] = useState(searchParams.get("checkout") ? new Date(searchParams.get("checkout")) : null);
  const [hotelId, setHotelId] = useState(searchParams.get("hotelid") || "");
  const [roomSearchNumber, setRoomSearchNumber] = useState(searchParams.get("room") || 1);
  const [hotels, setHotels] = useState();
  const [roomType, setRoomType] = useState([]);
  const navigate = useNavigate();
  const [showBookingDetails, setShowBookingDetails] = useState({});
  const [roomNumber, setRoomNumber] = useState({});

   const formatDate = (date) => {
    if (!date) return "";
    return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0");
  };

  const handleSearch = async () => {
    try {
      const params = new URLSearchParams();
      console.log("hotelid", hotelId);
      console.log("startDate", startDate);
      console.log("endDate", endDate);
      console.log("room", roomSearchNumber);

      if (hotelId) params.append("hotelid", hotelId);
      if (startDate) params.append("checkin", formatDate(startDate));
      if (endDate) params.append("checkout", formatDate(endDate));
      if (roomSearchNumber) params.append("roomNumber", roomSearchNumber.toString());

      const url = `http://localhost:3000/api/v1/booking/hotel?${params.toString()}`;

      console.log("URL:", params.toString());
      const response = await axios.get(url, { headers: { "Content-Type": "application/json" } });

      console.log("response:", response.data);
      if (response.data.availableRooms?.length === 0) {
        alert("Không tìm thấy phòng trống");
        setRoomType([]);
      } else {
        setRoomType(response.data.availableRooms);
      }
      if (response.data.hotel) {
        setHotels(response.data.hotel);
      } else {
        setHotels([]);
      }
      console.log("hotel:", hotels);
      if (window.location.search !== `?${params.toString()}`) {
        navigate(`/booking?${params.toString()}`);
      }
    } catch (error) {
      setHotels([]);
      console.error("Lỗi khi lấy danh sách phòng khả dụng:", error);
    }
  };

  useEffect(() => {
    if(location && startDate && endDate && roomSearchNumber){
      handleSearch();
    }
  }, []);

  const toggleBookingDetails = (roomId) => {
    setShowBookingDetails(prev => ({
      ...prev,
      [roomId]: !prev[roomId]
    }));
  };

  const handleRoomNumberChange = (roomId, value) => {
    setRoomNumber(prev => ({
      ...prev,
      [roomId]: value,
    }));
  };

  return (
    <div className='pt-5 bg-gray-100 container mx-auto'>
      <div className="px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 justify-center items-center">
          <div className="min-h-[90px]"> {/* Thêm min-height để giữ chiều cao cố định */}
            <label className="text-black mb-2 block text-sm h-8">Bạn muốn nghỉ dưỡng ở đâu ?</label>
            <div className="relative h-[42px] flex items-center justify-center"> {/* Cố định chiều cao cho input container */}
              <span className="absolute left-3 flex text-gray-400">
                <span className="material-icons text-[20px]">location_on</span>
              </span>
              <select
                className="w-full h-full pl-10  outline-none text-sm bg-white appearance-none  border border-gray-300 "
                defaultValue={hotelId}
                onChange={(e) => handleLocationChange(e)}
              >
                <option value="" disabled >
                  Chọn điểm đến
                </option>
                <option value="1">Hà Nội</option>
                <option value="3">Quảng Ninh</option>
                <option value="2">Đà Nẵng</option>
              </select>
              <span className="absolute right-3 bottom-1 text-gray-400">
                <span className="material-icons text-[20px]">arrow_drop_down</span>
              </span>
            </div>
          </div>

          <div className="min-h-[90px] ">
            <label className="text-black mb-2 block text-sm h-8">Ngày nhận</label>
            <div className="relative w-full h-[42px] flex justify-center items-center border border-gray-300 bg-white">
              <span className="absolute left-3 flex text-gray-400">
                <span className="material-icons text-xl">calendar_today</span>
              </span>
              <DatePicker
                className="max-w-[75px] h-[40px]  text-sm rounded outline-none tranform translate-x-5"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                placeholderText="Ngày nhận"
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>
          <div className="min-h-[90px] ">
            <label className="text-black mb-2 block text-sm h-8">Ngày trả</label>
            <div className="relative w-full h-[42px] flex justify-center items-center  border border-gray-300 bg-white">
              <span className="absolute left-3 flex text-gray-400">
                <span className="material-icons text-xl">calendar_today</span>
              </span>
              <DatePicker
                className="max-w-[75px] h-[40px] text-sm rounded outline-none translate-x-5 py-2"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                placeholderText="Ngày trả"
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>

          <div className="min-h-[90px]">
            <label className="text-black mb-2 block text-sm h-8">Số phòng</label>
            <div className="relative h-[42px] flex justify-center items-center">
              <span className="absolute left-3 flex text-gray-400">
                <span className="material-icons text-[20px]">home</span>
              </span>
              <input
                type="number"
                className="w-full h-full px-2 pl-10 border border-gray-300 text-sm"
                value={roomSearchNumber}  
                min={1}
                onChange={(e) => setRoomSearchNumber(Number(e.target.value))}
              />
            </div>
          </div>

          {/* <div className="min-h-[90px]">
              <label className="text-white mb-2 block text-sm h-8">Mã khuyến mãi/Voucher</label>
              <div className="relative h-[42px] flex justify-center items-center">
                <span className="absolute left-3 flex justify-center items-center  text-gray-400">
                  <span className="material-icons text-[20px]">local_offer</span>
                </span>
                <input
                  type="text"
                  className="w-full h-full px-2 pl-10 rounded border border-gray-300 text-sm"
                  placeholder="Nhập mã khuyến mãi"
                />
              </div>
            </div> */}
          <div className="min-h-[90px] flex items-center justify-center pt-8 ">
            <button onClick={handleSearch} className="w-full h-[42px] bg-yellow-500 text-white hover:bg-yellow-600 flex items-center justify-center gap-2 text-sm font-medium">
              <span className="material-icons text-[20px]">search</span>
              TÌM KIẾM
            </button>
          </div>
        </div>
      </div>
      <div className="space-y-6 mt-5">
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex p-4">
          {/* Ảnh khách sạn */}
          <div className="relative w-1/4">
            <img
              src="https://booking.muongthanh.com/images/hotels/hotels/original/muong-thanh-luxury-ha-long-centre_1729839613.jpg"
              className="w-[300px] h-[200px] object-cover"
            />
          </div>

          {/* Thông tin khách sạn */}
          <div className="px-6 flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-black flex mb-2">
                {hotels?.name}
              </h2>
              <div className="flex mb-2 gap-2 items-end">
                <span className="material-icons text-gray-500">location_on</span>
                <p className="text-gray-500 text-sm">{hotels?.address} {hotels?.city} {hotels?.country} </p>
              </div>
              <div className="flex mb-2 gap-2 items-end">
                <span className="material-icons text-gray-500">phone</span>
                <p className="text-gray-500 text-sm">Điện thoại: 0909090909</p>
              </div>
              <div className='text-gray-700 text-sm items-start'>
                <p> Mường Thanh Luxury Hạ Long Centre như đôi cánh đại bàng vươn mình giữa Vịnh Hạ Long – nơi hai lần được UNESCO công nhận là di sản thiên nhiên thế giới. Mường Thanh Luxury Hạ Long Centre có kiến trúc độc đáo và quy Tọa lạc tại trung tâm du lịch Bãi Cháy, Mường Thanh Luxury Hạ Long Centre như đôi cánh đại bàng vươn mình giữa Vịnh Hạ Long – nơi hai lần được UNESCO công nhận là di sản thiên nhiên thế giới. Mường Thanh Luxury Hạ Long Centre có kiến trúc độc đáo và quy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-white rounded-lg shadow-md flex p-4 mt-5 '>
        <p>Vui lòng chọn phòng</p>
      </div>
      <div className='flex'>
        <div className='w-[70%] mt-5'>
          {roomType.map((room, index) => (
            <div key={room.roomTypeId} className="space-y-6 ">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="flex p-4">
                  {/* Ảnh khách sạn */}
                  <div className="relative w-2/5">
                    <img
                      src="https://booking.muongthanh.com/images/hotels/hotels/original/muong-thanh-luxury-ha-long-centre_1729839613.jpg"
                      className="w-[300px] h-[200px] object-cover"
                    />
                  </div>

                  {/* Thông tin khách sạn */}
                  <div className="flex flex-col items-start">
                    <div>
                      <h2 className="text-2xl font-semibold text-black flex mb-5">
                        {room.roomTypeName}
                      </h2>
                      <div className="flex mb-5">
                        <div className='flex gap-2 items-end'>
                          <span className="material-icons text-gray-500">location_on</span>
                          <p className="text-gray-500 text-sm">Tiểu khu 2</p>
                        </div>
                        <div className='flex gap-2 ml-5 items-end'>
                          <span className="material-icons text-gray-500">location_on</span>
                          <p className="text-gray-500 text-sm">Tiểu khu 2</p>
                        </div>
                      </div>
                      <div className="flex mb-2 gap-2">
                        <p className="text-sm cursor-pointer text-blue-500 underline">Xem tất cả tiện nghi </p>
                      </div>
                      <div className='flex  mt-10 justify-between'>
                        <p className='mr-20 text-xl text-yellow-500 font-bold'> Giá: {room.basePrice} VNĐ/đêm </p>
                        <button
                          className="bg-[#F2A900] text-white px-5 py-2 rounded hover:bg-blue-900 text-base"
                          onClick={() => toggleBookingDetails(room.roomTypeId)}
                        >
                          Chọn phòng
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Chi tiết đặt phòng với animation */}
                <div
                  className={`transition-all duration-1000 ease-in-out overflow-hidden ${showBookingDetails[room.roomTypeId] ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                  <div className="p-4 bg-white border-t border-gray-200">
                    <div className="space-y-4 py-8">
                      <div className="flex justify-between items-center">
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">Đã bao gồm ăn sáng</p>
                          <p className="text-sm text-gray-600">Không hoàn trả phí khi hủy phòng</p>
                        </div>
                        <div>
                          <span className="mr-2">2 Người lớn</span>
                        </div>
                        <div>
                          <p className="text-yellow-500 font-bold">1,971,000 VND / đêm</p>
                        </div>
                        <select onChange={(e) => handleRoomNumberChange(room.roomTypeId, e.target.value)} className="border rounded p-[7px] border-gray-400">
                          <option value={0}>0</option>
                          {Array.from({ length: room.totalRooms }).map((_, index) => (
                            <option key={index} value={index + 1}>Phòng {index + 1}</option>
                          ))}
                        </select>
                        
                      </div>
                    </div>
                  </div>
                  <div className='overflow-y-auto max-h-[300px]'>
                    {Array.from({ length: roomNumber[room.roomTypeId] }).map((_, index) => (
                      <div className='flex justify-around items-center py-4 bg-white border-t-2 border-gray-200 border-dashed  hover:bg-gray-100 '>
                        <p>Chọn số người phòng {index + 1}</p>
                        <div className='flex-col'>
                          <p className='mb-2 whitespace-nowrap'>Người lớn</p>
                          <select className='border border-black rounded p-1 min-w-[100px]'
                            defaultValue={1}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                          </select>
                        </div>
                        <div className='flex-col'>
                          <p className='mb-2 whitespace-nowrap'>Trẻ em (6-11 tuổi)</p>
                          <select className='border border-black rounded p-1 min-w-[100px]'
                            defaultValue={0}>
                            <option value={0}>0</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                          </select>
                        </div>
                        <div className='flex-col '>
                          <p className='mb-2 whitespace-nowrap'>Em bé (dưới 6 tuổi)</p>
                          <select className='border border-black rounded p-1 min-w-[100px]'
                            defaultValue={0}>
                            <option value={0}>0</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                          </select>
                        </div>
                        <button className=" bg-[#F2A900] text-white px-5 py-2 rounded hover:bg-blue-900">
                          Thêm phòng
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='w-[30%] mt-5 ml-5 flex flex-col'>
          <div className='bg-white rounded-lg shadow-md overflow-hidden p-5'>
            <p className='text-xl text-gray-700 font-semibold mb-3 mt-1'>Thông tin đặt phòng</p>
            <hr />
            <p className='text-lg text-gray-700 font-semibold mb-1 mt-2'>Mường Thanh Luxury Hạ Long Centre</p>
            <p className='text-gray-700 text-sm mb-3'>30/03/2025 - 31/03/2025</p>
            <hr />
            <p className='text-lg text-gray-700 font-semibold mb-2 mt-2'>Thông tin phòng</p>
            <hr />
            <div className='flex justify-between items-center mb-3 mt-2'>
              <p className='text-lg text-gray-700 font-semibold'>Tổng cộng</p>
              <p className='text-lg text-gray-700 font-semibold'>1,971,000 VND</p>
            </div>

            <button className='bg-[#F2A900] w-full h-[42px] text-white px-5 py-2 text-lg font-semibold rounded hover:bg-blue-900'>Đặt phòng</button>
          </div>
        </div>
        <div>
        </div>
      </div>

    </div>
  )
}

export default BookingPage