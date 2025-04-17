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
import Navbar from "./components/layout/Navbar";
import ListHotel from "./pages/Hotel/ListHotel";
import CreateHotel from "./pages/Hotel/CreateHotel";
import ModalRoom from "./components/room/ModalRoom";
import AddAmenitiesHotel from "./pages/Hotel/addAmenitiesHotel";
import AmenitiesHotelList from "./pages/Hotel/listAmenitiesHotel";
import EditAmenitiesHotel from "./pages/Hotel/editAmenitiesHotel";

import AddAmenitiesRoomType from "./pages/RoomType/addAmenitiesRoomType";
import AmenitiesRoomTypesList from "./pages/RoomType/AmenitiesRoomTypesList";
import EditAmenitiesRoomType from "./pages/RoomType/editAmenitiesRoom";
import UpdateHotel from "./pages/Hotel/updateHotel";
import { HotelProvider } from "./components/hook/HotelContext";
import ListRoom from "./pages/Room/ListRoom";
import CreateRoom from "./pages/Room/createRoom";
import UpdateRoom from "./pages/Room/updateRoom";
import ListRoomType from "./pages/RoomType/listRoomType";
import CreateRoomType from "./pages/RoomType/createRoomType";
import { useAuth } from "./components/hook/AuthContext";
import { Navigate } from "react-router-dom";
import AdminLayout from "./components/layout/adminLayout";
import VerifyEmail from "./pages/veryfyemail";
function App() {
  const { user } = useAuth();
  console.log(user);
  return (
      <BrowserRouter>
          <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/" element={<Layout />}>
          <Route path="/search" element={<SearchPage />} />
          <Route path="/hotel" element={<BookingPage />} />
          <Route path="/booking" element={<BookingPage />} />
          </Route>
        
        <Route path="" element={<AdminLayout />}>
          <Route path="hotels" element={<ListHotel />} />
          <Route path="hotels/add" element={<CreateHotel />} />
          <Route path="amenities-room-types/add" element={<AddAmenitiesRoomType />} />
          <Route path="amenities-room-types" element={<AmenitiesRoomTypesList />} />
          <Route path="amenities-room-types/edit/:id" element={<EditAmenitiesRoomType />} />
          <Route path="amenities-hotel/add" element={<AddAmenitiesHotel />} />
          <Route path="amenities-hotel" element={<AmenitiesHotelList />} />
          <Route path="amenities-hotel/edit/:id" element={<EditAmenitiesHotel />} />
          <Route path="hotels/edit/:id" element={<UpdateHotel />} />
          <Route path="rooms" element={<ListRoom />} />
          <Route path="rooms/add" element={<CreateRoom />} />
          <Route path="rooms/edit/:id" element={<UpdateRoom />} />
          <Route path="room-types" element={<ListRoomType />} />
          <Route path="room-types/add" element={<CreateRoomType />} />
        </Route>
        </Routes>
    </BrowserRouter>

  );
}

export default App;
