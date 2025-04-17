import { Hotels } from "@entities/Hotels";
import { AppDataSource } from "@databases/data.source";
import { Like } from "typeorm";
import { RoomImages } from "@entities/RoomImages";
import { RoomTypes } from "@entities/RoomTypes";
import { Rooms } from "@entities/Rooms";
import { RoomAmenities } from "@entities/RoomAmenities";
import { RoomAmenityMapping } from "@entities/RoomAmenityMapping";
const roomRepository = AppDataSource.getRepository(Rooms);
const roomTypeRepository = AppDataSource.getRepository(RoomTypes);
const roomAmenitiesRepository = AppDataSource.getRepository(RoomAmenities);
const roomTypeImageRepository = AppDataSource.getRepository(RoomImages);
class RoomService {
    public async createRoomAmenities(roomAmenities: RoomAmenities): Promise<any> {
        try {
            const newRoomAmenities = await roomAmenitiesRepository.save(roomAmenities);
            return newRoomAmenities;
        } catch (error) {
            return error;
        }
    }
    public async getRoomAmenities(): Promise<any> {
        try {
            const roomAmenities = await roomAmenitiesRepository.find({
                where: {
                  isActive: true, // hoặc 1 tùy vào kiểu dữ liệu
                },
              });
            return roomAmenities;
        } catch (error) {
            return error;   
        }
    }
    public async updateRoomAmenities(roomAmenities: RoomAmenities, id: string): Promise<any> {
        try {
        
            const updatedRoomAmenities = await roomAmenitiesRepository.update(id, roomAmenities);
            console.log(updatedRoomAmenities);
            return updatedRoomAmenities;
        } catch (error) {
            return error;
        }
    }
    public async deleteRoomAmenities(id: string): Promise<any> {
        try {
            const deletedRoomAmenities = await roomAmenitiesRepository.update(id, {isActive: false});
            console.log(deletedRoomAmenities);
            return deletedRoomAmenities;
        } catch (error) {
            return error;   
        }
    }
    public async getRoomAmenitiesById(id: string): Promise<any> {
        try {
            const roomAmenities = await roomAmenitiesRepository.findOne({where: {id}});
            return roomAmenities;
        } catch (error) {
            return error;
        }
    }
    public async getRoomByHotelId(hotelId: string): Promise<any> {
        try {
            const rooms = await roomRepository
                .createQueryBuilder('room')
                .leftJoinAndSelect('room.roomType', 'roomType')
                .where('room.hotelId = :hotelId', { hotelId })
                .andWhere('room.isActive = :isActive', { isActive: true })
                .select([
                    'room.id',
                    'room.roomNumber',
                    'roomType.id',
                    'roomType.name',
                    'room.floor',
                    'roomType.basePrice',
                    'room.status',
                ])
                .getMany();

                return rooms;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách phòng:', error);
            return error;
        }
    }
    public async getAllRoom(hotelId: string): Promise<any> {
        try {
            const rooms = await roomRepository.find({where: {hotelId: hotelId, isActive: true }});
            return rooms;
        } catch (error) {
            return error;
        }
    }
    public async getRoomType(): Promise<any> {
        try {
            const roomTypes = await roomTypeRepository.find({where: {isActive: true}});
            return roomTypes;
        } catch (error) {
            return error;
        }     
    }
    public async createRoom(room: any): Promise<any> {
        try {
            console.log(room);
            const newRoom = await roomRepository.save(room);
            return newRoom;
        } catch (error) {
            return error;           
        }
    }
    public async updateRoom(room: any, id: string): Promise<any> {
        try {
            console.log(room);
            const updatedRoom = await roomRepository.update(id, room);
            return updatedRoom;
        } catch (error) {
            return error;
        }
    }
    public async getRoomById(id: string): Promise<any> {
        try {
            const room = await roomRepository.findOne({where: {id}});
            return room;
        } catch (error) {
            return error;
        }   
    }
    public async deleteRoom(id: string): Promise<any> {
        try {
            const deletedRoom = await roomRepository.update(id, {isActive: false});
            return deletedRoom;
        } catch (error) {
            return error;
        }
    }
    public async createRoomType(roomType: any): Promise<any> {
        try {
            console.log(roomType);
            const newRoomType = {
                name: roomType.name,
                description: roomType.description,
                capacity: roomType.capacity,
                basePrice: roomType.basePrice,
                sizeSqm: roomType.sizeSqm,
            };
            const result = await roomTypeRepository.save(newRoomType);
            await roomTypeImageRepository.save({roomTypeId: result.id, image: roomType.image});
            return result;
        } catch (error) {   
            return error;
        }
    }
    public async deleteRoomType(id: string): Promise<any> {
        try {
            const deletedRoomType = await roomTypeRepository.update(id, {isActive: false});
            return deletedRoomType;
        } catch (error) {
            return error;
        }
    }
}

export default  RoomService;
