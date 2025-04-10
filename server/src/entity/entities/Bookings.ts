import { Column, Entity, PrimaryGeneratedColumn, OneToMany,ManyToOne,OneToOne, JoinColumn } from "typeorm";
import { BookingDetail } from "./BookingDetails";
import { Payments } from "./Payments";
import {Users} from "./Users";
@Entity("bookings", { schema: "db_hotel_booking" })
export class Bookings {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id?: number;

  @Column( { type: "bigint", name: "user_id"})
  userId?: number;

  @Column("decimal", {
    name: "total_price",
    comment: "Tổng tiền",
    precision: 10,
    scale: 2,
  })
  totalPrice?: number;

  @Column("enum", {
    name: "status",
    comment: "Trạng thái: Chờ xác nhận, Đã xác nhận, Đã hủy, Hoàn thành",
    enum: ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"],
    default:'PENDING',
  })
  status?: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

  @Column("timestamp", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt?: Date | null;

  @OneToMany(() => BookingDetail, (bookingDetail) => bookingDetail.booking)
  bookingDetails?: BookingDetail[];

  @ManyToOne(() => Users, (users) => users.bookings, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user?: Users;

  @OneToOne(() => Payments, (payments) => payments.booking)
  payments?: Payments;  
}
