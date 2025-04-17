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
    
    public async createHotel(req: Request, res: Response) {
        try {
            const hotel =  JSON.parse(req.body.hotel);
            console.log(hotel);
            const image = req.file;
            hotel.image = image?.filename;
            console.log(hotel);
            const result = await this.hotelService.createHotel(hotel);
            return res.status(200).json({hotel: result});
        } catch (error) {
            return res.status(404).json({message: "Không tìm thấy khách sạn"});
        }       
    }
    public async createAmenityHotel(req: Request, res: Response) {
        try {
            const amenity = req.body;
            const result = await this.hotelService.createAmenityHotel(amenity);
            return res.status(200).json({amenity: result});
        } catch (error) {
            return res.status(404).json({message: "Không tìm thấy tiện nghi khách sạn"});
        }
    }
    public async updateAmenityHotel(req: Request, res: Response) {
        try {
            const amenity = req.body;
            const {id} = req.params;
            const result = await this.hotelService.updateAmenityHotel(amenity, id);
            return res.status(200).json({amenity: result});
        } catch (error) {
            return res.status(404).json({message: "Không tìm thấy tiện nghi khách sạn"});
        }
    }
    public async deleteAmenityHotel(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const result = await this.hotelService.deleteAmenityHotel(id); 
            return res.status(200).json({amenity: result});
        } catch (error) {
            return res.status(404).json({message: "Không tìm thấy tiện nghi khách sạn"});
        }
    }
    public async getAmenitiesHotel(req: Request, res: Response) {
        try {
            const result = await this.hotelService.getAmenitiesHotel();
            return res.status(200).json({amenitiesHotel: result});
        } catch (error) {
            return res.status(404).json({message: "Không tìm thấy tiện nghi khách sạn"});
        }
    }
    public async getAmenitiesHotelById(req: Request, res: Response) {
        const {id} = req.params;
        const result = await this.hotelService.getAmenitiesHotelById(id);
        return res.status(200).json({hotelAmenities: result});
    }
    public async deleteHotel(req: Request, res: Response) {
        const {id} = req.params;
        const result = await this.hotelService.deleteHotel(id);
        return res.status(200).json({hotel: result});
    }
    public async getHotelById(req: Request, res: Response) {
        const {id} = req.params;
        const result = await this.hotelService.getHotelById(id);
        return res.status(200).json({hotel: result});
    }
    public async updateHotel(req: Request, res: Response) {
        const {id} = req.params;
        const image = req.file;
        const hotel = JSON.parse(req.body.hotel);
        hotel.image = image?.filename;
        const result = await this.hotelService.updateHotel(hotel, id);
        return res.status(200).json({hotel: result});
    }
}
export default HotelController;
