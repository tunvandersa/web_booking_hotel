import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Rooms } from "./Rooms";

//import { Reviews } from "./Reviews";
import { Bookings } from "./Bookings";

@Index("room_id", ["roomId"], {})
@Entity("booking_detail", { schema: "db_hotel_booking" })
export class BookingDetail {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id?: number;

  @Column("bigint", { name: "booking_id", comment: "ID phòng" })
  bookingId?: number;

  @Column("bigint", { name: "room_id", comment: "ID phòng" })
  roomId?: number;

  @Column("date", { name: "check_in_date", comment: "Ngày nhận phòng" })
  checkInDate?: string;

  @Column("date", { name: "check_out_date", comment: "Ngày trả phòng" })
  checkOutDate?: string;

  @Column({type: "int", name: "adult_number"})
  adultNumber?: number;

  @Column({type: "int", name: "child_number"})
  childNumber?: number;
  
  @Column({type: "int", name: "baby_number"})
  babyNumber?: number;

  @Column("text", {
    name: "special_requests",
    nullable: true,
    comment: "Yêu cầu đặc biệt",
  })
  specialRequests?: string | null;

  @Column("timestamp", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt?: Date | null;

  @Column("timestamp", {
    name: "updated_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt?: Date | null;


  @ManyToOne(() => Bookings , (bookings) => bookings.bookingDetails, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "booking_id", referencedColumnName: "id" }])
  booking?: Bookings;

  @ManyToOne(() => Rooms, (rooms) => rooms.bookingDetails, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "room_id", referencedColumnName: "id" }])
  room?: Rooms;

  // @OneToMany(() => Reviews, (reviews) => reviews.bookingDetail)
  // reviews?: Reviews[];
}
