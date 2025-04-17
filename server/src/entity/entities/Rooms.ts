import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BookingDetail } from "./BookingDetails";
import { Hotels } from "./Hotels";
import { RoomTypes } from "./RoomTypes";

@Index("unique_room_number", ["hotelId", "roomNumber"], { unique: true })
@Index("room_type_id", ["roomTypeId"], {})
@Entity("rooms", { schema: "db_hotel_booking" })
export class Rooms {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id?: string;

  @Column("bigint", { name: "hotel_id", comment: "ID khách sạn" })
  hotelId?: string;

  @Column("bigint", { name: "room_type_id", comment: "ID loại phòng" })
  roomTypeId?: string;

  @Column("varchar", { name: "room_number", comment: "Số phòng", length: 20 })
  roomNumber?: string;

  
  @Column("varchar", {
    name: "floor",
    nullable: true,
    comment: "Tầng",
    length: 10,
  })
  floor?: string | null;

  @Column("enum", {
    name: "status",
    comment: "Trạng thái: Trống, Đã thuê, Bảo trì, Đang dọn dẹp",
    enum: ["AVAILABLE", "OCCUPIED", "MAINTENANCE", "CLEANING"],
    default:'AVAILABLE',
  })
  status?: "AVAILABLE" | "OCCUPIED" | "MAINTENANCE" | "CLEANING";

  @Column("tinyint", {
    name: "is_active",
    nullable: true,
    width: 1,
    default: () => "'1'",
  })
  isActive?: boolean | null;

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

  @OneToMany(() => BookingDetail, (bookingDetail) => bookingDetail.room)
  bookingDetails?: BookingDetail[];

  @ManyToOne(() => Hotels, (hotels) => hotels.rooms, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "hotel_id", referencedColumnName: "id" }])
  hotel?: Hotels;

  @ManyToOne(() => RoomTypes, (roomTypes) => roomTypes.rooms, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "room_type_id", referencedColumnName: "id" }])
  roomType?: RoomTypes;
}
