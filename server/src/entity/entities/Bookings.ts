import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";
import { Rooms } from "./Rooms";
import { Payments } from "./Payments";
import { Reviews } from "./Reviews";

@Index("user_id", ["userId"], {})
@Index("room_id", ["roomId"], {})
@Entity("bookings", { schema: "db_hotel_booking" })
export class Bookings {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id?: string;

  @Column("bigint", { name: "user_id", comment: "ID người đặt" })
  userId?: string;

  @Column("bigint", { name: "room_id", comment: "ID phòng" })
  roomId?: string;

  @Column("date", { name: "check_in_date", comment: "Ngày nhận phòng" })
  checkInDate?: string;

  @Column("date", { name: "check_out_date", comment: "Ngày trả phòng" })
  checkOutDate?: string;

  @Column("int", { name: "number_of_guests", comment: "Số lượng khách" })
  numberOfGuests?: number;

  @Column("decimal", {
    name: "total_price",
    comment: "Tổng tiền",
    precision: 10,
    scale: 2,
  })
  totalPrice?: string;

  @Column("enum", {
    name: "status",
    comment: "Trạng thái: Chờ xác nhận, Đã xác nhận, Đã hủy, Hoàn thành",
    enum: ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"],
    default:'PENDING',
  })
  status?: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

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

  @ManyToOne(() => Users, (users) => users.bookings, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user?: Users;

  @ManyToOne(() => Rooms, (rooms) => rooms.bookings, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "room_id", referencedColumnName: "id" }])
  room?: Rooms;

  @OneToMany(() => Payments, (payments) => payments.booking)
  payments?: Payments[];

  @OneToMany(() => Reviews, (reviews) => reviews.booking)
  reviews?: Reviews[];
}
