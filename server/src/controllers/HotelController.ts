import HotelService from "@services/hotel.service";
import { Request, Response } from "express";

class HotelController {
    private hotelService: HotelService;

    constructor( hotelService: HotelService = new HotelService()) {
        this.hotelService = hotelService;
    }
    public async getAllHotel(req: Request, res: Response) {
        try {
            const result = await this.hotelService.getAllHotel();
            return res.status(200).json({hotel: result});
        } catch (error) {
            return res.status(404).json({message: "Không tìm thấy khách sạn"});
        }
    }
    public async getHotelByName(req: Request, res: Response) {
        const pathUrl = req.path;
        console.log(pathUrl);
        const result = await this.hotelService.getHotelByName(pathUrl);
        
        if(result != null)
        {
            return res.status(200).json({hotel: result});
        }else{
            return res.status(404).json({message: "Không tìm thấy khách sạn"});
        }
    }
    public async getHotelByLocation(req: Request, res: Response) {
        const pathUrl = req.path;
        console.log(pathUrl);
        const result = await this.hotelService.getHotelByLocation(pathUrl);
        
        if(result.length != 0 )
        {
            return res.status(200).json({hotel: result});
        }else{
            return res.status(404).json({message: "Không tìm thấy khách sạn"});
        }
    }

    public async getRoomTypeByHotelId(req: Request, res: Response) {
        const data = req.params;
        console.log(data);
        const result = await this.hotelService.getRoomTypeByHotelId(data);
        
        if(result[0] !=  null)
        {
            return res.status(200).json({roomtype: result});
        }else{
            return res.status(404).json({message: "Không tìm thấy loại phòng"});
        }
    }
}

export default HotelController;
