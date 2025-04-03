import express, {Router,Request, Response} from 'express';
import AuthController from '@controllers/AuthController';
import HotelController from '@controllers/HotelController';
import BookingController from '@controllers/BookingController';
import {authMiddleware} from '@middleware/auth.middleware';

const router: Router = express.Router();
const authController = new AuthController();
const hotelController = new HotelController();
const bookingController = new BookingController();
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
router.get("/hotel/list", authMiddleware , (req, res) => {
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
export default router;

