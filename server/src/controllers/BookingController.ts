import BookingService from "@services/booking.service";
import { Request, Response } from "express";

class BookingController {
    private bookingService: BookingService;

    constructor(bookingService: BookingService = new BookingService()) {
        this.bookingService = bookingService;
    }

    public async searchAvailableRooms(req: Request, res: Response) {
        const { city, checkin, checkout, roomNumber } = req.query;
        
        const searchParams = {
            city: city as string,
            checkin: checkin as string,
            checkout: checkout as string,
            roomNumber: roomNumber as string,
        };
        console.log(searchParams);
        try {
            const AvailableRooms = await this.bookingService.searchAvailableRooms(searchParams);
            if(AvailableRooms.length === 0) {
                return res.status(200).json({message: "Không tìm thấy phòng trống", AvailableRooms: []});
            }
            return res.status(200).json({AvailableRooms});
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
        
    }  
    public async searchRoomAvailableWithRoomType(req: Request, res: Response) {
        const { hotelid, checkin, checkout, roomNumber } = req.query;
        const searchParams = {
            hotelid: hotelid as string,
            checkin: new Date(checkin as string).toISOString().split("T")[0],
            checkout: new Date(checkout as string).toISOString().split("T")[0],
            roomNumber: roomNumber as string,
        };
        console.log(searchParams);
        try{
            const data = await this.bookingService.searchRoomAvailableWithRoomType(searchParams);
            
            if(!data) {
                return res.status(200).json({message: "Không tìm thấy phòng trống", data: []});
            }
            
            return res.status(200).json(data);
            
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }
    public async getHotelById(req: Request, res: Response) {
        const { hotelid } = req.query;
        try {
            const hotel = await this.bookingService.getHotelById(hotelid as string);
            return res.status(200).json({hotel});
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }
    public async addRoomToSession(req: Request, res: Response) {
        try {
            const { hotelId, hotelName, checkIn, checkOut, roomNumber, index, roomTypeId, roomTypeName, price, guests } = req.body;
        
            // Nếu session chưa tồn tại, tạo mới
            if (!req.session.booking) {
                req.session.booking = {
                    hotel: {
                        id: hotelId,
                        name: hotelName,
                    },
                    checkIn: new Date(checkIn),
                    checkOut: new Date(checkOut),
                    rooms: [
                        {
                            index,
                            roomTypeId,
                            roomTypeName,
                            roomNumber,
                            price,
                            guests,
                        }
                    ],
                    totalPrice: 0,
                    extraAdultPrice: 0,
                    extraChildPrice: 0,
                    createdAt: new Date(),
                    expiresAt: new Date(Date.now() + 15 * 60 * 1000) // 15 phút
                };
                const result = await this.bookingService.calculateTotalPrice(req.session.booking);
                req.session.booking.totalPrice = result.totalPrice;
                req.session.booking.extraAdultPrice = result.extraAdultPrice;
                req.session.booking.extraChildPrice = result.extraChildPrice;
                req.session.save();
                console.log(req.session.booking);
            }
            if(req.session.booking) {
                // Kiểm tra xem phòng đã tồn tại hay chưa
                const existingRoomIndex = req.session.booking.rooms.findIndex(
                    (room) => room.index === index && room.roomTypeId === roomTypeId
                );
                console.log(existingRoomIndex);
        
                const newRoom = {
                    index,
                    roomTypeId,
                    roomTypeName,
                    roomNumber,
                    price,
                    guests,
                };
                if (existingRoomIndex !==-1) {
                    // Nếu phòng đã tồn tại, thay thế
                    req.session.booking.rooms[existingRoomIndex] = newRoom;
                    const result = await this.bookingService.calculateTotalPrice(req.session.booking);
                    req.session.booking.totalPrice = result.totalPrice;
                    req.session.booking.extraAdultPrice = result.extraAdultPrice;
                    req.session.booking.extraChildPrice = result.extraChildPrice;
                    console.log(` Đã cập nhật phòng có index=${index} và roomTypeId=${roomTypeId}`);
                } else {
                    // Nếu chưa có, thêm mới vào danh sách phòng
                    req.session.booking.rooms.push(newRoom);
                    const result = await this.bookingService.calculateTotalPrice(req.session.booking);
                    req.session.booking.totalPrice = result.totalPrice;
                    req.session.booking.extraAdultPrice = result.extraAdultPrice;
                    req.session.booking.extraChildPrice = result.extraChildPrice;
                    console.log(`Đã thêm phòng mới với index=${index} và roomTypeId=${roomTypeId}`);
                }
                req.session.save();
                console.log(req.session.booking);
                return res.status(200).json({message: "Thêm phòng thành công", booking: req.session.booking});
            }
        } catch (error) {
            console.error("Lỗi xử lý session:", error);
            res.status(500).json({ message: "Lỗi server" });
        }        
    }
    public async deleteRoomFromSession(req: Request, res: Response) {
        const { index, roomTypeId } = req.body;
        try {
            if(!req.session.booking) {
                return res.status(400).json({message: "Không tìm thấy session"});
            }
            const existingRoomIndex = req.session.booking.rooms.findIndex(
                (room) => room.index === index && room.roomTypeId === roomTypeId
            );
            if(existingRoomIndex !== -1) {
                req.session.booking.rooms.splice(existingRoomIndex, 1);
                const result = await this.bookingService.calculateTotalPrice(req.session.booking);
                req.session.booking.totalPrice = result.totalPrice;
                req.session.booking.extraAdultPrice = result.extraAdultPrice;
                req.session.booking.extraChildPrice = result.extraChildPrice;
                req.session.save();
                return res.status(200).json({message: "Đã xóa phòng thành công", booking: req.session.booking});
            }
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }
}

export default BookingController;   