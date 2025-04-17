import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { HotelAmenityMapping } from "./HotelAmenityMapping";
import { RoomTypes } from "./RoomTypes";
import { Rooms } from "./Rooms";
import { HotelLocation } from "./HotelLocation";

@Index("location_id", ["locationId"], {})
@Entity("hotels", { schema: "db_hotel_booking" })
export class Hotels {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id?: string;

  @Column("varchar", { name: "name", comment: "Tên khách sạn", length: 100 })
  name?: string;

  @Column("text", {
    name: "description",
    nullable: true,
    comment: "Mô tả khách sạn",
  })
  description?: string | null;

  @Column("text", { name: "image", nullable: true, comment: "Ảnh khách sạn" })
  image?: string | null;

  @Column("text", { name: "phone", nullable: true, comment: "Số điện thoại" })
  phone?: string | null;

  @Column("text", { name: "email", nullable: true, comment: "Email" })
  email?: string | null;

  @Column("tinyint", { name: "star_rating", comment: "Xếp hạng sao (1-5)" })
  starRating?: number;

  @Column("bigint", { name: "location_id", nullable: true })
  locationId?: string | null;

  @Column("text", { name: "address", comment: "Địa chỉ" })
  address?: string;

  @Column("varchar", { name: "city", comment: "Thành phố", length: 100 })
  city?: string;

  @Column("varchar", {
    name: "country",
    comment: "Quốc gia",
    length: 100,
    default: () => "'Vietnam'",
  })
  country?: string;

  @Column("decimal", {
    name: "latitude",
    nullable: true,
    comment: "Vĩ độ",
    precision: 10,
    scale: 8,
  })
  latitude?: string | null;

  @Column("decimal", {
    name: "longitude",
    nullable: true,
    comment: "Kinh độ",
    precision: 11,
    scale: 8,
  })
  longitude?: string | null;

  @Column("time", { name: "check_in_time", comment: "Giờ nhận phòng" })
  checkInTime?: string;

  @Column("time", { name: "check_out_time", comment: "Giờ trả phòng" })
  checkOutTime?: string;

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
  @Column("tinyint", {
    name: "is_active",
    nullable: true,
    width: 1,
    default: () => "'1'",
  })
  isActive?: boolean | null;

  @OneToMany(
    () => HotelAmenityMapping,
    (hotelAmenityMapping) => hotelAmenityMapping.hotel
  )
  hotelAmenityMappings?: HotelAmenityMapping[];

  @ManyToOne(() => HotelLocation, (hotelLocation) => hotelLocation.hotels, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "location_id", referencedColumnName: "id" }])
  location?: HotelLocation;

  @OneToMany(() => Rooms, (rooms) => rooms.hotel)
  rooms?: Rooms[];
}
