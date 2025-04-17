import RoomService   from "@services/room.service";
import { Request, Response } from "express";

class RoomController {
    private roomService: RoomService;

    constructor(roomService: RoomService = new RoomService()) {
        this.roomService = roomService;
    }
    public async createRoomAmenities(req: Request, res: Response) {
        try {
        const {name, description} = req.body;
        const image = req.file;
        const roomAmenities = {name, description, image: image?.filename};
        console.log(roomAmenities);
        const result = await this.roomService.createRoomAmenities(roomAmenities);
        return res.status(200).json({roomAmenities: result});
        } catch (error) {
            return res.status(404).json({message: "Không tìm thấy tiện nghi phòng"});
        }
    }
    public async getRoomAmenities(req: Request, res: Response) {
        const result = await this.roomService.getRoomAmenities();
        return res.status(200).json({roomAmenities: result});
    }
    public async updateRoomAmenities(req: Request, res: Response) {
        const {id} = req.params;
        const {name, description} = req.body;
        const image = req.file;
        const roomAmenities = {name, description, image: image?.filename};
        console.log(roomAmenities);
        const result = await this.roomService.updateRoomAmenities(roomAmenities, id);
        return res.status(200).json({roomAmenities: result});
    }
    public async deleteRoomAmenities(req: Request, res: Response) {
        try{
            const {id} = req.params;
            console.log(id);
            const result = await this.roomService.deleteRoomAmenities(id);
            console.log(result);
            return res.status(200).json({roomAmenities: result});
        } catch (error) {
            return res.status(404).json({message: "Không tìm thấy tiện nghi phòng"});
        }
        
    }
    public async getRoomAmenitiesById(req: Request, res: Response) {
        const {id} = req.params;
        const result = await this.roomService.getRoomAmenitiesById(id);
        return res.status(200).json({roomAmenities: result});
    }
    // public async getRoomByHotelId(req: Request, res: Response) {
    //     const { hotelId } = req.params;
    //     const result = await this.roomService.getAllRoom(hotelId);
    //     return res.status(200).json({rooms: result});
    // }
    public async getRoomByHotelId(req: Request, res: Response) {
        const { hotelId } = req.params;
        const result = await this.roomService.getRoomByHotelId(hotelId);
        return res.status(200).json({rooms: result});
    }
    public async getRoomType(req: Request, res: Response) {
        const result = await this.roomService.getRoomType();
        return res.status(200).json({roomTypes: result});
    }
    public async createRoom(req: Request, res: Response) {
        const room = JSON.parse(req.body.room);
        const result = await this.roomService.createRoom(room);
        return res.status(200).json({room: result});
    }
    public async updateRoom(req: Request, res: Response) {
        const room = JSON.parse(req.body.room);

        const {id} = req.params;
        const result = await this.roomService.updateRoom(room, id);
        return res.status(200).json({room: result});
    }
    public async getRoomById(req: Request, res: Response) {
        const {id} = req.params;
        const result = await this.roomService.getRoomById(id);
        return res.status(200).json({room: result});
    }
    public async deleteRoom(req: Request, res: Response) {
        const {id} = req.params;
        const result = await this.roomService.deleteRoom(id);
        return res.status(200).json({room: result});
    }
    public async createRoomType(req: Request, res: Response) {
        const roomType = req.body;
        console.log(roomType);
        const image = req.file;
        roomType.image = image?.filename;
        const result = await this.roomService.createRoomType(roomType);
        return res.status(200).json({roomType: result});
    }
    public async deleteRoomType(req: Request, res: Response) {
        const {id} = req.params;
        const result = await this.roomService.deleteRoomType(id);
        return res.status(200).json({roomType: result});
    }
}

export default RoomController;

