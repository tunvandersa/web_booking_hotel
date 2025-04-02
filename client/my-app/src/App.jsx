import { useState } from "react";
import BookingPage from "./pages/BookingPage";
import SearchPage from "./pages/SearchResults";
import Header from "./components/layout/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchBar from "./components/search/SearchBar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LoginPages from "./pages/LoginPages";
import SignUpPage from "./pages/SignUpPage";
import { AuthProvider } from "./components/hook/AuthContext";
import Layout from "./components/layout/Layout";
import LoginPage from "./pages/LoginPages"; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [count, setCount] = useState(0);

  const rooms = [
    { id: 1, name: "Phòng Deluxe Twin", size: "30m²", beds: "2 giường đơn", price: "700,000 VND", image: "/images/room1.jpg" },
    { id: 2, name: "Phòng Deluxe Triple", size: "30m²", beds: "3 giường đơn", price: "900,000 VND", image: "/images/room2.jpg" },
    { id: 3, name: "Phòng Deluxe Family Triple", size: "35m²", beds: "1 giường đơn, 1 giường đôi", price: "900,000 VND", image: "/images/room3.jpg" },
    { id: 4, name: "Phòng Superior King", size: "28m²", beds: "1 giường đôi", price: "800,000 VND", image: "/images/room4.jpg" },
    { id: 5, name: "Phòng Standard", size: "25m²", beds: "2 giường đơn", price: "600,000 VND", image: "/images/room5.jpg" },
    { id: 6, name: "Phòng Luxury Suite", size: "40m²", beds: "1 giường king", price: "1,200,000 VND", image: "/images/room6.jpg" }
  ];
  const [startIndex, setStartIndex] = useState(0);
  const visibleRooms = 3; // Số lượng phòng hiển thị cùng lúc

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1 < rooms.length - (visibleRooms - 1) ? prev + 1 : prev));
    console.log(startIndex);
  };

  const prevSlide = () => {
    setStartIndex((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
  };

  return (

    <BrowserRouter>
    <ToastContainer/>
  <AuthProvider>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<Layout />}>
        <Route path="/search" element={<SearchPage />} />
        <Route path="/hotel" element={<BookingPage />} />
        <Route path="/booking" element={<BookingPage />} />
      </Route>
    </Routes>
  </AuthProvider>
</BrowserRouter>
    //   <BrowserRouter>
    //   <Routes>
    //     <Route path="/search" element={<SearchPage/>} />
    //     <Route path="/hotel" element={<BookingPage />} />
    //     <Route path="/booking" element={<BookingPage />} />
    //   </Routes>
    // </BrowserRouter>
    //   <div className="relative w-full overflow-hidden">
    //   <div className="flex gap-6 duration-500" style={{ transform: `translateX(-${startIndex * 33.3}%)` }}>
    //     {rooms.map((room) => (
    //       <div key={room.id} className="min-w-[33.3%] bg-white rounded-lg shadow-md overflow-hidden">
    //         <img src={room.image} alt={room.name} className="w-full h-48 object-cover" />
    //         <div className="p-4">
    //           <h3 className="text-lg font-semibold">{room.name}</h3>
    //           <p className="text-gray-500 flex items-center">📏 {room.size} &nbsp; 🛏 {room.beds}</p>
    //           <p className="text-yellow-500 font-bold mt-2">Chỉ từ {room.price} /đêm</p>
    //           <button className="mt-3 bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700">Đặt ngay</button>
    //         </div>
    //       </div>
    //     ))}
    //   </div>

    //   {/* Nút điều hướng */}
    //   <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white">
    //     <ChevronLeft />
    //   </button>
    //   <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white">
    //     <ChevronRight />
    //   </button>
    // </div>
  );
}

export default App;
