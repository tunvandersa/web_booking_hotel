import { AppDataSource } from "@databases/data.source";
import { Hotels } from "@entities/Hotels";
import { Rooms } from "@entities/Rooms";

const roomRepository = AppDataSource.getRepository(Rooms);
const hotelRepository = AppDataSource.getRepository(Hotels);

interface BookingSession {
    hotel: {
      id: string;
      name: string;
      address: string;
      city: string;
      country: string;
    };
    checkIn: Date;
    checkOut: Date;
    rooms: {
      roomTypeId: string;
      roomTypeName: string;
      numberOfRooms: number;
      guests: {
        adults: number;
        children: number;
        infants: number;
      }[];
      price: number;
    }[];
    totalAmount: number;
    createdAt: Date;
    expiresAt: Date;
  }

class BookingService {
    public async searchAvailableRooms(searchParams: {
        city: string;
        checkin: string;
        checkout: string;
        roomNumber: string;
    }) {
        try {
            console.log(searchParams);
            const unAvaliablerooms = await roomRepository
                .createQueryBuilder("r")
                .innerJoin("r.hotel", "h")  // Join với bảng hotels
                .innerJoin("r.bookings", "b")  // Join với bảng bookings
                .innerJoin("h.location", "l")
                .where("l.id = :city", { city: searchParams.city })
                .andWhere(
                    `(:checkin < b.check_out_date AND :checkout > b.check_in_date)`,
                    { checkin: searchParams.checkin, checkout: searchParams.checkout }
                )
                .getMany();


            console.log(unAvaliablerooms);
            const bookedRoomIdList = unAvaliablerooms.map(room => room.id);
            let query = roomRepository
                .createQueryBuilder("room")
                .innerJoin("room.hotel", "hotel")
                .innerJoin("room.roomType", "roomType")
                .where("hotel.locationId = :city", { city: searchParams.city });

            if (bookedRoomIdList.length > 0) {
                query.andWhere("room.id NOT IN (:...bookedRoomIds)", { bookedRoomIds: bookedRoomIdList });
            }

            const availableRooms = await query
                .select("hotel.id", "hotelId")
                .addSelect("hotel.name", "hotelName")
                .addSelect("hotel.city", "city")
                .addSelect("hotel.country", "country")
                .addSelect("hotel.address", "address")
                .addSelect("COUNT(room.id)", "totalRooms")
                .addSelect("MIN(roomType.basePrice)", "minPrice")
                .groupBy("hotel.id, hotel.name, hotel.city, hotel.country, hotel.address")
                .having("totalRooms >= :roomNumber", { roomNumber: searchParams.roomNumber })  // Kiểm tra số phòng đủ
                .getRawMany();

            return availableRooms;
        } catch (error: any) {
            throw new Error("Lỗi khi tìm phòng trống:" + error.message);
        }
    }
    public async searchRoomAvailableWithRoomType(searchParams: {
        hotelid: string;
        checkin: string;
        checkout: string;
        roomNumber: string;
    }) {
        try {
            // Lấy danh sách phòng đã được đặt
            const unAvaliablerooms = await roomRepository
                .createQueryBuilder("r")
                .innerJoin("r.hotel", "h")
                .innerJoin("r.bookings", "b")
                .where("h.id = :id", { id: searchParams.hotelid })
                .andWhere(
                    `(:checkin < b.check_out_date AND :checkout > b.check_in_date)`,
                    { checkin: searchParams.checkin, checkout: searchParams.checkout }
                )
                .getMany();
            
            const bookedRoomIds = unAvaliablerooms.length > 0 ? unAvaliablerooms.map(room => room.id) : [];

            // Query để lấy thông tin phòng và ảnh
            const query = roomRepository
                .createQueryBuilder("room")
                .innerJoin("room.hotel", "hotel")
                .innerJoin("room.roomType", "roomType")
                .leftJoin("roomType.roomImages", "roomImages") // Thêm join với bảng ảnh
                .select("roomType.id", "roomTypeId")
                .addSelect("roomType.name", "roomTypeName")
                .addSelect("COUNT(DISTINCT room.id)", "totalRooms")
                .addSelect("roomType.basePrice", "basePrice")
                .addSelect("GROUP_CONCAT(DISTINCT room.id)", "roomIds")
                .addSelect("GROUP_CONCAT(DISTINCT roomImages.imageUrl)", "imageUrls") // Gộp các URL ảnh
               //.addSelect("roomType.description", "description") // Thêm mô tả nếu có
                //.addSelect("roomType.capacity", "capacity") // Thêm sức chứa nếu có
                //.addSelect("roomType.amenities", "amenities") // Thêm tiện nghi nếu có
                .groupBy("roomType.id, roomType.name, roomType.basePrice");

            if (bookedRoomIds.length > 0) {
                query.andWhere("room.id NOT IN (:...bookedRoomIds)", { bookedRoomIds });
            }
            if (searchParams.hotelid) {
                query.andWhere("hotel.id = :id", { id: searchParams.hotelid });
            }

            const rawResults = await query.getRawMany();

            const totalAvailableRooms = rawResults.reduce((sum, room) => sum + Number(room.totalRooms), 0);

            if(totalAvailableRooms > Number(searchParams.roomNumber)) {
                const availableRooms = rawResults.map(room => ({
                    roomTypeId: room.roomTypeId,
                    roomTypeName: room.roomTypeName,
                    totalRooms: Number(room.totalRooms),
                    basePrice: room.basePrice,
                    availableRoomIds: room.roomIds ? room.roomIds.split(',').map(Number) : [],
                    images: room.imageUrls ? 
                        [...new Set(room.imageUrls.split(','))] : // Loại bỏ các URL trùng lặp
                        []
                }));
                const hotel = await this.getHotelById(searchParams.hotelid);
                return {
                    availableRooms,
                    hotel
                };
            }else{
                return { availableRooms: [], hotel: null };
            }
        } catch (error: any) {
            throw new Error("Lỗi khi tìm phòng trống:" + error.message);
        }
    }
    public async getHotelById(hotelId: string) {
        const hotel = await hotelRepository.findOne({ where: { id: hotelId } });
        return hotel;
    }
    public async addRoomToSession() {
        
    }

    
}
export default BookingService;