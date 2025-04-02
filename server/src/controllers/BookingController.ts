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
}

export default BookingController;   