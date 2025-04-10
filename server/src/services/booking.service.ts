import { AppDataSource } from "@databases/data.source";
import { Hotels } from "@entities/Hotels";
import { Rooms } from "@entities/Rooms";
import { BookingSession } from "../interface/iBookingSession";
import { Bookings } from "@entities/Bookings";
import { BookingDetail } from "@entities/BookingDetails";
import { Users } from "@entities/Users";
import AuthService from "./auth.service";


const roomRepository = AppDataSource.getRepository(Rooms);
const hotelRepository = AppDataSource.getRepository(Hotels);
const bookingRepository = AppDataSource.getRepository(Bookings);
const bookingDetailRepository = AppDataSource.getRepository(BookingDetail);


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
            console.log("rawResults", rawResults);
            const totalAvailableRooms = rawResults.reduce((sum, room) => sum + Number(room.totalRooms), 0);

            if (totalAvailableRooms >= Number(searchParams.roomNumber)) {
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
            } else {
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

            if (totalGuests > 2) {
                if (room.guests.adults - 2 > 0) {
                    extraAdultPrice = extraAdultPrice + (room.guests.adults - 2) * 100 * numberOfDays;
                }
                console.log("extraAdultPrice", extraAdultPrice);
                extraChildPrice = extraChildPrice + (totalGuests - room.guests.adults) * 50 * numberOfDays;
            } else {
                roomPrice = roomPrice;
            }
            console.log("roomPrice", roomPrice);
            totalPrice += roomPrice;
            console.log("totalPrice", totalPrice);
        }
        totalPrice = totalPrice + extraAdultPrice + extraChildPrice;
        return { totalPrice, extraAdultPrice, extraChildPrice };
    }
    public async saveBooking(bookingSession: BookingSession, user: Users) {
        try {
            const roomCount = bookingSession.rooms.length;
            const searchParams = {
                hotelid: bookingSession.hotel.id,
                checkin: new Date(bookingSession.checkIn).toISOString().split("T")[0],
                checkout: new Date(bookingSession.checkOut).toISOString().split("T")[0],
                roomNumber: roomCount.toString()
            };
            const availableRooms = await this.searchRoomAvailableWithRoomType(searchParams);

            if(!availableRooms.availableRooms || availableRooms.availableRooms.length <= 0){
                throw new Error ("Phòng trống đã hết")
            }

            // Bắt đầu transaction
            return await AppDataSource.transaction(async (transactionalEntityManager) => {
                const newBooking = new Bookings();
                newBooking.userId = user.id;
                newBooking.totalPrice = bookingSession.totalPrice;
                newBooking.status = "PENDING";
                newBooking.createdAt = new Date();
                
                const savedBooking = await transactionalEntityManager.save(newBooking);
                console.log("Saved Booking ID:", savedBooking.id);
                
                for (const room of bookingSession.rooms) {
                    const roomTypeAvailable = availableRooms.availableRooms.find(
                        (r) => r.roomTypeId === room.roomTypeId
                    );
                    console.log("roomTypeAvailable", roomTypeAvailable);
        
                    if (!roomTypeAvailable || roomTypeAvailable.totalRooms < 1) {
                        throw new Error(`Phòng ${room.roomTypeName} đã hết`);
                    }else{
                        roomTypeAvailable.totalRooms = roomTypeAvailable.totalRooms - 1;
                        console.log("roomTypeAvailable", roomTypeAvailable.availableRoomIds);
                        let roomId = roomTypeAvailable.availableRoomIds.shift();
                        const bookingDetail = new BookingDetail();
                        bookingDetail.bookingId = savedBooking.id;
                        bookingDetail.checkInDate = new Date(bookingSession.checkIn).toISOString().split('T')[0];
                        bookingDetail.checkOutDate = new Date(bookingSession.checkOut).toISOString().split('T')[0];
                        bookingDetail.roomId = roomId;
                        bookingDetail.adultNumber = room.guests.adults;
                        bookingDetail.childNumber = room.guests.children;
                        bookingDetail.babyNumber = room.guests.infants;
                        bookingDetail.createdAt = new Date();
            
                        await transactionalEntityManager.save(bookingDetail);
                    }
                }

                return savedBooking;
            });
        } catch (error: any) {
            throw new Error("Lỗi khi lưu booking: " + error.message);
        }
    }
}

export default BookingService;