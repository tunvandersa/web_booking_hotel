// pages/SearchResults.js
// import Header from "../components/layout/Header";
// import SearchBar from "../components/search/SearchBar";
// import HotelList from "../components/hotel/HotelList";
// const SearchResults = () => {  
//     return (
//       <div className="bg-gray-100">
//         <Header />
//         <SearchBar />
//       </div>
//     );
//   };
//   export default SearchResults;

import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import SearchBar from "../components/search/SearchBar";
import HotelSearchCard from "../components/hotel/HotelSearchCard";
import Layout from "../components/layout/Layout";
const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(searchParams.get("checkin") ? new Date(searchParams.get("checkin")) : null);
  const [endDate, setEndDate] = useState(searchParams.get("checkout") ? new Date(searchParams.get("checkout")) : null);
  const [location, setLocation] = useState(searchParams.get("city") || "");
  const [roomSearchNumber, setRoomSearchNumber] = useState(searchParams.get("roomNumber") || 1);
  const [hotels, setHotels] = useState([]);

  const formatDate = (date) => {
    if (!date) return "";
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const handleSearch = async () => {
    try {
      const params = new URLSearchParams();

      if (location) params.append("city", location);
      if (startDate) params.append("checkin", formatDate(startDate));
      if (endDate) params.append("checkout", formatDate(endDate));
      if (roomSearchNumber) params.append("roomNumber", roomSearchNumber.toString());

      const response = await axios.get(`http://localhost:3000/api/v1/booking/location?${params.toString()}`, {
        headers: { "Content-Type": "application/json" }
      });

      const availableHotels = response.data.AvailableRooms || [];
      if (availableHotels.length === 0) {
        alert("Không tìm thấy phòng trống");
        setHotels([]);
      } else {
        setHotels(availableHotels);
      }
      navigate(`/search?${params.toString()}`);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách phòng khả dụng:", error);
      setHotels([]);
    }
  };

  const handleDetailHotel = (hotelId) => {
    const params = new URLSearchParams();

    if (hotelId) params.append("hotelid", hotelId);
    if (startDate) params.append("checkin", formatDate(startDate));
    if (endDate) params.append("checkout", formatDate(endDate));
    if (roomSearchNumber) params.append("roomNumber", roomSearchNumber.toString());
    navigate(`/booking?${params.toString()}`);
  }

  useEffect(() => {
    if (location && startDate && endDate && roomSearchNumber) {
      handleSearch();
    }
  }, []);
  return (
<div>
<SearchBar 
        location={location} setLocation={setLocation}
        startDate={startDate} setStartDate={setStartDate}
        endDate={endDate} setEndDate={setEndDate}
        roomSearchNumber={roomSearchNumber} setRoomSearchNumber={setRoomSearchNumber}
        handleSearch={handleSearch}
      />
      <div className="mt-6 space-y-6">
        <HotelSearchCard hotels={hotels} handleDetailHotel={handleDetailHotel} />
      </div>
</div>
      

  );
};

export default SearchPage;
