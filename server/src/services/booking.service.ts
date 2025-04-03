import { AppDataSource } from "@databases/data.source";
import { Hotels } from "@entities/Hotels";
import { Rooms } from "@entities/Rooms";
import { BookingSession } from "../interface/iBookingSession";

const roomRepository = AppDataSource.getRepository(Rooms);
const hotelRepository = AppDataSource.getRepository(Hotels);

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
                .innerJoin("r.bookingDetails", "b")  // Join với bảng bookings
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
                .innerJoin("r.bookingDetails", "b")
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
                .addSelect("GROUP_CONCAT(DISTINCT roomImages.imageUrl)", "imageUrls") 
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
    public async calculateTotalPrice(bookingSession: BookingSession) {
        let totalPrice = 0;
        let extraAdultPrice = 0;
        let extraChildPrice = 0;
        // Tính số ngày ở
        const checkIn = new Date(bookingSession.checkIn);
        const checkOut = new Date(bookingSession.checkOut);
        const numberOfDays = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));

        // Tính giá cho từng phòng
        for (const room of bookingSession.rooms) {
            // Tính tổng số người trong phòng
            const totalGuests = room.guests.adults + room.guests.children;

            // Tính giá cơ bản cho số ngày ở
            let roomPrice = room.price * numberOfDays;
            
            if(totalGuests > 2) {
                if(room.guests.adults - 2 > 0){
                    extraAdultPrice = (room.guests.adults - 2) * 100 * numberOfDays;
                }
                extraChildPrice = (totalGuests - room.guests.adults) * 50 * numberOfDays;
                roomPrice = roomPrice + extraAdultPrice + extraChildPrice;
            }else{
                roomPrice = roomPrice;
            }
            
            totalPrice += roomPrice;
        }

        return {totalPrice, extraAdultPrice, extraChildPrice};
    }
    // public async saveBooking(bookingSession: BookingSession) {
    //     try {
    //         // Kiểm tra phòng trống cho từng phòng trong booking session
    //         for (const room of bookingSession.rooms) {
    //             const searchParams = {
    //                 hotelid: bookingSession.hotel.id,
    //                 checkin: new Date(bookingSession.checkIn).toISOString().split("T")[0],
    //                 checkout: new Date(bookingSession.checkOut).toISOString().split("T")[0],
    //                 roomNumber: "1"
    //             };

    //             const availableRooms = await this.searchRoomAvailableWithRoomType(searchParams);
                
    //             // Kiểm tra xem loại phòng còn trống không
    //             const roomTypeAvailable = availableRooms.availableRooms.find(
    //                 (r) => r.roomTypeId === room.roomTypeId
    //             );

    //             if (!roomTypeAvailable || roomTypeAvailable.availableCount < 1) {
    //                 throw new Error(`Phòng ${room.roomTypeName} đã hết`);
    //             }
    //         }

    //         // Nếu tất cả phòng đều còn trống, tiến hành lưu booking
    //         const booking = await bookingRepository.save({
    //             hotelId: bookingSession.hotel.id,
    //             checkIn: bookingSession.checkIn,
    //             checkOut: bookingSession.checkOut,
    //             totalPrice: bookingSession.totalPrice,
    //             extraAdultPrice: bookingSession.extraAdultPrice, 
    //             extraChildPrice: bookingSession.extraChildPrice,
    //             status: "PENDING",
    //             createdAt: new Date()
    //         });

    //         // Lưu chi tiết từng phòng
    //         for (const room of bookingSession.rooms) {
    //             await bookingDetailRepository.save({
    //                 bookingId: booking.id,
    //                 roomTypeId: room.roomTypeId,
    //                 price: room.price,
    //                 numberOfAdults: room.guests.adults,
    //                 numberOfChildren: room.guests.children
    //             });
    //         }

    //         return booking;

    //     } catch (error: any) {
    //         throw new Error("Lỗi khi lưu booking: " + error.message);
    //     }
    // }
    
}
export default BookingService;