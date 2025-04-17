import BookingService from "@services/booking.service";
import { Request, Response } from "express";
import {Users} from "@entities/Users"
import jwt from "jsonwebtoken";
import { AppDataSource } from "@databases/data.source";

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface DecodedToken {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}
const userRepository = AppDataSource.getRepository(Users);
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

        if (!checkin || isNaN(Date.parse(checkin as string))) {
          return res.status(400).json({ message: "Ngày checkin không hợp lệ" });
        }
        
        if (!checkout || isNaN(Date.parse(checkout as string))) {
          return res.status(400).json({ message: "Ngày checkout không hợp lệ" });
        }
        
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
            const { hotelId, hotelName, checkIn, checkOut, index, roomTypeId, roomTypeName, price, guests } = req.body;
            console.log("req.body", req.body);
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
                console.log("SessionBooking", req.session.booking);
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
    public async saveBooking(req: Request, res: Response) {
        
        try {
            if(!req.session.booking) {
                return res.status(400).json({message: "Không tìm thấy session"});
            }
           const userToken = req.cookies.accessToken;
           const decoded = jwt.verify(userToken, JWT_SECRET) as DecodedToken;
           const userId = decoded.id;
           const user = await userRepository.findOne({where: {id: Number(userId)}});
           console.log("user", user);
           if(!user) {
            return res.status(400).json({message: "Không tìm thấy user"});
           }
            const booking = await this.bookingService.saveBooking(req.session.booking, user);
            return res.status(200).json({message: "Đã lưu booking thành công", booking});
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }
    public async getlocalHotel(req: Request, res: Response) {
        try {
            const local = await this.bookingService.getlocalHotel();
            return res.status(200).json({local});
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }
    
}

export default BookingController;   