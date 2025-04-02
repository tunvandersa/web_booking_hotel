import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { HotelAmenityMapping } from "./HotelAmenityMapping";

@Index("name", ["name"], { unique: true })
@Entity("hotel_amenities", { schema: "db_hotel_booking" })
export class HotelAmenities {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id?: string;

  @Column("varchar", {
    name: "name",
    unique: true,
    comment: "Tên tiện nghi",
    length: 100,
  })
  name?: string;

  @Column("text", {
    name: "description",
    nullable: true,
    comment: "Mô tả tiện nghi",
  })
  description?: string | null;

  @Column("tinyint", {
    name: "is_free",
    nullable: true,
    comment: "Miễn phí hay không",
    default: () => "'1'",
  })
  isFree?: number | null;

  @Column("timestamp", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt?: Date | null;

  @Column("tinyint", {
    name: "is_active",
    nullable: true,
    width: 1,
    default: () => "'1'",
  })
  isActive?: boolean | null;

  @OneToMany(
    () => HotelAmenityMapping,
    (hotelAmenityMapping) => hotelAmenityMapping.amenity
  )
  hotelAmenityMappings?: HotelAmenityMapping[];
}
