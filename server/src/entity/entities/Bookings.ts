import { Column, Entity, PrimaryGeneratedColumn, OneToMany,ManyToOne, JoinColumn } from "typeorm";
import { BookingDetail } from "./BookingDetails";
import {Users} from "./Users";
@Entity("bookings", { schema: "db_hotel_booking" })
export class Bookings {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id?: string;

  @Column( { type: "bigint", name: "user_id"})
  userId?: string;

  @Column( { type: "decimal", name: "total_price" })
  totalPrice?: number;

  @OneToMany(() => BookingDetail, (bookingDetail) => bookingDetail.bookings)
  bookingDetails?: BookingDetail[];

  @ManyToOne(() => Users, (users) => users.bookings, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user?: Users;

}
