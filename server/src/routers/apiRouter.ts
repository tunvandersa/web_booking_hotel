import express, {Router,Request, Response} from 'express';
import AuthController from '@controllers/AuthController';
import HotelController from '@controllers/HotelController';
import BookingController from '@controllers/BookingController';
import {authMiddleware} from '@middleware/auth.middleware';
import RoomController from '@controllers/RoomController';
const router: Router = express.Router();
const authController = new AuthController();
const hotelController = new HotelController();
const bookingController = new BookingController();
const roomController = new RoomController();
router.post('/signup', (req, res) => {
    authController.register(req, res);
});
router.post('/login', (req, res) => {
    authController.login(req, res);
});
router.get('/name*', (req, res) => {
    hotelController.getHotelByName(req, res);
});
router.get('/location*', (req, res) => {
    hotelController.getHotelByLocation(req, res);
});
router.get("/roomtype/:hotel_id", (req, res) => {
    hotelController.getRoomTypeByHotelId(req, res);
});
router.get("/booking/location", (req, res) => {
    bookingController.searchAvailableRooms(req, res);
});
router.get("/booking/hotel", (req, res) => {
    bookingController.searchRoomAvailableWithRoomType(req, res);
});
router.get("/hotel/list" , (req, res) => {
    hotelController.getAllHotel(req, res);
});
router.get("/user/info", (req, res) => {
    authController.getUserInfor(req, res);
});
router.post("/booking/addroom", (req, res) => {
    bookingController.addRoomToSession(req, res);
});
router.get("/booking/session", (req, res) => {
    req.session.destroy(function(err) {
        res.status(200).json({status: 'success', session: 'cannot access session here'})
           return;
    })
});

router.get("/booking/cksession", (req, res) => {
    if (req.session.booking) {
        res.status(200).json({ status: 'success', session: req.session.booking })
        return ;
    }
    res.status(404).json({ status: 'error', message: 'Không tìm thấy phiên đặt phòng.' })
    return ;
});
router.post("/booking/deleteroom", (req, res) => {
    bookingController.deleteRoomFromSession(req, res);
});
router.post("/booking/save", (req, res) => {
    bookingController.saveBooking(req, res);
});
router.post("/hotel/create", (req, res) => {
    hotelController.createHotel(req, res);
});
router.delete("/hotel/delete/:id", (req, res) => {
    hotelController.deleteHotel(req, res);
});
router.post("/room/createamenities", (req, res) => {
    roomController.createRoomAmenities(req, res);
});
router.get("/room/getroomamenities", (req, res) => {
    roomController.getRoomAmenities(req, res);
});
router.put("/room/updateamenities/:id", (req, res) => {
    roomController.updateRoomAmenities(req, res);
});
router.delete("/room/deleteamenities/:id", (req, res) => {
    roomController.deleteRoomAmenities(req, res);
});
router.post("/hotel/createamenitieshotel", (req, res) => {
    hotelController.createAmenityHotel(req, res);
});
router.put("/hotel/updateamenitieshotel/:id", (req, res) => {
    hotelController.updateAmenityHotel(req, res);
});
router.delete("/hotel/deleteamenitieshotel/:id", (req, res) => {
    hotelController.deleteAmenityHotel(req, res);
});
router.get("/hotel/getamenitieshotel", (req, res) => {
    hotelController.getAmenitiesHotel(req, res);
});
router.get("/room/getroomamenities/:id", (req, res) => {
    roomController.getRoomAmenitiesById(req, res);
});
router.get("/hotel/getamenitieshotelbyid/:id", (req, res) => {
    hotelController.getAmenitiesHotelById(req, res);
});
router.get("/hotel/gethotelbyid/:id", (req, res) => {
    hotelController.getHotelById(req, res);
});
router.put("/hotel/update/:id", (req, res) => {
    hotelController.updateHotel(req, res);
});
router.get("/room/getroombyhotelid/:hotelId", (req, res) => {
    roomController.getRoomByHotelId(req, res);
});
router.get("/room/getroomtype", (req, res) => {
    roomController.getRoomType(req, res);
});
router.post("/room/create", (req, res) => {
    roomController.createRoom(req, res);
});
router.put("/room/update/:id", (req, res) => {
    roomController.updateRoom(req, res);
});
router.get("/room/getroombyid/:id", (req, res) => {
    roomController.getRoomById(req, res);
});
router.delete("/room/delete/:id", (req, res) => {
    roomController.deleteRoom(req, res);
});
router.post("/room/createroomtype", (req, res) => {
    roomController.createRoomType(req, res);
});
router.delete("/room/deleteroomtype/:id", (req, res) => {
    roomController.deleteRoomType(req, res);
});
router.get("/booking/locationhotel", (req, res) => {
    bookingController.getlocalHotel(req, res);
});
router.post("/verify-email", (req, res) => {
    authController.verifyEmail(req, res);
    console.log("verify-email", req.body);
});
export default router;

