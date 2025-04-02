import { Hotels } from "@entities/Hotels";
import { AppDataSource } from "@databases/data.source";
import { Like } from "typeorm";
import { RoomImages } from "@entities/RoomImages";
import { RoomTypes } from "@entities/RoomTypes";
import { Rooms } from "@entities/Rooms";


const hotelRepository = AppDataSource.getRepository(Hotels);
const roomImagesRepository = AppDataSource.getRepository(RoomImages);
const roomTypeRepository = AppDataSource.getRepository(RoomTypes);
const roomRepository = AppDataSource.getRepository(Rooms);
class HotelService {
    public async getAllHotel(): Promise<any> {
        try {
            const hotel = await hotelRepository.find();
            return hotel;
        } catch (err) {
            return err;
        }
    }
    public async getHotelByName(url: string): Promise<any> {
        try {
            const hotelName = url.split('/name/').join('');
            const stringQuery = hotelName.split('-').join(' ');

            const hotel = await hotelRepository
                .createQueryBuilder("hotel")
                .leftJoinAndSelect("hotel.hotelAmenityMappings", "hotelAmenityMapping") 
                .leftJoinAndSelect("hotelAmenityMapping.amenity", "amenity")
                .select([
                    "hotel.id",
                    "hotel.name",
                    "hotel.description",
                    "hotel.address",
                    "hotel.city",
                    "hotel.country",
                    "hotel.check_in_time",
                    "hotel.check_out_time",
                    `JSON_ARRAYAGG(JSON_OBJECT('id', amenity.id, 'name', amenity.name)) AS amenities`, // Trả về danh sách tiện nghi dưới dạng JSON
                ])
                .where("hotel.name = :name", { name: stringQuery })
                .groupBy("hotel.id")
                .getRawMany();

            return hotel;
        } catch (err) {
            return err;
        }
    }

    public async getAllRoomByHotelId(hotelId: number): Promise<any> {

    }

    // public async getRoomTypeByHotelId(hotelId: number): Promise<any> {
    //     try {
    //         const roomType = await roomTypeRepository
    //             .createQueryBuilder("roomType")
    //             .innerJoin("roomType.rooms", "room") // Join với bảng Rooms để lọc theo hotel_id
    //             .leftJoin("roomType.roomImages", "image") // Lấy ảnh chính
    //             .where("room.hotel_id = :hotelId", { hotelId: hotelId })
    //             .select([
    //                 "roomType.id",
    //                 "roomType.name",
    //                 "roomType.basePrice",
    //                 "roomType.sizeSqm",
    //                 "image.imageUrl",
    //                 "image.isPrimary",
    //             ])
    //             .getMany();

    //         return roomType;
    //     } catch (error) {
    //         return error;
    //     }
    // }

    public async getHotelByLocation(url: string): Promise<any> {
        try {
            const location = url.split('/location/').join('');

            const stringQuery = location.split('-').join(' ');

            const hotel = await hotelRepository.find({
                where: {
                    city: stringQuery, // Điều kiện tìm kiếm
                },
            });

            return hotel;
        } catch (err) {
            return err;
        }

    }



    public async getRoomTypeByHotelId(hotelId: any): Promise<any> {
        try {
            const hotel_id = hotelId.hotel_id;
            console.log(hotel_id);
            const roomtype = await roomTypeRepository
                .createQueryBuilder("roomType")
                .innerJoin("roomType.rooms", "room") // Join với bảng Rooms để lọc theo hotel_id
                .leftJoin("roomType.roomImages", "image") // Lấy ảnh chính
                .where("room.hotelId = :hotelId", { hotelId: hotel_id })
                .select([
                    "room.hotelId",
                    "roomType.id",
                    "roomType.name",
                    "roomType.basePrice",
                    "roomType.sizeSqm",
                    `JSON_ARRAYAGG(JSON_OBJECT('imageUrl', image.imageUrl, 'is_primary', image.isPrimary)) AS image`,
                ])
                .groupBy("roomType.id, room.hotelId")
                .getRawMany();
                return roomtype;
        } catch (error) {
            return error;
        }
    }

    public async getAmenityByRoomTypeId(roomTypeId: any): Promise<any> {
        try {
            const room_type_id = roomTypeId;
            const amenities = await roomTypeRepository
                .createQueryBuilder("roomType")
                .leftJoinAndSelect("roomType.roomAmenityMappings", "roomAmenityMapping")
                .leftJoinAndSelect("roomAmenityMapping.amenity", "amenity")
                .select([
                    "roomType.id",
                    "roomType.name",
                    `JSON_ARRAYAGG(JSON_OBJECT('id', amenity.id, 'name', amenity.name)) AS amenities`, // Trả về danh sách tiện nghi dưới dạng JSON
                ])
                .where("roomType.id = :roomTypeId", { roomTypeId : room_type_id })
                .getRawMany();

            return amenities;
        } catch (error) {
            return error;
        }
    }

}

export default HotelService;